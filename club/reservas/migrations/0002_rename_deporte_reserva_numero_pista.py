# Generated by Django 3.2.14 on 2023-09-30 08:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservas', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reserva',
            old_name='deporte',
            new_name='numero_pista',
        ),
    ]
