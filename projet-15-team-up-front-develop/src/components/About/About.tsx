import './About.scss';
import Footer from '../Homepage/Footer/Footer';
import HeaderBis from '../Homepage/Headers/HeaderBis/HeaderBis';

function About() {
  return (
    <>
      <HeaderBis />
      <div className="about">
        <h2 className="title">À Propos de Team’Up</h2>
        <div>
          Chez Team’Up, nous croyons en la puissance du sport pour rassembler
          les gens, inspirer la communauté et créer des liens durables. Notre
          mission est de connecter les passionnés de sport, qu’ils soient
          amateurs ou passionnés, pour des expériences uniques et motivantes.
        </div>
        <h3>Notre Vision</h3>
        <div>
          Nous imaginons un monde où chaque personne peut trouver un partenaire
          d’entraînement, un coéquipier ou un mentor sportif. Que vous cherchiez
          à jouer au football, à faire du yoga, à courir un marathon ou à
          escalader des montagnes, Team Up est là pour vous aider à trouver la
          bonne personne.
        </div>
        <h3>Qui Sommes-Nous ? </h3>
        <div>
          Team’Up est une application dédiée aux sportifs de tous niveaux. Notre
          communauté dynamique comprend des athlètes, des amateurs de fitness,
          des coachs, des passionnés de plein air et bien d’autres. Nous sommes
          fiers de créer un espace où chacun peut partager sa passion, trouver
          des partenaires d’entraînement et s’inspirer mutuellement.
        </div>
        <h3>Nos Valeurs</h3>
        <ol>
          <li>
            Passion : Nous sommes passionnés par le sport et croyons en son
            pouvoir de transformation.
          </li>
          <li>
            Inclusion : Chez Team Up, tout le monde est le bienvenu, quel que
            soit son niveau de compétence.
          </li>
          <li>
            Collaboration : Nous croyons que le succès vient de la collaboration
            et du soutien mutuel.
          </li>
          <li>
            Respect : Nous respectons nos utilisateurs, leurs objectifs et leurs
            limites.
          </li>
        </ol>
        <h3>Rejoignez-Nous !</h3>
        <ol>
          <li className="last">
            Inscrivez vous sur Team’Up dès aujourd’hui et commencez à rencontrer
            des personnes partageant les mêmes intérêts sportifs. Ensemble, nous
            pouvons repousser nos limites, créer des souvenirs et vivre une vie
            active et épanouissante.
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
}
export default About;
