import React from 'react';
import './Footer.scss';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <section className="footer">
      <div className="footer__icons">
        <Link to="https://www.facebook.com">
          <FaFacebookSquare
            style={{
              color: '#ffffff',
              fontSize: '2rem',
            }}
          />
        </Link>

        <Link to="https://www.instagram.com">
          <FaInstagram
            style={{
              color: '#ffffff',
              fontSize: '2rem',
            }}
          />
        </Link>
        <Link to="https://twitter.com">
          <BsTwitterX
            style={{
              color: '#ffffff',
              fontSize: '2rem',
            }}
          />
        </Link>
      </div>
      <div className="footer__links">
        <div className="left">
          <Link to="/about">A propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="right">
          <Link to="/legalnotice">Mentions légales</Link>
          <Link to="/conditions">Charte de bonne conduite</Link>
        </div>
      </div>
    </section>
  );
}

export default Footer;
