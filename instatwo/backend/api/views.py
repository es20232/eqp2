from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from .models import User, Token
from .exceptions import bad_request
from .services import send_email
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signin(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=200)
        else:
            return bad_request("user not found")

@csrf_exempt
def reset_password(request):
    if request.method == "POST":
        username = request.POST.get("username")
        user = User.objects.filter(username=username).first()
        if user is None:
            return bad_request("user not found")
        else:
            token = Token(user=user)
            token.initialize()
            Token.objects.update_or_create(user=user, defaults={"token": token.token, "expire_at": token.expire_at})
            send_email.reset_password(token)

            return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)

@csrf_exempt
def change_password(request):
    if request.method == "POST":
        new_password = request.POST.get("password")
        sent_token = request.POST.get("token")
        token = Token.objects.get(token=sent_token)
        if token.is_expired():
            return bad_request("token expired")
        else:
            user = token.user
            user.set_password(new_password)
            user.save()
            return HttpResponse(status=200)
    elif request.method == "GET":
        sent_token = request.GET.get("token")
        token = Token.objects.filter(token=sent_token).first()
        if token is None:
            return bad_request("invalid token")
        elif token.is_expired():
            return bad_request("token expired")
        else:
            # show the reset password screen
            return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)

def signout(request):
    if request.user is None:
        return HttpResponse(status=404)
    else:
        logout(request)

@csrf_exempt
def create_user_test(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        email = request.POST.get("email")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        user = User (username=username, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)
