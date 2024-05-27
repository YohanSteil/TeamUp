import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './HeaderBis.scss';

function HeaderBis() {
  return (
    <section className="headerBis">
      <div className="headerBis__top">
        <a href="/">
          <img className="headerBis__logo" src="src/assets/logo.jpeg" alt="" />
        </a>
        <a href="/">
          <div className="headerBis__title">
            <h1>
              T<span className="headerBis__letter">E</span>AM{' '}
              <span className="headerBis__apostrophe">'</span>UP
            </h1>
            <h2>Let's sport together !</h2>
          </div>
        </a>
      </div>
    </section>
  );
}

export default HeaderBis;
