import React, { ChangeEvent, useEffect, useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Profil.scss';
import {
  Button,
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardMeta,
  Icon,
  Image,
} from 'semantic-ui-react';
import axios from 'axios';

import { Event } from '../Homepage/Main/Main';

// Définis le type des données utilisateur
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  date_of_birth: string;
  photo: string;
  description: string;
}

// Définis le type des props pour Profil
interface UserProps {
  users: User; // Utilise le type UserData ou null si les données ne sont pas encore chargées
}

function Profil({ users }: UserProps) {
  // Utilise props.userData pour accéder aux données utilisateur
  // const userData = users.data;

  // const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // const selectedData = id
  //   ? users.find((user) => user.id === parseInt(id, 10))
  //   : undefined;

  // État pour l'utilisateur
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<Event[]>([]);

  const getLastFiveEvents = () => {
    axios
      .get(`user/${users.id}/lastEventParticipate`)
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    // Mettre à jour le pseudo avec celui récupéré depuis l'API
    setUser(users);
    // setPseudo(users.username);
    // setImage(users.photo);
    // setDescription(users.description);
    getLastFiveEvents();
  }, [users]);

  // Fonction pour gérer le changement de photo
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        if (!token) {
          toast.error('Vous devez être connecté pour effectuer cette action.');
          return;
        }

        const reader = new FileReader();

        reader.onloadend = async () => {
          // Convertir le contenu de l'image en base64
          const base64Image = reader.result?.toString().split(',')[1];

          // Envoi de la requête PATCH avec l'image encodée en base64
          const response = await axios.patch(
            `user/myProfile`,
            { photo: base64Image },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            toast.success('Photo de profil mis à jour avec succès!', {
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
            // Mettre à jour l'état de l'image si nécessaire
            console.log(response.data);
            setUser(response.data);
          } else {
            toast.error('Échec de la mise à jour de la photo de profil.');
          }
        };

        // Lecture du contenu du fichier sous forme d'URL de données
        reader.readAsDataURL(file);
      } catch (error) {
        console.error(
          'Erreur lors de la mise à jour de la photo de profil :',
          error
        );
        toast.error(
          'Une erreur est survenue lors de la mise à jour de la photo de profil.'
        );
      }
    } else {
      console.error('Fichier non trouvé');
      toast.error(
        'Une erreur est survenue lors de la récupération du fichier.'
      );
    }
  };

  // Fonction pour gérer le changement de pseudo
  const handleChangePseudo = async () => {
    const newPseudo = prompt("Entrez votre nouveau nom d'utilisateur :");

    if (newPseudo) {
      try {
        // Vérifier si le token est disponible dans le stockage local
        if (!token) {
          toast.error('Vous devez être connecté pour effectuer cette action.');
          return;
        }

        const response = await axios.patch(
          `user/myProfile`,
          {
            username: newPseudo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Vérifier si la mise à jour a réussi
        if (response.status === 200) {
          // Mettre à jour le pseudo dans l'état local
          setUser(response.data);
          toast.success('Pseudo modifié avec succès !', {
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
        } else {
          toast.error("Échec de la mise à jour du nom d'utilisateur.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du nom d'utilisateur :",
          error
        );
        toast.error(
          "Nom d'utilisateur déjà utilisé, merci d'en choisir un autre"
        );
      }
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    );

    if (confirmDelete) {
      console.log('Tentative de suppression du compte utilisateur...');

      axios
        .delete(`user/myProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Réponse de l'API:", response);
          // Suppression réussie, rediriger l'utilisateur vers la page de connexion
          toast.success('Votre compte à été supprimé avec succès', {
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
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression du compte : ', error);

          toast.error(
            "Une erreur s'est produite lors de la suppression de votre compte."
          );
        });
    } else {
      console.log("Suppression du compte annulé par l'utilisateur.");
    }
  };

  // const handleUpdatePresentation = async () => {
  //   const textareaElement = document.querySelector(
  //     'textarea[name="presentation"]'
  //   ) as HTMLTextAreaElement | null;

  //   if (textareaElement) {
  //     const newPresentation = textareaElement.value;

  //     try {
  //       if (!token) {
  //         toast.error('Vous devez être connecté pour effectuer cette action.');
  //         return;
  //       }

  //       const response = await axios.patch(
  //         `user/myProfile`,
  //         { description: newPresentation },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         // Mettre à jour la description dans l'état local
  //         setUser(response.data);
  //         toast.success('Présent mise à jour', {
  //           duration: 3000,
  //           style: {
  //             boxShadow: 'rgba(0, 0, 0, 0.8) 0px 19px 38px',
  //             border: '1px solid green',
  //             marginTop: '20px',
  //             fontSize: '1.3rem',
  //             background: 'white',
  //             color: 'green',
  //           },
  //         });
  //       } else {
  //         toast.error('Échec de la mise à jour de la présentation.');
  //       }
  //     } catch (error) {
  //       console.error(
  //         'Erreur lors de la mise à jour de la preésentation :',
  //         error
  //       );
  //       toast.error(
  //         'Une erreur est survenue lors de la mise à jour de la présentation.'
  //       );
  //     }
  //   } else {
  //     console.error('Textarea element not found');
  //     toast.error(
  //       'Une erreur est survenue lors de la récupération de la présentation.'
  //     );
  //   }
  // };

  const handleUpdateProfile = async () => {
    try {
      const newFirstNameInput = document.querySelector(
        'input[name="first_name"]'
      ) as HTMLInputElement;
      const newLastNameInput = document.querySelector(
        'input[name="last_name"]'
      ) as HTMLInputElement;
      const newEmailInput = document.querySelector(
        'input[name="email"]'
      ) as HTMLInputElement;
      const newDateOfBirthInput = document.querySelector(
        'input[name="date_of_birth"]'
      ) as HTMLInputElement;
      const newDescriptionInput = document.querySelector(
        'input[name="description"]'
      ) as HTMLInputElement;

      if (
        !newFirstNameInput ||
        !newLastNameInput ||
        !newEmailInput ||
        !newDateOfBirthInput ||
        !newDescriptionInput
      ) {
        toast.error(
          'Une erreur est survenue lors de la récupération des champs.'
        );
        return;
      }

      const newFirstName = newFirstNameInput.value;
      const newLastName = newLastNameInput.value;
      const newEmail = newEmailInput.value;
      const newDateOfBirth = newDateOfBirthInput.value;
      const newDescription = newDescriptionInput.value;

      // Vérifiez si le token est disponible dans le stockage local
      if (!token) {
        toast.error('Vous devez être connecté pour effectuer cette action.');
        return;
      }

      // Envoyez les valeurs modifiées à votre backend pour mise à jour
      const response = await axios.patch(
        `user/myProfile`,
        {
          first_name: newFirstName,
          last_name: newLastName,
          email: newEmail,
          date_of_birth: newDateOfBirth,
          description: newDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Vérifiez si la mise à jour a réussi
      if (response.status === 200) {
        // Mettez à jour l'état local avec les nouvelles données
        setUser(response.data);
        toast.success('Profil mis à jour avec succès !', {
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
      } else {
        toast.error('Échec de la mise à jour du profil.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      toast.error('Une erreur est survenue lors de la mise à jour du profil.');
    }
  };

  // Rendu du composant Profil
  return (
    <section className="profil">
      <h1>Mon Profil</h1>

      <div className="profil__container">
        <div className="photo">
          <h2 className="photo__title">Photo de profil</h2>
          <div className="photo__containerPhoto">
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById(
                  'profile-photo-input'
                ) as HTMLInputElement;
                input.click();
              }}
              className="photo__change-photo-button"
            >
              +
            </button>
            <div className="photo__container">
              <label htmlFor="profile-photo-input" className="photo__label">
                {user?.photo ? (
                  <img
                    src={`http://localhost:3000/${user.photo}`}
                    alt="Profile"
                    className="photo__photo"
                  />
                ) : (
                  <div className="photo__empty-photo">+</div>
                )}
              </label>
              <input
                id="profile-photo-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="photo__input"
              />
            </div>
          </div>
        </div>
        <div className="pseudo">
          <div className="pseudo__container">
            <h2 className="pseudo__container__title">Nom d&apos;utilisateur</h2>
            <div className="pseudo__container__pseudoIcon">
              <p className="pseudo__p">{user?.username}</p>
              <button
                type="button"
                aria-label="icon"
                onClick={handleChangePseudo}
              >
                <FaPenToSquare className="pseudo__pen" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="personal_infos">
        <h3 className="personal_infos__title">Mes informations personnelles</h3>
        <div className="inputs">
          <div className="custom_input">
            <p className="custom_input__title">Nom: </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg_icon bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <input
              className="input"
              type="text"
              name="first_name"
              placeholder="Nom"
            />
          </div>
          <div className="custom_input">
            <p className="custom_input__title">Prénom : </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg_icon bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <input
              className="input"
              type="text"
              name="last_name"
              placeholder="Prénom"
            />
          </div>
          <div className="custom_input">
            <p className="custom_input__title">Email: </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg_icon bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="custom_input">
            <p className="custom_input__title">Date de naissance : </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg_icon bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <input
              className="input"
              type="text"
              name="date_of_birth"
              placeholder="Date de naissance"
            />
          </div>
          {/* <div className="custom_input">
            <p className="custom_input__title">Nom : </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg_icon bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <input
              className="input"
              type="text"
              placeholder="Placeholder Text"
            />
          </div>
          <div className="custom_input">
            <p className="custom_input__title">Nom : </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg_icon bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <input
              className="input"
              type="text"
              placeholder="Placeholder Text"
            />
          </div> */}
        </div>
      </section>

      <div className="presentation">
        <h3 className="presentation__title">Présentation</h3>
        <div className="presentation__box">
          <div className="presentation__txt">
            <p>{user?.description}</p>
          </div>
        </div>
        <div className="custom_input pres">
          <p className="custom_input__title">Votre présentation: </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg_icon bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          <input
            className="input pres"
            type="text"
            name="description"
            placeholder="Présentation.."
          />
        </div>
      </div>
      <div className="activities">
        <div className="activities__username">{user?.username}</div>
        <div className="activities__description">
          Historique des dernières activités
        </div>
      </div>
      <CardGroup>
        <ul>
          {events?.map((event) => (
            <li key={event.id}>
              <Link to={`/event/${event.id}`}>
                <Card className="card">
                  {/* TO DO : Route vers l'image à rendre dynamique ==> http://localhost:3000/ */}
                  <Image
                    src={`http://localhost:3000/${event.sport_image}`}
                    wrapped
                    ui={false}
                  />
                  <CardContent>
                    <CardHeader>{event.title}</CardHeader>
                    <CardMeta>
                      <span className="date">{event.date}</span>
                      <br />
                      <span className="date">{event.address}</span>
                    </CardMeta>
                  </CardContent>
                  <CardContent extra>
                    <Icon name="user" /> Participants maximum :
                    {event.number_of_participants}
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </CardGroup>

      <button
        type="button"
        className="updateButton"
        onClick={handleUpdateProfile}
      >
        Modifier ma description
      </button>

      <button
        type="button"
        className="deleteButton"
        onClick={handleDeleteAccount}
      >
        Supprimer mon compte
      </button>
    </section>
  );
}
export default Profil;
