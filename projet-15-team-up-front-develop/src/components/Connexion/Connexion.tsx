import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './Connexion.scss';
import { Button } from 'semantic-ui-react';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ConnexionProps {
  setShowConnexionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Connexion({ setShowConnexionModal }: ConnexionProps) {
  const [closeModal, setCloseModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const [inscriptionData, setInscriptionData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    date_of_birth: '',
  });

  const [connexionData, setConnexionData] = useState({
    email: '',
    password: '',
  });

  // Fonction pour fermer la modal
  const handleCloseModal = () => {
    setCloseModal(true); //  Cela met à jour l'état local closeModal à true. Cet état est utilisé pour ajouter la classe hidden à la section de la modal. Cela permet de cacher la modal à la fermeture
    setShowConnexionModal(false);
  };

  // Fonction pour check la charte de bonnes conduites
  const toggleCheck = () => {
    setChecked(!checked);
  };

  // Fonction pour valider la connexion
  const handleConnexionSubmit = () => {
    // console.log('Données de connexion:', connexionData);
    axios
      .post(`user/login`, connexionData)
      .then((response) => {
        // console.log('réponse de connexion:', response.data);

        const { token } = response.data;
        const { id } = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        handleCloseModal();
        toast.success('Vous êtes connecté', {
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
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error);
        toast.error('Veuillez renseigner votre email et mot de passe');
      });
  };

  // Fonction pour vérifier le format du mdp
  const isStrongPassword = (verifPassword: string) => {
    // Expression régulière pour vérifier la force du mot de passe
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(verifPassword);
  };

  // Fonction pour vérifier le format de la date de naissance
  const isValidDateOfBirthFormat = (dateOfBirth: string) => {
    // Expression régulière pour valider le format de la date de naissance JJ/MM/AAAA
    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateOfBirth);
  };

  // Fonction pour valider l'inscription
  const handleInscriptionSubmit = () => {
    // console.log("Données d'inscription:", inscriptionData);

    // Vérification des champs du formulaire
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { email, password, last_name, first_name, username, date_of_birth } =
      inscriptionData;

    if (
      !email ||
      !password ||
      !last_name ||
      !first_name ||
      !username ||
      !date_of_birth
    ) {
      toast.error('Veuillez remplir tous les champs du formulaire');
      return;
    }

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/;

    if (!nameRegex.test(first_name)) {
      toast.error('Le prénom ne doit contenir que des lettres');
      return;
    }

    if (!nameRegex.test(last_name)) {
      toast.error('Le nom de famille ne doit contenir que des lettres');
      return;
    }

    // Vérification du format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Veuillez saisir une adresse e-mail valide');
      return;
    }

    // Vérification du mot de passe
    if (!isStrongPassword(inscriptionData.password)) {
      toast.error(
        `Le mot de passe doit faire au moins 8 caractères de long et contenir :
            - Une majuscule 
            - Un chiffre
            - Un caractère spécial`
      );
      return;
    }

    // Vérification du format de la date de naissance
    if (!isValidDateOfBirthFormat(inscriptionData.date_of_birth)) {
      toast.error('Le format de la date de naissance doit être JJ/MM/AAAA');
      return;
    }

    // Envoyer les données d'inscription uniquement si le formulaire d'inscription est soumis
    axios
      .post(`user`, inscriptionData)
      .then((response) => {
        console.log('Utilisateur enregistré:', response.data);
        handleCloseModal();
        toast.success('Votre inscription a bien été prise en compte', {
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
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement de l'utilisateur : ",
          error
        );
        if (error.response && error.response.status === 409) {
          const errorMessage = error.response.data;
          console.log(errorMessage);
          if (errorMessage.includes('Pseudonyme')) {
            toast.error('Ce pseudonyme est déjà utilisé');
          } else if (errorMessage.includes('email')) {
            toast.error('Cette adresse e-mail est déjà utilisée');
          } else {
            toast.error("Une erreur s'est produite lors de l'inscription");
          }
        } else {
          toast.error("Une erreur s'est produite lors de l'inscription");
        }
      });
  };

  // Fonction pour modifier l'état des inputs de la connexion
  const handleConnexionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e);

    setConnexionData({ ...connexionData, [name]: value });
  };

  // Fonction pour modifier l'état des inputs de l'inscription
  const handleInscriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInscriptionData({ ...inscriptionData, [name]: value });
  };

  return (
    <section className={`modal ${closeModal ? 'hidden' : ''}`}>
      <div className="modal__content">
        <div className="connexion">
          <div className="connexion__header">
            <h1 className="connexion__title">
              Bienvenue sur T<span style={{ color: '#385B81' }}>E</span>AM
              <span style={{ color: '#E7B613' }}>&apos;</span>UP
            </h1>
            <AiFillCloseCircle
              onClick={handleCloseModal}
              className="connexion__closeButton"
              style={{
                color: '#e7b613',
                fontSize: '2.5rem',
              }}
            />
          </div>
          <h3 className="inscription__title"> Connexion</h3>
          <div className="connexion__input">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={connexionData.email}
              onChange={handleConnexionChange}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={connexionData.password}
              onChange={handleConnexionChange}
            />
          </div>

          <Button className="connexionButton" onClick={handleConnexionSubmit}>
            Connexion
          </Button>
        </div>
        <div className="inscription">
          <h3 className="inscription__title"> Inscription</h3>
          <div className="inscription__input">
            <input
              type="text"
              placeholder="Prénom"
              name="first_name"
              value={inscriptionData.first_name}
              onChange={handleInscriptionChange}
            />
            <input
              type="text"
              placeholder="Nom"
              name="last_name"
              value={inscriptionData.last_name}
              onChange={handleInscriptionChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={inscriptionData.email}
              onChange={handleInscriptionChange}
            />
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              name="username"
              value={inscriptionData.username}
              onChange={handleInscriptionChange}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={inscriptionData.password}
              onChange={handleInscriptionChange}
            />
            <input
              type="text"
              placeholder="25/04/1989"
              name="date_of_birth"
              value={inscriptionData.date_of_birth}
              onChange={handleInscriptionChange}
            />
            <div className="inscription__checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={toggleCheck}
                />
                Accepter
                <Link to="/conditions"> la charte de bonne conduite</Link>
              </label>
            </div>
          </div>
          <Button
            className="ui button connexionButton"
            disabled={!checked}
            onClick={handleInscriptionSubmit}
          >
            Valider
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Connexion;
