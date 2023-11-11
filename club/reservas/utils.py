import qrcode
import os
from PIL import Image
from datetime import datetime
from django.http import HttpResponse
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.lib import utils
from decouple import config
import ssl
import json
import smtplib
from email.message import EmailMessage

def generar_qr(data):
     # Convertir el diccionario de datos en una cadena JSON
    data_json = json.dumps(data)

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data_json)  # Usar la cadena JSON en lugar de los datos individuales
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    ahora = datetime.now().strftime("%Y%m%d%H%M%S%f")
    nombre_archivo = f"qr_{ahora}.png"

    qr_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'temp', nombre_archivo)

    #img.save(ruta_temporal)
    crear_pdf(data,img)

def crear_pdf(data, qr_img):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="reserva.pdf"'

    buffer = BytesIO()

    c = canvas.Canvas(buffer, pagesize=letter)

    # Insertar texto
    c.setFont("Helvetica", 12)
    c.drawString(100, 750, f' reserva a nombre de  {data["nombre"]}')
    c.drawString(100, 730, f'Fecha: {data["fecha"]}')
    c.drawString(100, 710, f'Hora de inicio: {data["hora_inicio"]}')
    c.drawString(100, 690, f'Duración: {data["duracion"]}')


    # Insertar QR
    buffer_qr = BytesIO()
    qr_img.save(buffer_qr, format='PNG')
    buffer_qr.seek(0)
    qr_img = ImageReader(buffer_qr)

    c.drawImage(qr_img, 350, 650, width=100, height=100)

    c.showPage()
    ahora = datetime.now().strftime("%Y%m%d%H%M%S%f")
    nombre_archivo = f"reserva_{ahora}.pdf"
    pdf_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'temp', nombre_archivo)

    c.save()
    with open(pdf_path, 'wb') as f:
        f.write(buffer.getvalue())
    pdf = buffer.getvalue()
    buffer.close()
    email=data["correo"]
    response.write(pdf)
    sendEmail(pdf,data)


def sendEmail(pdf,data):
    email_emisor=config('EMAIL_EMISOR')
    email_password=config('EMAIL_PASSWORD')
    email_receptor=data["correo"]
    nombre=data["nombre"]
    fecha=data["fecha"]
    inicio=data["hora_inicio"]
    fin=data["duracion"]
    asunto="reserva confirmada"
   
    cuerpo = f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: 'Helvetica', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f2f2f2;
                }}

                .container {{
                    width: 80%;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-top: 20px;
                }}

                .header {{
                    background-color: #28a745;
                    color: #ffffff;
                    padding: 10px;
                    text-align: center;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }}

                .content {{
                    padding: 20px;
                }}

                .footer {{
                    text-align: center;
                    padding: 10px;
                    background-color: #28a745;
                    color: #ffffff;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Confirmación de Reserva</h1>
                </div>
                <div class="content">
                    <p>Su reserva a nombre de {nombre} se ha realizado con éxito. A continuación, se detallan los datos de la reserva:</p>
                    <ul>
                        <li><strong>Fecha:</strong> {fecha}</li>
                        <li><strong>Hora de inicio:</strong> {inicio}</li>
                        <li><strong>Duración:</strong> {fin}</li>
                    </ul>
                    <p>Adjunto a este correo, encontrará el código QR correspondiente a su reserva.</p>
                </div>
                <div class="footer">
                    <p>Gracias por elegir nuestro servicio. ¡Esperamos verlo/a pronto!</p>
                </div>
            </div>
        </body>
    </html>
    """


   
    em=EmailMessage()
    em['From']=email_emisor
    em['To']=email_receptor
    em['subject']=asunto
    em.add_alternative(cuerpo, 'html')
    contexto=ssl.create_default_context()
    em.add_attachment(pdf, maintype='application', subtype='pdf', filename='reserva.pdf')
    with smtplib.SMTP_SSL('smtp.gmail.com',465,context=contexto) as smtp:
        smtp.login(email_emisor,email_password)
        smtp.sendmail(email_emisor,email_receptor,em.as_string())




  



