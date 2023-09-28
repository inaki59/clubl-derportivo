from django.shortcuts import render
from django.shortcuts import get_object_or_404, render
from .models import Post
from django.forms.models import model_to_dict
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from django.core.paginator import Paginator
from django.db import models
def prueba(request):
    response_data = {"message": "Prueba de ruta"}  # Un diccionario con el mensaje
    return JsonResponse(response_data)

def post_list(request):
    page_number = request.GET.get('page')
    posts = Post.objects.all()
    paginator = Paginator(posts, 10)  # Muestra 10 posts por página

    if page_number:
        page = paginator.page(page_number)
    else:
        page = paginator.page(1)

    data = {
        'posts': list(page.object_list.values()),
        'total_pages': paginator.num_pages,
        'current_page': page.number
    }

    return JsonResponse(data, safe=False)

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    data = {'post': model_to_dict(post)}
    return JsonResponse(data)


@api_view(['POST'])
def post_create(request):
    data = json.loads(request.body.decode('utf-8'))
    title = data.get('title')
    content = data.get('content')
    author = data.get('author')
    
    post = Post(title=title, content=content, author=author)
    post.save()

    response_data = {'message': 'Post creado exitosamente'}
    return JsonResponse(response_data)


def post_update(request, pk):
    post = get_object_or_404(Post, pk=pk)

    # Asume que los datos para actualizar un post están en request.POST
    data = json.loads(request.body.decode('utf-8'))
    title = data.get('title')
    content = data.get('content')
    author = data.get('author') # Asegúrate de enviar la fecha correctamente formateada

    post.title = title
    post.content = content
    post.pub_date = data
    post.save()

    data = {'message': 'Post actualizado exitosamente'}
    return JsonResponse(data)

def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()

    data = {'message': 'Post eliminado exitosamente'}
    return JsonResponse(data)

