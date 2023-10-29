import os
import subprocess

# Obtener la ruta del directorio del proyecto
project_dir = os.getcwd()
print(project_dir)
# Iniciar el backend Django
subprocess.run(["python", "manage.py", "runserver", "--noreload"], cwd=project_dir)
print ("pasamos por el back check")
# Iniciar la aplicación React
subprocess.run(["npm", "start"], cwd=project_dir)

# Iniciar la aplicación React en el puerto 3001
subprocess.run(["npm", "start", "--port=3001"], cwd=project_dir)

