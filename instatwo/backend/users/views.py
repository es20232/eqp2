from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User, Token
from .services import send_reset_password_email
import jwt, datetime


# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Usuário não encontrado!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Senha incorreta!')
        
        payload = {
            'id' : user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat' : datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }


        return response
    
class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Não autorizado!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não autorizado!')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)
    
class EditProfileView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Não autorizado!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não autorizado!')
        
        user = User.objects.filter(id=payload['id']).first()
        
        # Atualize os campos do usuário com base nos dados fornecidos no request.data
        user.email = request.data.get('newEmail', user.email)
        user.set_password(request.data.get('newPassword', user.password))
        user.save()

        # Retorne os dados atualizados do usuário
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class LogoutView(APIView):

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message' : 'Deslogado'
        }
        
        return response

class ResetPassword(APIView):

    def post(self, request):
        user = User.objects.filter(username=request.data["username"]).first()
        if user is None:
            response = Response()
            response.data = {'message' : "Usuário não encontrado"}
            return response
        else:
            token = Token(user=user)
            token.initialize()
            Token.objects.update_or_create(user=user, defaults={"token": token.token, "expire_at": token.expire_at})
            send_reset_password_email(token)
            response = Response()
            response.data = {'message' : "Token enviado para seu email"}
            return response

class ChangePassword(APIView):

    def post(self, request):
        sent_token = request.data["token"]
        new_password = request.data["password"]

        token = Token.objects.filter(token=sent_token).first()

        if token is None:
            reponse = Response()
            reponse.data = {"message" : "Token inválido"}
            return response
        else:
            user = token.user
            user.set_password(new_password)
            user.save()
            response = Response()
            response.data = {"message" : "Senha alterada!"}
            return response
