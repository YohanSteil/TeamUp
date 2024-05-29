import { DatePicker, Space } from 'antd';
import { ChangeEvent } from 'react';

interface SportDetail {
  id: number;
  name: string;
  image: string;
}

interface LevelDetail {
  id: number;
  name: string;
}

interface DetailsProps {
  sports: SportDetail[];
  levels: LevelDetail[];
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

function HeaderSearchBar({ sports, levels, onChange, onSubmit }: DetailsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <div className="header__search">
      <h3>Recherche une activité</h3>
      <div className="header__searchbar">
        <div className="header__searchbar__city">
          <input
            type="text"
            required
            onChange={onChange}
            name="address"
            placeholder="Ville"
          />
        </div>
        <div className="header__searchbar__sport">
          <select defaultValue="Sport" onChange={onChange} name="sport">
            <option>Sport</option>
            <option aria-label="option" value="sport_id" />
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>
        <div className="header__searchbar__level">
          <select defaultValue="Level" onChange={onChange} name="level">
            <option value="level_id">Niveau</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div className="header__searchbar__date">
          <Space.Compact block>
            <DatePicker
              className="date"
              placeholder="Date"
              style={{
                boxShadow: '10px 8px 20px 0px rgba(0, 0, 0, 0.3)',
                borderTop: '1px rgb(197, 193, 193) solid',
                borderBottom: '1px rgb(197, 193, 193) solid',
                borderRadius: '0',
              }}
              onChange={(date, dateString) => {
                if (typeof dateString === 'string') {
                  const syntheticEvent = {
                    target: {
                      name: 'date',
                      value: dateString,
                    },
                  };
                  onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
                }
              }}
            />
          </Space.Compact>
        </div>
        <div className="header__searchbar__button">
          <button
            type="submit"
            className="btn"
            aria-label="button"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderSearchBar;
