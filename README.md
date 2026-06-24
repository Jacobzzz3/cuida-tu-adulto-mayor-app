# Cuida tu Adulto Mayor - Aplicación Móvil

Aplicación móvil diseñada para el monitoreo y detección de caídas en adultos mayores. El sistema se conecta en tiempo real a la nube (Firebase) para recibir alertas instantáneas generadas por el hardware IoT del paciente.

## Requisitos Previos

Para compilar e instalar la aplicación en un dispositivo físico, es necesario contar con:
* Node.js instalado en el equipo.
* Un dispositivo móvil con sistema operativo Android.
* Un cable USB para la conexión entre el equipo y el celular.
* La opción de "Depuración por USB" (USB Debugging) activada en las opciones de desarrollador del dispositivo móvil.

## Guía de Instalación en Dispositivo Físico

Siga los siguientes pasos para compilar e instalar la aplicación:

### 1. Clonar el repositorio
Abra la terminal y descargue el proyecto en su equipo local:

git clone https://github.com/Jacobzzz3/cuida-tu-adulto-mayor-app.git
cd cuida-tu-adulto-mayor-app

### 2. Instalar las dependencias
Ejecute el siguiente comando para instalar las librerías necesarias del proyecto:

npm install

### 3. Configuración de Firebase
Por políticas de seguridad, las credenciales de la base de datos no se incluyen en este repositorio. Para el correcto funcionamiento de la aplicación:
1. Solicite el archivo de configuración google-services.json al administrador del proyecto.
2. Ubique este archivo dentro de la ruta exacta: android/app/

### 4. Conectar el dispositivo
1. Conecte el dispositivo Android al computador mediante el cable USB.
2. Si el dispositivo solicita un modo de conexión, seleccione "Transferencia de archivos" o autorice la depuración USB.
3. Para verificar que el equipo reconoce el dispositivo, ejecute en la terminal:

adb devices

(Debe aparecer una lista indicando que hay un dispositivo conectado).

### 5. Instalar y Ejecutar
Con el dispositivo conectado y reconocido, ejecute el siguiente comando para iniciar la compilación e instalación:

npm run android

Nota: La primera ejecución puede demorar varios minutos mientras el sistema descarga las herramientas de compilación de Gradle. Al finalizar, la aplicación se abrirá automáticamente en el dispositivo.
