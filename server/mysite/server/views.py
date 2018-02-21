from django.shortcuts import render, render_to_response
from server.my.query import *
from django.http import HttpResponse
import json

def searchLibrary(request):
	str = request.body.decode('UTF-8')
	print (str)
	res = search(str)
	return HttpResponse(json.dumps(res), content_type = 'application/json')