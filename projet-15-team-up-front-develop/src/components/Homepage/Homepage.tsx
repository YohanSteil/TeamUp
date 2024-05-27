import { useEffect, useState } from 'react';
import axios from 'axios';

import Footer from './Footer/Footer';
import Header from './Headers/Header/Header';
import Main from './Main/Main';

function Home() {
  const [event, setEvent] = useState([]);
  const [level, setLevel] = useState([]);
  const getAllEvents = () => {
    axios
      .get(`events/lastest`)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));

    axios
      .get(`level`)
      .then((response) => {
        setLevel(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <Header />
      <Main events={event} levels={level} />
      <Footer />
    </>
  );
}
export default Home;
