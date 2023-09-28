# views.py
from django.shortcuts import get_object_or_404
from .models import Evento
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import timedelta
def evento_list(request):
    page_number = request.GET.get('page')
    eventos = Evento.objects.all()
    paginator = Paginator(eventos, 10)  # Muestra 10 eventos por página

    if page_number:
        page = paginator.page(page_number)
    else:
        page = paginator.page(1)

    data = {
        'eventos': list(page.object_list.values()),
        'total_pages': paginator.num_pages,
        'current_page': page.number
    }

    return JsonResponse(data, safe=False)

def evento_detail(request, pk):
    evento = get_object_or_404(Evento, pk=pk)
    data = {'evento': model_to_dict(evento)}
    return JsonResponse(data)

@csrf_exempt
def evento_create(request):
    data = json.loads(request.body.decode('utf-8'))
    nombre = data.get('nombre')
    fecha = data.get('fecha')
    duracion_str = data.get('duracion')
    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')
    
    # Convertir la duración a un timedelta
    duracion = timedelta(hours=int(duracion_str.split(':')[0]), 
                         minutes=int(duracion_str.split(':')[1]), 
                         seconds=int(duracion_str.split(':')[2]))
    
    evento = Evento(nombre=nombre, fecha=fecha, duracion=duracion, hora_inicio=hora_inicio, hora_fin=hora_fin)
    evento.save()

    response_data = {'message': 'Evento creado exitosamente'}
    return JsonResponse(response_data)

@csrf_exempt
def evento_update(request, evento_id):
    evento = get_object_or_404(Evento, pk=evento_id)
    data = json.loads(request.body.decode('utf-8'))
    nombre = data.get('nombre')
    fecha = data.get('fecha')
    duracion_str = data.get('duracion')
    hora_inicio = data.get('hora_inicio')
    hora_fin = data.get('hora_fin')
    
    # Convertir la duración a un timedelta
    duracion = timedelta(hours=int(duracion_str.split(':')[0]), 
                         minutes=int(duracion_str.split(':')[1]), 
                         seconds=int(duracion_str.split(':')[2]))

    evento.nombre = nombre
    evento.fecha = fecha
    evento.duracion = duracion
    evento.hora_inicio = hora_inicio
    evento.hora_fin = hora_fin
    evento.save()

    data = {'message': 'Evento actualizado exitosamente'}
    return JsonResponse(data)


@csrf_exempt
def evento_delete(request, evento_id):
    evento = get_object_or_404(Evento, pk=evento_id)
    evento.delete()

    data = {'message': 'Evento eliminado exitosamente'}
    return JsonResponse(data)
