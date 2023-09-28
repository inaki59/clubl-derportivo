from django.db import models

class Evento(models.Model):
    nombre = models.CharField(max_length=200)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    duracion = models.DurationField()

    def __str__(self):
        return self.nombre
