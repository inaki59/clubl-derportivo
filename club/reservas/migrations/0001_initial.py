# Generated by Django 3.2.14 on 2023-10-12 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
                ('correo', models.EmailField(max_length=254)),
                ('fecha', models.DateField()),
                ('hora_inicio', models.TimeField()),
                ('duracion', models.DurationField()),
                ('pista', models.CharField(max_length=100)),
                ('numero_pista', models.PositiveIntegerField()),
            ],
        ),
    ]
