import React from 'react';
import './ProfilPublic.scss';

function ProfilPublic() {
  return (
    <section className="profil">
      <h1>Mon Profil</h1>
      <div className="profil__container">
        <button
          type="button"
          onClick={() => {
            const input = document.getElementById(
              'profile-photo-input'
            ) as HTMLInputElement;
            input.click();
          }}
          className="change-photo-button"
        >
          +
        </button>
        <div className="profile-photo-container">
          {/* <label htmlFor="profile-photo-input" className="profile-photo-label">
            {image ? (
              <img src={image} alt="Profile" className="profile-photo" />
            ) : (
              <div className="empty-profile-photo">+</div>
            )}
          </label> */}
          {/* <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="profile-photo-input"
          /> */}
        </div>

        <div className="pseudo">
          USERNAME
          {/* <p>{selectedData?.username}</p> */}
        </div>
      </div>
      <div className="all_sports">
        <form action="#" className="select_sport">
          <select>
            <option value="Sport" selected>
              Sport
            </option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Footing">Footing</option>
          </select>
        </form>
        <form action="#" className="select_sport">
          <select id="cars" name="cars">
            <option value="Sport" selected>
              Sport
            </option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Footing">Footing</option>
          </select>
        </form>
        <form action="#" className="select_sport">
          <select id="cars" name="cars">
            <option value="Sport" selected>
              Sport
            </option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Footing">Footing</option>
          </select>
        </form>
      </div>
      <form className="form">
        <textarea
          className="textarea"
          placeholder="Présente toi, tes passions..."
        />
      </form>
      <div className="activities">
        <p className="activity">
          Activités organisées par USERNAME
          {/* <span className="activity__organized"> {selectedData?.username}</span> */}
          2
        </p>
        <p className="activity">
          Activités participées par
          <span className="activity__participated">
            USERNAME
            {/* {selectedData?.username} */}
          </span>
          4
        </p>
      </div>

      <ul className="historic">
        <li className="historic__card_organized">
          <h4>Football</h4>
          <h5>Foot en folie</h5>
          <span>
            Le 25/03/2024 <br /> à Paris
          </span>
        </li>
        <li className="historic__card_organized">
          <h4>Football</h4>
          <h5>Foot en folie</h5>
          <span>
            Le 25/03/2024 <br /> à Paris
          </span>
        </li>
        <li className="historic__card_participated">
          <h4>Football</h4>
          <h5>Foot en folie</h5>
          <span>
            Le 25/03/2024 <br /> à Paris
          </span>
        </li>
        <li className="historic__card_participated">
          <h4>Football</h4>
          <h5>Foot en folie</h5>
          <span>
            Le 25/03/2024 <br /> à Paris
          </span>
        </li>
        <li className="historic__card_participated">
          <h4>Football</h4>
          <h5>Foot en folie</h5>
          <span>
            Le 25/03/2024 <br /> à Paris
          </span>
        </li>
        <li className="historic__card_participated">
          <h4>Football</h4>
          <h5>Foot en folie</h5>
          <span>
            Le 25/03/2024 <br /> à Paris
          </span>
        </li>
      </ul>
    </section>
  );
}

export default ProfilPublic;
