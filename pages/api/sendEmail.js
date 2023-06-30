import 'dotenv/config'
import SibApiV3Sdk from 'sib-api-v3-sdk';

const sendEmail = async (toEmail, fromEmail, subject, htmlContent) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  defaultClient.authentications['api-key'].apiKey = process.env.MAIL_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: { email: fromEmail },
    to: [{ email: toEmail }],
    subject,
    htmlContent
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      const rootUrl = req.headers.host ? `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`+'/' : '';
      let data =   JSON.parse(await(await fetch(new URL('/api/data',rootUrl))).json())
      
      await sendEmail(email,data.store_email,`${data.store_name} - gracias por contactarnos`, `
        <h1>Gracias por contactarnos, nos comunicaremos con usted a la brevedad.</h1> 
        <br/>
        <p>Revise que su informacion esté correcta. Si no, vuelva a ingresar un mensaje en el sitio y envíe el mensaje nuevamente</p>
        <br/>
        <br/>
        <p>Nombre: <strong>${name}</strong></p>
        <p>Email: <strong>${email}</strong></p>
        <p>Mensaje: <strong>${message}</strong></p>
        <p>Saludos, <strong>${data.store_name}</strong></p>
      `);
      await sendEmail(data.store_email,email, `${data.store_name} - contacto de cliente`, `
      Nombre: ${name} 
      Email: ${email}
      Mensaje: ${message}
      `);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
