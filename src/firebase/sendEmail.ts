import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

const mailOptions = (to: string, subject: string, message: string) => ({
  from: functions.config().email.user,
  to,
  subject,
  text: message,
});

export const sendEmail = functions.https.onRequest(async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    res.status(400).send("Parâmetros faltando.");
    return;
  }

  try {
    await transporter.sendMail(mailOptions(to, subject, message));
    res.status(200).send("E-mail enviado com sucesso.");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).send("Erro ao enviar e-mail.");
  }
});
