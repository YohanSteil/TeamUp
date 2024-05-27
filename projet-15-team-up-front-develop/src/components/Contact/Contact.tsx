import './Contact.scss';
import Footer from '../Homepage/Footer/Footer';
import HeaderBis from '../Homepage/Headers/HeaderBis/HeaderBis';

function Contact() {
  return (
    <>
      <HeaderBis />
      <form className="contact">
        <h2 className="contact__tittle"> CONTACT</h2>
        <input className="email" type="text" placeholder="Adresse e-mail" />
        <input className="objet" type="text" placeholder="Objet" />
        <textarea placeholder="Message" className="message" />
        <button type="button" className="btn">
          Envoyer
        </button>
      </form>

      <Footer />
    </>
  );
}
export default Contact;
