# Preciazo Landing Page

Primera versión desplegable de la landing page de Preciazo, construida a partir del mockup de referencia para presentar la propuesta de valor, funcionalidades por rol y principales bounded contexts del producto.

La página ofrece inglés (`en-US`, predeterminado) y español latinoamericano (`es-419`). El selector conserva la elección en el navegador y actualiza el contenido, metadatos y etiquetas accesibles.

Para comprobar las traducciones y generar los archivos publicables, ejecutar `npm run build` con Node.js 22 o posterior. El resultado queda en `dist/`, sin dependencias de instalación. Para revisar localmente, servir esa carpeta con un servidor HTTP; los módulos JavaScript requieren HTTP.

La landing está publicada en [Microsoft Azure](https://preciazo-landing-btabfbeqbrg3cjbc.westus-01.azurewebsites.net/) mediante Azure App Service, con Windows, región West US y plan gratuito F1.

Para actualizar el despliegue desde `develop`, ejecutar `npm run build`, comprimir el contenido de `dist/` (con `index.html` en la raíz del ZIP) y subirlo mediante Advanced Tools → Kudu → Tools → Zip Push Deploy. El despliegue es manual; comprobar el mensaje `Deployment successful` y verificar ambos idiomas en la URL pública.

Los formularios son demostraciones locales: muestran un mensaje y no envían ni almacenan datos en un servidor.


