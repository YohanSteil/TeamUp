import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './HeaderTer.scss';
import { useState } from 'react';
import { ButtonOr, ButtonGroup, Button } from 'semantic-ui-react';
import Connexion from '../../../Connexion/Connexion';

function HeaderTer() {
  const [showConnexionModal, setShowConnexionModal] = useState(false);

  const openConnexionModal = () => {
    setShowConnexionModal(true);
  };
  return (
    <section className="headerTer">
      <div className="headerTer__top">
        <a href="/">
          <img className="headerTer__logo" src="src/assets/logo.jpeg" alt="" />
        </a>
        <a href="/">
          <div className="headerTer__title">
            <h1>
              T<span className="headerTer__letter">E</span>AM
              <span className="headerTer__apostrophe">'</span>UP
            </h1>
            <h2>Let's sport together !</h2>
          </div>
        </a>
        <ButtonGroup className="header__buttons" size="big">
          <Button className="connexion" onClick={openConnexionModal}>
            Connexion
          </Button>
          <ButtonOr text="ou" />
          <Button className="inscription" onClick={openConnexionModal}>
            Inscription
          </Button>
        </ButtonGroup>
      </div>
      {showConnexionModal && <Connexion onClose={setShowConnexionModal} />}
    </section>
  );
}

export default HeaderTer;
