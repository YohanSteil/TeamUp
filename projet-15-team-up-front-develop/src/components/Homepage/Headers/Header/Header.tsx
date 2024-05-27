import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { ButtonOr, ButtonGroup, Button } from 'semantic-ui-react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Connexion from '../../../Connexion/Connexion';
import HeaderSearchBar from './HeaderSearchBar';

function Header() {
  const [showConnexionModal, setShowConnexionModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [sport, setSport] = useState([]);
  const [level, setLevel] = useState([]);
  const [searchData, setSearchData] = useState({
    address: '',
    sport: '',
    level: '',
    date: '',
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Une fois le user connecté on affiche le message de bienvenue
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (!userId) {
          console.error("Aucun ID d'utilisateur trouvé dans le stockage local");
          return;
        }
        const response = await axios.get(`user/myProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { username } = response.data.data;
        const formattedUsername =
          // Le code prend une chaîne username et la formate en : Mettant la première lettre en majuscule + Mettant toutes les autres lettres en minuscules après Slice
          username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
        const welcomeMsg = `Bienvenue ${formattedUsername}`;
        setWelcomeMessage(welcomeMsg);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur : ",
          error
        );
      }
    };
    if (token) {
      setIsLoggedIn(true);
      getUserInfo();
    }
  }, [token, userId]);

  // Ouvre la modale de connexion
  const openConnexionModal = () => {
    setShowConnexionModal(true);
  };

  // Fonction pour déconnexion au click sur se déconnecter
  const handleLogout = () => {
    // Supprime token et userId du localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    toast.success('Vous êtes déconnecté', {
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
  };

  // met à jour les données de recherche
  const handleSearchChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const numericValue =
      name === 'sport' || name === 'level' || name === 'number_of_participants'
        ? parseInt(value, 10)
        : value;

    setSearchData({ ...searchData, [name]: numericValue });

    if (name === 'date') {
      setSearchData({ ...searchData, date: value });
    }
  };

  // Fonction pour lancer la recherche au click sur la loupe
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Données de recherche:', searchData);

    // Construire l'URL avec les paramètres de recherche
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { address, date, level, sport } = searchData;
    const encodedAddress = encodeURIComponent(address || '');
    const encodedDate = encodeURIComponent(date || '');
    const encodedLevel = encodeURIComponent(level || '');
    const encodedSport = encodeURIComponent(sport || '');
    const url = `/search?address=${encodedAddress}&date=${encodedDate}&level=${encodedLevel}&sport=${encodedSport}`;

    axios
      .get('events/search', {
        params: searchData, // Passer les données de recherche ici
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche d'activité : ", error);
        alert("Erreur lors de la recherche d'activité. Veuillez réessayer.");
      });
    navigate(url);
  };

  useEffect(() => {
    axios
      .get(`sport`)
      .then((response) => {
        setSport(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des sports:', error);
      });

    axios
      .get(`level`)
      .then((response) => {
        setLevel(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      });
  }, []);

  return (
    <section className="header">
      <div className="header__top">
        <Link to="/">
          <img className="header__logo" src="/logo.jpeg" alt="" />
        </Link>
        <Link to="/">
          <div className="header__title">
            <h1>
              T<span className="header__letter">E</span>AM{' '}
              <span className="header__apostrophe">&apos;</span>UP
            </h1>
            <h2 className="slogan">Let&apos;s sport together !</h2>
          </div>
        </Link>

        <div className="header__buttons">
          {isLoggedIn ? (
            <div>
              <h2> {welcomeMessage} </h2>
              <ButtonGroup size="big">
                <Button className="deconnexion" onClick={handleLogout}>
                  Déconnexion
                </Button>
                <Link to="/user/myProfile">
                  <Button className="inscription">Profil</Button>
                </Link>
              </ButtonGroup>
            </div>
          ) : (
            <div className="connect">
              <ButtonGroup size="big">
                <Button className="connexion" onClick={openConnexionModal}>
                  Connexion
                </Button>
                <ButtonOr className="or" text="ou" />
                <Button className="inscription" onClick={openConnexionModal}>
                  Inscription
                </Button>
              </ButtonGroup>
            </div>
          )}
        </div>
      </div>
      <div className="header__choice">
        <HeaderSearchBar
          sports={sport}
          levels={level}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <div className="header__createActivity">
          <h3>Crée une activité</h3>
          <div id="wrapper">
            <Link to="/event/create" className="my-super-cool-btn">
              <div className="dots-container">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
              <span className="btnGo" />
            </Link>
          </div>
        </div>
      </div>
      {showConnexionModal && (
        <Connexion setShowConnexionModal={setShowConnexionModal} />
      )}
    </section>
  );
}

export default Header;
