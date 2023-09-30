from django.db import models

class Reserva(models.Model):
    nombre = models.CharField(max_length=200)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    duracion = models.DurationField()
    pista = models.CharField(max_length=100)  # Por ejemplo: tenis, futbol, etc.
    numero_pista = models.PositiveIntegerField()  # El número correspondiente a la pista

    def __str__(self):
        return self.nombre
