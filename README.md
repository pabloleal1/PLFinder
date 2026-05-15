# PLFinder Web

Web corporativa estática para PLFinder + producto iQA.

## Archivos

- `index.html`
- `styles.css`
- `script.js`

## Cómo levantarla en local

Opción rápida:

1. Abre `index.html` directamente en el navegador.

Opción recomendada con servidor local:

```bash
cd plfinder-web
python3 -m http.server 8080
```

Después abre:

```text
http://localhost:8080
```

## Cambios rápidos

- Sustituye el logo textual `PL` por tu imagen si ya tienes logo definitivo.
- Los textos están en español con algunos claims en inglés para dar imagen SaaS/QA internacional.

## Formulario de contacto

El formulario envía a `/api/contact`, pensado para desplegarse como función serverless en Vercel.

Variables de entorno necesarias:

- `RESEND_API_KEY`: API key de Resend.
- `CONTACT_TO_EMAIL`: email de destino. Por defecto usa `PLFinder@outlook.es`.
- `CONTACT_FROM_EMAIL`: remitente verificado en Resend. Si no se define, usa `PLFinder <onboarding@resend.dev>`.

Para producción, configura un dominio/remitente verificado en Resend y usa ese correo en `CONTACT_FROM_EMAIL`.
