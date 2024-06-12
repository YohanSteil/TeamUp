import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.scss';
import toast from 'react-hot-toast';
import Footer from '../Homepage/Footer/Footer';
import CreateEvent from './CreateEvent';
import Header from '../Homepage/Headers/Header/Header';

/* ICI : Utile pour récupérer les données du user (surtout son id) */
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

export type EventData = {
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
  address_lat: number;
  address_lng: number;
};

function CreateEventMain() {
  const [sport, setSport] = useState([]);
  const [level, setLevel] = useState([]);
  const [eventData, setEventData] = useState<EventData>({
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
    address_lat: 0,
    address_lng: 0,
  });

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
    console.log('HEEEEEEERE:', typeof eventData.sport_id);
  };

  /** **** ICI : Utile pour récupérer les données du user (surtout son id) ****** */
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      console.log('POOOOOOOOOOOO:', token);
      getUserInfo(token).then((fetchedUserId) => {
        // Renommer la variable en fetchedUserId
        if (fetchedUserId) {
          setEventData((prevEventData) => ({
            ...prevEventData,
            organizer: fetchedUserId, // Utiliser le nouveau nom de la variable
          }));
        }
      });
    }
  }, [token]);

  const handleCreateEventSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Données de création d'activité:", eventData);

    axios
      .post(`events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Activité créée:', response.data);
        navigate('/');
        toast.success(`L'activité a bien été crée`, {
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
      .catch(() => {
        toast.error('Veuillez renseigner tous les champs');
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
        eventData={eventData}
        onSetEventGeoLocation={(geoLocationData) =>
          setEventData((prev) => ({
            ...prev,
            address_lat: geoLocationData.address_lat,
            address_lng: geoLocationData.address_lng,
          }))
        }
      />
      <Footer />
    </>
  );
}

export default CreateEventMain;