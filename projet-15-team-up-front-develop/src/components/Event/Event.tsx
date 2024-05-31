/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Image, Button } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

interface EventDetail {
  id: number;
  title: string;
  date: string;
  description: string;
  organizer_id: number;
  organizer_name: string;
  organizer_photo: string;
  sport_id: number;
  sport_name: string;
  level_id: number;
  level_name: string;
  address: string;
  start_time: string;
  end_time: string;
  number_of_participant: number;
  number_of_participant_current: number;
  sport_image: string;
  participants: [
    {
      id: number;
      username: string;
      photo: string;
    },
  ];
}

interface UserData {
  username: string;
  id: number;
  photo: string;
  role: string;
}

interface EventProps {
  event: EventDetail;
}

export default function Event({ event }: EventProps) {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [participants, setParticipants] = useState([
    {
      id: event.organizer_id,
      username: event.organizer_name,
      photo: event.organizer_photo,
    },
    ...event.participants,
  ]);
  const navigate = useNavigate();
  // console.log('TEEEEEEST:', participants);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error("Aucun ID d'utilisateur trouvé dans le stockage local");
          return;
        }
        const response = await axios.get(`user/myProfile`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const userDataFromAPI = response.data.data;
        console.log('User info from API:', userDataFromAPI); // Ajout du log pour vérification
        setUserData(userDataFromAPI);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur : ",
          error
        );
      }
    };

    if (!userData && token) {
      getUserInfo();
    }
  }, [token, userData]);

  // Vérifier si l'événement a été trouvé
  if (!event) {
    return <div>L&apos;événement sélectionné n&apos;existe pas.</div>;
  }

  // Fonction pour gérer la participation à un événement
  async function handleParticipate(): Promise<void> {
    if (!userData) {
      return;
    }

    try {
      // Envoyer une requête au serveur pour ajouter l'utilisateur à la liste des participants
      await axios.post(`events/${event.id}/join`, [], {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setParticipants([
        ...participants,
        { id: userData.id, username: userData.username, photo: userData.photo },
      ]);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de l'utilisateur à la liste des participants : ",
        error
      );
    }
  }

  // Fonction pour gérer la suppression de la participation à un événement
  const handleDeleteParticipation = async () => {
    if (!userData) {
      return;
    }

    try {
      // Envoyer une requête DELETE pour supprimer la participation de l'utilisateur
      await axios.delete(`events/${event.id}/join`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mettre à jour l'état local des participants en filtrant l'utilisateur supprimé
      setParticipants(
        participants.filter(
          (participant) => participant.username !== userData.username
        )
      );
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la participation de l'utilisateur : ",
        error
      );
      // Gérer les erreurs si nécessaire
    }
  };

  const isParticipant = () => {
    if (!userData) {
      return false;
    }

    const foundParticipant = participants.find(
      (participant) => participant.username === userData.username
    );
    return foundParticipant !== undefined;
  };

  const isOrganizer = () => {
    if (!event.organizer_id) {
      return false;
    }
    // Vérifie si l'utilisateur est l'organisateur de l'événement
    return event.organizer_id === userData?.id;
  };

  function handleDeleteEvent() {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cette activité ? Cette action est irréversible.'
    );

    if (confirmDelete) {
      console.log('Tentative de suppression du compte utilisateur...');

      axios
        .delete(`/events/${event.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Réponse de l'API:", response);
          // Suppression réussie, rediriger l'utilisateur vers la page de connexion
          toast.success('Votre activité à été supprimé avec succès', {
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

          navigate('/'); // Redirection vers la page de connexion
        });
    }
  }

  return (
    <div>
      <section className="event">
        <div className="event__header">
          <h1>
            {event.title} - {event.sport_name}
          </h1>
        </div>
        <div>
          <div className="photoAnbButton">
            <img
              src={`http://localhost:3000/${event.sport_image}`}
              alt=""
              className="photoAnbButton__image"
            />
            <Link to="/">
              <button type="button" className="photoAnbButton__button">
                Retour
              </button>
            </Link>
          </div>
          <div className="detailsActivity">
            <div className="detailsActivity__details">
              <div className="detailsActivity__imageAndUsername">
                <Image
                  size="tiny"
                  src={`http://localhost:3000/${event.organizer_photo}`}
                />
                <h3>{event.organizer_name}</h3>
              </div>
              <div className="detailsActivity__infos">
                <p>
                  <span className="detailsActivity__field">
                    Date de l&apos;activité :
                  </span>
                  {event.date}
                </p>
                <p>
                  <span className="detailsActivity__field">Début : </span>
                  {event.start_time}
                </p>
                <p>
                  <span className="detailsActivity__field">Heure de fin :</span>
                  {event.end_time}
                </p>
                <p>
                  <span className="detailsActivity__field">Adresse : </span>
                  {event.address}
                </p>
                <p>
                  <span className="detailsActivity__field"> Niveau : </span>
                  {event.level_name}
                </p>
              </div>
            </div>
            <div />
            <div className="detailsActivity__details">
              <div className="detailsActivity__imageAndUsername">
                <h3>Description de l&apos;activité</h3>
              </div>
              <div className="detailsActivity__infos">
                <p>{event.description}</p>
              </div>
            </div>
            <div />
          </div>
        </div>
        <div className="participant">
          <h3 className="participant__title">
            Participants {participants.length}/{event.number_of_participant}
          </h3>

          {participants.map((participant) => (
            <div key={participant.id} className="participant__detail">
              <Image
                className="img"
                src={`http://localhost:3000/${participant.photo}`}
                avatar
              />
              <Link to={`/user/${participant.username}`}>
                {participant.username}
              </Link>
            </div>
          ))}
        </div>

        {/* Si l'utilisateur n'est pas connecté (!userData), un message lui
    demande de se connecter ou de s'inscrire pour participer à l'événement. */}
        {!userData ? (
          <div className="notConnected">
            Vous devez être connecté pour participer à cet événement. <br />
            <a href="/">Se connecter ou s&apos;inscrire</a>
          </div>
        ) : // Si l'utilisateur est connecté (userData est défini) mais n'est pas l'organisateur (!isOrganizer()), nous vérifions ensuite s'il participe déjà à l'événement (isParticipant()).
        !isOrganizer() ? (
          isParticipant() ? (
            <Button
              className="participateButton"
              onClick={() => handleDeleteParticipation()}
            >
              Annuler ma participation
            </Button>
          ) : (
            <Button
              className="participateButton"
              onClick={() => handleParticipate()}
            >
              Participer
            </Button>
          )
        ) : (
          // Si l'utilisateur est l'organisateur (isOrganizer()), un bouton "Supprimer mon activité" est affiché.
          isOrganizer() && (
            <Button
              className="participateButton"
              onClick={() => handleDeleteEvent()}
            >
              Supprimer mon activité
            </Button>
          )
        )}
      </section>
    </div>
  );
}
