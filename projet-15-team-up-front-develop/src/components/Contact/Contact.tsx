import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Contact.scss';
import Footer from '../Homepage/Footer/Footer';
import HeaderBis from '../Homepage/Headers/HeaderBis/HeaderBis';

type FormData = {
  email: string;
  subject: string;
  message: string;
};

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    subject: '',
    message: '',
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      axios.post('contact/', formData);
      toast.success('Votre message a bien été envoyé', {
        duration: 3000,
        style: {
          boxShadow: 'rgba(0, 0, 0, 0.8) 0px 19px 38px',
          border: '1px solid green',
          marginTop: '20px',
          fontSize: '1.3rem',
          background: 'white',
          color: 'green',
        },
      });
    } catch (error) {
      console.error(`Erreur lors de l'envoi du message : `, error);
      toast.error(`Erreur lors de l'envoi du message, veuillez réessayer.`, {
        duration: 3000,
        style: {
          boxShadow: 'rgba(0, 0, 0, 0.8) 0px 19px 38px',
          border: '1px solid red',
          marginTop: '20px',
          fontSize: '1.3rem',
          background: 'white',
          color: 'red',
        },
      });
    }
  };

  return (
    <>
      <HeaderBis />
      <form className="contact" onSubmit={handleFormSubmit}>
        <h2 className="contact__title">CONTACT</h2>
        <input
          className="email"
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={formData.email}
          onChange={handleFormChange}
        />
        <input
          className="objet"
          type="text"
          name="subject"
          placeholder="Objet"
          value={formData.subject}
          onChange={handleFormChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          className="message"
          value={formData.message}
          onChange={handleFormChange}
        />
        <button type="submit" className="btn">
          Envoyer
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Contact;
