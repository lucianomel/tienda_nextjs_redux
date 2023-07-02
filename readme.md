# Sitio web plantilla hecho con next.js, react, redux 

Un sitio web tipo catálogo, con una ruta que tiene un formulario para enviar mails a la empresa. Utiliza brevo (antes Sendinblue).


## Desplegar
Primero, si no tiene una cuenta en brevo, cree una. Obtenga a la clave de API. Luego, cargar las variables de entorno (en un archivo .env si va a probarlo localmente, o en su hosting si ya lo va a desplegar directamente)

```bash
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="true"
EMAIL_USERNAME="aca el mail de la empresa que va a utilizar"
EMAIL_PASSWORD="contraseña del mail"
MAIL_API_KEY="api key de brevo"
```

Segundo, cargue los datos de su pagina en data.json bajo el directorio raiz del repositorio. Se ofrece una plantilla de ejemplo con datos en el archivo data.json ubicado en el directorio raíz  

Finalmente ejecute `npm run dev` si quiere probarlo localmente o desplegue segun configuración de su hosting.
