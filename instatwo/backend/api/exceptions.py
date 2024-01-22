from django.http import HttpResponse
import json

def bad_request(message: str) -> HttpResponse:
    return HttpResponse(
        status=500,
        content_type="application/json",
        content=json.dumps({"error_message": message})
    )