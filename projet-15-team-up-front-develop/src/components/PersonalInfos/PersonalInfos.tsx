import Footer from '../Homepage/Footer/Footer';
import './PersonalInfos.scss';
import HeaderTer from '../Homepage/Headers/HeaderTer/HeaderTer';

function Personalinfos() {
  return (
    <>
      <HeaderTer />
      <section className="personal_infos">
        <h1>Mes informations personnelles</h1>
        <form action="form">
          <div className="input_container">
            <span className="label">Nom</span>
            <input type="text" placeholder="Nom" />
          </div>
          <div className="input_container">
            <span className="label">Prénom</span>
            <input type="text" placeholder="Prénom" />
          </div>
          <div className="input_container">
            <span className="label2">Date de naissance</span>
            <input type="text" placeholder="Date de naissance" />
          </div>
          <div className="input_container">
            <span className="label">Email</span>
            <input type="text" placeholder="Email" />
          </div>
          <div className="input_container">
            <span className="label2">Mot de passe</span>
            <input type="text" placeholder="Nom" />
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
export default Personalinfos;
