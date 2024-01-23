from django.core.mail import send_mail as django_send_email

def send_reset_password_email(token):
    domain = "localhost:3000"
    url = f"https://{domain}/change_password/?token={token.token}"
    message = f"Acesse este link para mudar sua senha: {url}"
    
    print(url)
    django_send_email(
        "Reset password request",
        message,
        "reset_password@instatwo.com",
        [token.user.email],
        fail_silently=True
    )
