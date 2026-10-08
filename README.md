# Preciazo Landing Page

Primera versión desplegable de la landing page de Preciazo, construida a partir del mockup de referencia para presentar la propuesta de valor, funcionalidades por rol y principales bounded contexts del producto.

La página ofrece inglés (`en-US`, predeterminado) y español latinoamericano (`es-419`). El selector conserva la elección en el navegador y actualiza el contenido, metadatos y etiquetas accesibles.

Para comprobar las traducciones y generar los archivos publicables, ejecutar `npm run build` con Node.js 22 o posterior. El resultado queda en `dist/`, sin dependencias de instalación. Para revisar localmente, servir esa carpeta con un servidor HTTP; los módulos JavaScript requieren HTTP.

Para Azure Static Web Apps, usar la rama `develop`, preset Custom, App location `/`, sin API y Output location `dist`. El comando de compilación es `npm run build`. La URL de Azure se añadirá cuando el despliegue esté verificado.

Los formularios son demostraciones locales: muestran un mensaje y no envían ni almacenan datos en un servidor.


