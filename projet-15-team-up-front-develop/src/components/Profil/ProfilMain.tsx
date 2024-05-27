import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import d'Axios
// import { useParams } from 'react-router-dom';
import Footer from '../Homepage/Footer/Footer';
import Profil, { User } from './Profil';
import Header from '../Homepage/Headers/Header/Header';

function ProfilMain() {
  // const { id } = useParams();

  const [userData, setUserData] = useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    date_of_birth: '',
    photo: '',
    description: '',
  });

  const token = localStorage.getItem('token');
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
      console.log('IIIIIICCCCCCIIIIIIII:', userDataFromAPI); // Ajout du log pour vérification
      setUserData(userDataFromAPI);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur : ",
        error
      );
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Profil users={userData} />
      <Footer />
    </>
  );
}

export default ProfilMain;
