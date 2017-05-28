from django.http import HttpResponse
from django.template import loader

def index(request):
    template = loader.get_template('')
    return HttpResponse("<h1>This is homepage</h1>")
