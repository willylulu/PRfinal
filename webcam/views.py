from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

app_name = 'webcam'

def index(request):
    context = {}
    return render(request, 'webcam/index.html', context)
