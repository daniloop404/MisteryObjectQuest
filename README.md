# Mystery Word Quest

Mystery Word Quest es un juego móvil de adivinanzas desarrollado con React Native, TypeScript y Expo. Utiliza la API de Google Gemini AI para generar pistas dinámicas y personalizadas que te ayudarán a descubrir palabras misteriosas.

![game](https://github.com/daniloop404/MisteryObjectQuest/assets/142755776/5f3013a5-8b7d-45c7-b802-24c7031da50c)

## Descripción

En Mystery Object Quest, los jugadores intentan adivinar objetos basándose en las pistas proporcionadas por un personaje del juego.

## Tecnologías Utilizadas

* React Native: Para el desarrollo de la aplicación móvil.
* TypeScript: Para un código más seguro y escalable.
* Expo: Para facilitar el desarrollo y la ejecución de la aplicación.
* Google Gemini AI: Para generar las pistas y gestionar la interacción del juego.
* Stable Diffusion XL: Para crear el arte del juego.
* Krita: Para editar el arte del juego.

## Requisitos Previos

* Asegúrate de tener instalado en tu sistema:
    + Node.js: Recomendamos la versión LTS. [Descargar Node.js](https://nodejs.org/)
    + Expo CLI: Instálalo usando npm o yarn:
        - `npm install -g expo-cli`
        - `yarn global add expo-cli`
    + Yarn o npm: Para gestionar las dependencias del proyecto.

## Instalación y Configuración

1. Clona el repositorio:
    - `git clone https://github.com/daniloop404/MisteryObjectQuest`

2. Navega a la localización del proyecto:
    - `cd MisteryObjectQuest`

3. Instala las dependencias:
    - `yarn install`
    o 
    - `npm install`

4. Obtén la API Key de Gemini AI desde Google AI Studio:
    + Inicia sesión en Google AI Studio.
    + Crea un nuevo proyecto en la sección "Gemini".
    + Genera una API Key.

5. Configura las variables de entorno:
    + Crea un archivo `.env` en la raíz del proyecto.
    + Abre el archivo `.env` en tu editor de texto preferido.
    + Agrega tu API Key al archivo `.env` con el siguiente contenido (reemplaza `your-api-key-here` con tu clave real):
        ```plaintext
        GEMINI_API_KEY=your-api-key-here
        ```

6. Ejecuta el proyecto:
    - `npx expo start`

Esto iniciará el servidor de desarrollo de Expo. Puedes escanear el código QR con la aplicación Expo Go en tu dispositivo móvil o ejecutar el emulador correspondiente.

## Personajes

### Victoria

* Victoria es una detective privada capaz de interactuar con espíritus. Junto a su compañero espiritual, Oliver, resuelve misterios tanto del mundo de los vivos como del más allá.

### Zog

* Zog es un amigable alienígena varado en la Tierra tras un experimento fallido. Agradecido por la hospitalidad humana, intenta adaptarse a su nuevo hogar con ayuda de Victoria.

## Notas

* Asegúrate de que la API Key de Gemini AI esté correctamente configurada en el archivo `.env`.
* Ten en cuenta las limitaciones de uso de la API de Gemini AI.
* Utiliza la documentación de Gemini AI para obtener más información acerca del uso de la API de Gemini.
