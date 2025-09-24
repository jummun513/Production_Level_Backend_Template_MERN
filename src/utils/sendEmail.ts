import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: config.gmail,
      pass: config.gmail_app_password,
    },
  });

  const mailOptions = {
    from: `"Md. Jummun Islam" <${config.gmail}>`, // sender address
    to, // list of receivers
    subject: subject, // Subject line
    text: '', // plain text body
    html, // html body

    // headers for important priority email
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      importance: 'high',
    },
  };

  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });
};
