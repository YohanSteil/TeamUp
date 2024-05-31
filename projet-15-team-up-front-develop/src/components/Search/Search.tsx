import { Link, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardMeta,
  Icon,
  Image,
} from 'semantic-ui-react';
// import LevelComponent from '../Homepage/Main/Level';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Search() {
  // Utilisation de useLocation : Ce hook de React Router permet d'accéder à l'objet location, qui contient des informations sur l'URL actuelle.
  const location = useLocation();
  // Extraction des paramètres de recherche : URLSearchParams permet de lire les paramètres de la requête dans l'URL (la partie après le ?).
  const searchParams = new URLSearchParams(location.search);
  // Récupération des valeurs des paramètres : Ces lignes récupèrent les valeurs des paramètres de recherche address, date, level, et sport. Si un paramètre n'est pas présent, une chaîne vide est utilisée par défaut.
  const address = searchParams.get('address') || '';
  const date = searchParams.get('date') || '';
  const level = searchParams.get('level') || '';
  const sport = searchParams.get('sport') || '';
  const [searchResult, setSearchResult] = useState<Event[]>([]);

  interface Event {
    id: number;
    title: string;
    date: string;
    address: string;
    sport_image: string;
    level_name: string;
    number_of_participants: number;
  }

  useEffect(() => {
    // Effectuer la recherche une fois que les paramètres sont disponibles
    axios
      .get('events/search', {
        params: { address, date, level, sport }, // Passer les paramètres de recherche
      })
      .then((response) => {
        // console.log('Recherche effectuée:', response.data.data);
        setSearchResult(response.data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche d'activité : ", error);
        toast.error('Aucune activité trouvée');
      });
  }, [address, date, level, sport]); // Exécuter l'effet à chaque changement des paramètres de recherche

  return (
    <>
      <h1 style={{ justifyContent: 'center', display: 'flex' }}>
        Résultats de la recherche
      </h1>
      <section>
        <div className="main__card">
          <CardGroup>
            <ul>
              {searchResult.map((result) => (
                <li key={result.id}>
                  <Link to={`/event/${result.id}`}>
                    <Card className="card">
                      <Image
                        src={`http://localhost:3000/${result.sport_image}`}
                        wrapped
                        ui={false}
                      />
                      <CardContent>
                        <CardHeader>{result.title}</CardHeader>
                        <CardMeta>
                          <span className="date">{result.date}</span>
                          <br />
                          <span className="date">{result.address}</span>
                          <br />
                          <span className="levelResult">
                            Niveau: {result.level_name}
                          </span>
                        </CardMeta>
                      </CardContent>
                      <CardContent extra>
                        <Icon name="user" /> Participants maximum :
                        {result.number_of_participants}
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </CardGroup>
        </div>
      </section>
    </>
  );
}

export default Search;
