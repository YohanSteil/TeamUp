import nodemailer from 'nodemailer';
import ApiError from "../errors/error.js";

class ContactController {
  static async sendContactEmail(req, res, next) {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Email provenant du site : ${subject}`,
      text: `Adresse mail de l'utilisateur : ${email}\n\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Message envoyé avec succès !' });
    } catch (error) {
      return next(new ApiError(500, `Erreur lors de l'envoi du message : ${error.toString()}`));
    }
  }
}

export default ContactController;
