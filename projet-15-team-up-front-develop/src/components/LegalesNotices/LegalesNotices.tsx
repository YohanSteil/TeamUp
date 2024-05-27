import Footer from '../Homepage/Footer/Footer';
import HeaderBis from '../Homepage/Headers/HeaderBis/HeaderBis';
import './LegalesNotices.scss';

function LegalesNotices() {
  return (
    <>
      <HeaderBis />
      <div className="LN">
        <h2 className="title">Mentions Légales de Team’Up</h2>
        <h3>Identité du Site</h3>
        <ol>
          <li>Dénomination sociale : [Nom de votre entreprise]</li>
        </ol>
        <h3>Propriété Intellectuelle </h3>
        <ol>
          <li>
            Si vous utilisez des images, illustrations, photographies,
            assurez-vous de faire figurer leur propriété intellectuelle. Pour
            les textes qui ne sont pas les vôtres, recueillez l’autorisation de
            l’auteur ou citez la source du texte.
          </li>
        </ol>
        <h3>Hébergement du Site</h3>
        <ol>
          <li>
            Prévoyez une page de mentions légales qui inclut des informations
            relatives à l’hébergement du site, même si le site est hébergé à
            titre gratuit.
          </li>
        </ol>
        <h3>Protection des Données Personnelles</h3>
        <ol>
          <li>
            Informez les utilisateurs sur la collecte, le traitement et
            l’utilisation de leurs données personnelles conformément aux lois en
            vigueur (par exemple, le RGPD en Europe). Mentionnez la politique de
            confidentialité et les droits des utilisateurs concernant leurs
            données.
          </li>
        </ol>
        <h3>Conditions d’Utilisation et Résiliation d’Abonnement </h3>
        <ol>
          <li className="last">
            Précisez les conditions d’utilisation du site, les règles de
            conduite, les droits et obligations des utilisateurs. Depuis le 1er
            juin 2023, mettez à disposition des utilisateurs une fonctionnalité
            pour résilier gratuitement leur contrat d’abonnement par voie
            électronique, même si le contrat initial n’a pas été conclu par voie
            électronique.
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
}
export default LegalesNotices;
