import './Event.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../Homepage/Footer/Footer';
import Event from './Event';
import Header from '../Homepage/Headers/Header/Header';

function EventMain() {
  // récupere l'id dans l'url
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventData = async () => {
      try {
        // Recupère les données de l'event
        const response = await axios.get(`events/${id}`);
        // Met à jour l'event
        console.log(response.data.data);

        setEvent(response.data.data[0]);
      } catch (error) {
        console.error(`Une erreur s'est produite : ${error}`);
      }
    };
    getEventData();
  }, [id]);
  return (
    <>
      <Header />
      {event && <Event event={event} />}
      <Footer />
    </>
  );
}
export default EventMain;
