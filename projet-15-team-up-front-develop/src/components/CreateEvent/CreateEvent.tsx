import { DatePicker, Space } from 'antd';
import { ChangeEvent } from 'react';
import './CreateEvent.scss';

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

function CreateEvent({ sports, levels, onChange, onSubmit }: DetailsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <section className="CreateEvent">
      <div className="box">
        <h2 className="title"> Créer une activité</h2>
        <div className="containers">
          <div className="definition">
            <ul>
              <div className="divLi">
                <li>Titre</li>
              </div>

              <li>Sport</li>
              <li>Niveau</li>
              <li>Participants maximum</li>
              <li>Date</li>
              <li>Heure de début</li>
              <li>Heure de fin</li>
              <li>Adresse</li>
              <li>Description</li>
            </ul>
          </div>
          <div className="fields">
            <span className="fieldForResponsive">Titre</span>
            <input
              className="t1"
              type="text"
              required
              onChange={onChange}
              // Lorsque on tape un titre dans le champ de texte, cette fonction handleCreateEventChange est appelée avec l'événement onChange. Elle extrait le nom du champ (name) et la valeur saisie (value) à partir de l'événement, puis met à jour l'état eventData en utilisant setEventData en incluant le nouveau titre saisi. Cela permet de garder eventData synchronisé avec les valeurs saisies dans les champs de formulaire.
              name="title"
            />

            <span className="fieldForResponsive">Sport</span>
            <select
              className="selectSport"
              defaultValue="Sport"
              onChange={onChange}
              name="sport_id"
            >
              <option className="selectSport__option" value="sport_id">
                Choisissez un sport
              </option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
            <span className="fieldForResponsive">Niveau</span>
            <select
              className="selectLevel"
              defaultValue="Level"
              onChange={onChange}
              name="level_id"
            >
              <option value="level_id">Choisissez un niveau</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>

            <span className="fieldForResponsive">Participants max</span>
            <input
              className="partMax"
              type="number"
              min="0"
              required
              onChange={onChange}
              name="number_of_participants"
            />
            <span className="fieldForResponsive">Date</span>
            <Space.Compact block>
              <DatePicker
                placeholder="Date"
                style={{
                  borderTop: '1px rgb(197, 193, 193) solid',
                  borderBottom: '1px rgb(197, 193, 193) solid',
                  borderRadius: '5px',
                  width: '100%',
                  height: '2.5em',
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
            <span className="fieldForResponsive">Heure début</span>
            <input
              className="sameFields"
              type="text"
              placeholder="12h30"
              required
              onChange={onChange}
              name="start_time"
            />
            <span className="fieldForResponsive">Heure fin</span>
            <input
              className="sameFields"
              type="text"
              placeholder="13h30"
              required
              onChange={onChange}
              name="end_time"
            />
            <span className="fieldForResponsive">Adresse</span>
            <input
              className="address"
              type="text"
              placeholder="10 rue des amandiers 75000 Paris"
              required
              onChange={onChange}
              name="address"
            />
            <span className="fieldForResponsive">Description</span>
            <textarea
              className="description"
              placeholder="Description de l'activité, matériel nécessaire, autres informations..."
              name="description"
              onChange={onChange}
            />
          </div>
        </div>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Créer
        </button>
      </div>
    </section>
  );
}

export default CreateEvent;
