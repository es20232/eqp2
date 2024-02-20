from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, PostSerializer, CommentSerializer, LikeSerializer
from .models import User, Token, Like, Post, Comment
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
        user.name = request.data.get('newName', user.name)
        user.bio = request.data.get('newBio', user.bio)
        if 'user_images' in request.FILES:
            user = request.user
            user.profile_image = request.FILES['user_images']
            user.save()
            Response({'message': 'Imagem de perfil atualizada com sucesso!'})
        else:
            Response({'error': 'Nenhuma imagem de perfil enviada!'})
        user.username = request.data.get('newUsername', user.username)
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

class RequestResetPassword(APIView):

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
            response = Response()
            response.data = {"message" : "Token inválido"}
            return response
        else:
            user = token.user
            user.set_password(new_password)
            user.save()
            response = Response()
            response.data = {"message" : "Senha alterada!"}
            return response

class SendLike(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Não autorizado!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não autorizado!')
    
        user = User.objects.filter(id=payload["id"]).first()
        post = Post.objects.filter(id=request.data["post_id"]).first()

        if user == None:
            raise AuthenticationFailed("Session expired")
        elif post == None:
            raise AuthenticationFailed("Post not found")

        Like.objects.update_or_create(liked_by=user, weight=request.data["weight"], on_post=post)
        response = Response()
        response.data = {"message" : "Like/Dislike enviado"}
        return response

class PostComment(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Não autorizado!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não autorizado!')
    
        user = User.objects.filter(id=payload["id"]).first()
        post = Post.objects.filter(id=request.data["post_id"]).first()

        if user == None:
            raise AuthenticationFailed("Session expired")
        elif post == None:
            raise AuthenticationFailed("Post not found")
        
        comment = Comment(author=user, text=request.data["text"], post=post)
        comment.save()

        response = Response()
        response.data = {
            "message" : "Comment posted"
        }

        return response
    
class SearchProfile(APIView):
    def get(self, request):
        # Acesse o parâmetro 'username' da URL
        username = request.query_params.get('username', '')

        # Filtra os usuários com base no username
        users = User.objects.filter(username__icontains=username)

        # Se não houver usuários, retorne uma resposta 404
        if not users.exists():
            raise NotFound("Usuários não encontrados")

        # Serializa os usuários e envia a resposta
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class FeedPosts(APIView):

    def get(self, request):
        return Response(PostSerializer(Post.objects.order_by("posted_at")[:15], many=True).data)
    
class CreatePost(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Não autorizado!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Não autorizado!')
        
        user = User.objects.filter(id=payload['id']).first()
        post = Post(user=user, caption=request.data["caption"], image=request.FILES["POST_IMAGE"])
        post.save()
        return Response(PostSerializer(post).data)

class GetPostComments(APIView):
    def get(self, request):
        post_id = request.query_params.get("post_id")

        if not post_id:
            raise AuthenticationFailed("Post ID not provided")

        post = Post.objects.filter(id=post_id).first()

        if not post:
            raise AuthenticationFailed("Post not found")
        
        comments = Comment.objects.filter(post=post)[:20]
        serialized_comments = CommentSerializer(comments, many=True).data
        return Response(serialized_comments)
    
class GetPostLikes(APIView):
    def get(self, request):
        post_id = request.query_params.get("post_id")

        if not post_id:
            raise AuthenticationFailed("post_id not provided")

        post = Post.objects.filter(id=post_id).first()

        if not post:
            raise AuthenticationFailed("Post not found")
        
        likes = Like.objects.filter(on_post=post)[:20]
        return Response(LikeSerializer(likes, many=True).data)

class ListarUsuariosView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
