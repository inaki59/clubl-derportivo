# En views.py

from django.shortcuts import get_object_or_404
from .models import Reserva
from django.forms.models import model_to_dict
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import generar_qr
import json
from django.core.paginator import Paginator
from datetime import timedelta
from django.forms.models import model_to_dict
from decouple import config

@api_view(['GET'])
def reserva_list(request):
    page_number = request.GET.get('page')
    reservas = Reserva.objects.all()
    paginator = Paginator(reservas, 10)  # Muestra 10 reservas por página

    if page_number:
        page = paginator.page(page_number)
    else:
        page = paginator.page(1)

    data = {
        'reservas': list(page.object_list.values()),
        'total_pages': paginator.num_pages,
        'current_page': page.number
    }

    return JsonResponse(data, safe=False)

@api_view(['GET'])
def reserva_detail(request, pk):
    reserva = get_object_or_404(Reserva, pk=pk)
    data = {'reserva': model_to_dict(reserva)}
    return JsonResponse(data)


@api_view(['POST'])
def reserva_create(request):
    data = json.loads(request.body.decode('utf-8'))
    nombre = data.get('nombre')
    correo = data.get('correo')  # Nuevo campo de correo electrónico
    fecha = data.get('fecha')
    hora_inicio = data.get('hora_inicio')
    duracion_str = data.get('duracion')
    pista = data.get('pista')
    deporte = data.get('deporte')
    
    # Convertir la duración a un timedelta
    duracion = timedelta(hours=int(duracion_str.split(':')[0]), 
                         minutes=int(duracion_str.split(':')[1]), 
                         seconds=int(duracion_str.split(':')[2]))
    
    reserva = Reserva(nombre=nombre, correo=correo, fecha=fecha, hora_inicio=hora_inicio, 
                      duracion=duracion, pista=deporte, numero_pista=pista)
    reserva.save()
    
    data_dict = {
        'nombre': nombre,
        'correo': correo,
        'fecha': fecha,
        'hora_inicio': hora_inicio,
        'duracion': duracion_str,
        'pista': pista,
        'deporte': deporte
    }

    # Generar el QR con el diccionario convertido a JSON
    generar_qr(data_dict)
    response_data = {'message': 'Reserva creada exitosamente'}
    return JsonResponse(response_data)

@api_view(['PATCH', 'PUT'])
def reserva_update(request, pk):
    reserva = get_object_or_404(Reserva, pk=pk)

    data = json.loads(request.body.decode('utf-8'))
    nombre = data.get('nombre')
    correo = data.get('correo')  # Nuevo campo de correo electrónico
    fecha = data.get('fecha')
    hora_inicio = data.get('hora_inicio')
    duracion_str = data.get('duracion')
    pista = data.get('pista')
    deporte = data.get('deporte')
    
    # Convertir la duración a un timedelta
    duracion = timedelta(hours=int(duracion_str.split(':')[0]), 
                         minutes=int(duracion_str.split(':')[1]), 
                         seconds=int(duracion_str.split(':')[2]))

    reserva.nombre = nombre
    reserva.correo = correo
    reserva.fecha = fecha
    reserva.hora_inicio = hora_inicio
    reserva.duracion = duracion
    reserva.pista = deporte
    reserva.numero_pista = pista
    reserva.save()
  
    data = {'message': 'Reserva actualizada exitosamente'}
    return JsonResponse(data)

@api_view(['DELETE'])
def reserva_delete(request, pk):
    reserva = get_object_or_404(Reserva, pk=pk)
    reserva.delete()

    data = {'message': 'Reserva eliminada exitosamente'}
    return JsonResponse(data)
