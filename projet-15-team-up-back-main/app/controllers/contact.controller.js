import transporter from "../../configuration/email.config.js";
import ApiError from "../errors/error.js";

class ContactController {
  static async sendContactEmail(req, res, next) {
    const { email, subject, message } = req.body;

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
