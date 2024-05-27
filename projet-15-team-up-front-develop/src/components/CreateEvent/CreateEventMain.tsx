/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.scss';
import toast from 'react-hot-toast';
import Footer from '../Homepage/Footer/Footer';
import CreateEvent from './CreateEvent';
import Header from '../Homepage/Headers/Header/Header';

// Fonction afin de récupérer l'id du user connecté pour pouvoir par la suite l'intégrer au champs organizer (voir useEffect ligne 94)
const getUserInfo = async (token: string) => {
  try {
    // On interroge l'API en get pour récupérer les infos du user
    const response = await axios.get<{ data: { id: number } }>(
      `user/myProfile`,
      {
        headers: {
          // Vérifie que le token soit bien présent
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response.data;
    return data.id; // <== Cette ligne retourne l'ID de l'utilisateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur : ",
      error
    );
  }
};

function CreateEventMain() {
  const [sport, setSport] = useState([]);
  const [level, setLevel] = useState([]);
  const [eventData, setEventData] = useState<{
    title: string;
    date: string;
    organizer: number | undefined;
    description: string;
    number_of_participants: number;
    address: string;
    start_time: string;
    end_time: string;
    level_id: number | undefined;
    sport_id: number | undefined;
  }>({
    title: '',
    date: '',
    organizer: undefined,
    description: '',
    number_of_participants: 0,
    address: '',
    start_time: '',
    end_time: '',
    level_id: undefined,
    sport_id: undefined,
  });
  const token = localStorage.getItem('token');
  // Utile pour la redirection
  const navigate = useNavigate();

  const handleCreateEventChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const numericValue =
      name === 'sport_id' ||
      name === 'level_id' ||
      name === 'number_of_participants'
        ? parseInt(value, 10)
        : value;

    setEventData({ ...eventData, [name]: numericValue });

    if (name === 'date') {
      setEventData({ ...eventData, date: value });
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfo(token).then((userId) => {
        // La variable "fetchedUserId" peut s'appeler "toto" reçoit la valeur retournée par getUserInfo (ici return data.id)
        if (userId) {
          // pareil ici, on peut chosir n'importe quel nom. ici tata prends les paramètres défini avec typescript au début
          setEventData((prevEventData) => ({
            ...prevEventData,
            organizer: userId, //  <== Utilisation de "userId" pour mettre à jour organizer
          }));
        }
      });
    }
  }, [token]);

  // fonction pour envoyer le formulaire de création d'activité
  const handleCreateEventSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Vérifiez que tous les champs requis sont remplis
    const {
      title,
      date,
      address,
      start_time,
      end_time,
      number_of_participants,
    } = eventData; // Remplacez ces champs par ceux requis dans votre formulaire
    if (
      !title ||
      !date ||
      !address ||
      !start_time ||
      !end_time ||
      !number_of_participants
    ) {
      toast.error('Veuillez renseigner tous les champs');
      return;
    }

    // Effectuez la requête axios pour créer l'événement
    axios
      .post('events', eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Si la requête réussit, affichez le toast de succès et redirigez l'utilisateur
        toast.success(`L'activité a bien été créée`, {
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
        navigate('/');
      })
      .catch(() => {
        // Si la requête échoue, affichez le toast d'erreur
        toast.error(
          "Une erreur est survenue lors de la création de l'activité"
        );
      });
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
    <>
      <Header />
      <CreateEvent
        sports={sport}
        levels={level}
        onChange={handleCreateEventChange}
        onSubmit={handleCreateEventSubmit}
      />
      <Footer />
    </>
  );
}

export default CreateEventMain;
