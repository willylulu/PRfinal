from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.shortcuts import redirect
import sys
import numpy as np
import ModelandPredict
from django.http import HttpResponse
import tensorflow as tf

import json

app_name = 'webcam'

def index(request):
    context = {}
    return render(request, 'webcam/index.html', context)

def detect(request):
    # print (request.POST['screen'])
    screen = json.loads(request.POST['screen'])
    # pixels: n * n * 3
    # pixels = [[[screen[str(i*512+j*4+k)] for k in range(3)] for j in range(128)] for i in range(128)]
    pixels = np.zeros((3,128,128))
    for i in range(128):
        for j in range(128):
            for k in range(3):
                pixels[k][i][j] = screen[str(i*512+j*4+k)]
    with tf.Session():
        model = ModelandPredict.CIFAR100model()
        model.load_model()
        model.model_compile()
        result = model.model_predict(pixels)
    return HttpResponse(result)
