# Bastó CRUD FORM
Este ejercicio consta de la creación de un formulario CRUD (Altas, Bajas, Modificaciones) de
datos de vacas.
En Bastó se encargan de digitalizar el campo y armar una nueva plataforma para la
ganadería del futuro. Es por ello y como parte de este trabajo que es necesario 
digitalizar los animales de un campo.


## Probar la aplicacion de forma local
Para probar la aplicacion de forma local tenemos que seguir los siguientes pasos:

Clonar el repositorio de github de forma local.

Ejecutar el comando  `npm install` en la carpeta raiz BASTO-FORM para instalar las dependencias del backend.

Ejecutar el comando `npm run dev` en la carpeta raiz BASTO-FORM para levantar el server.

Ejecutar el comando  `npm install` en la carpeta client para instalar las dependencias del frontend.

Ejecutar el comando `npm start` en la carpeta client para levantar el client.

Y listo! La aplicacion deberia estar funcionando de forma local.

## Testing
Para correr los test, ejecutar el comando  `npm test` en la carpeta raiz BASTO-FORM. 

Se debe tener en cuenta que los test borraran todos los animales precargados como parte del test. Esto se puede evitar comentando la linea 17 en el archivo 'server.spec.js', que se encuentra en la carpeta 'tests'.
