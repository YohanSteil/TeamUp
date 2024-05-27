import Footer from '../Homepage/Footer/Footer';
import HeaderBis from '../Homepage/Headers/HeaderBis/HeaderBis';
import './Conditions.scss';

function Conditions() {
  return (
    <>
      <HeaderBis />
      <div className="conditions">
        <h2 className="conditions__title">Charte de Bonne Conduite Team’Up</h2>
        <h3>
          <span className="number">1</span>
          <span className="point">.</span>
          Respect et Bienveillance
        </h3>
        <ol>
          <li>
            Respectez les autres membres de la communauté. Soyez courtois,
            empathique et ouvert d’esprit.
          </li>
          <li>Évitez tout langage offensant, discriminatoire ou violent.</li>
          <li>
            Traitez chacun avec dignité et respect, quel que soit son niveau
            sportif, son origine ou son orientation.
          </li>
        </ol>
        <h3>
          <span className="number">2</span>
          <span className="point">.</span> Confidentialité et Sécurité
        </h3>
        <ol>
          <li>
            Protégez vos informations personnelles. Ne partagez pas
            d’informations sensibles avec des inconnus.
          </li>
          <li>
            Signalez tout comportement suspect ou inapproprié à notre équipe de
            modération.
          </li>
        </ol>
        <h3>
          <span className="number">3</span>
          <span className="point">.</span> Sportivité
        </h3>
        <ol>
          <li>Respectez les règles du sport que vous avez choisi.</li>
          <li>
            Soyez fair-play et encouragez vos coéquipiers, même en cas de
            défaite.
          </li>
          <li>Évitez toute tricherie ou comportement antisportif.</li>
        </ol>
        <h3>
          <span className="number">4</span>
          <span className="point">.</span> Communication
        </h3>
        <ol>
          <li>
            Utilisez un langage approprié dans vos messages et discussions.
          </li>
          <li>
            Soyez réactif et respectez les rendez-vous sportifs que vous avez
            fixés.
          </li>
        </ol>
        <h3>
          <span className="number">5</span>
          <span className="point">.</span> Signalement
        </h3>
        <ol>
          <li>
            Si vous rencontrez un problème, signalez-le immédiatement à notre
            équipe.
          </li>
          <li className="last">
            Ensemble, nous pouvons maintenir un environnement sain et agréable
            pour tous.
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
}
export default Conditions;
