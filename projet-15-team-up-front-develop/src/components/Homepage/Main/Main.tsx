import './Main.scss';
import {
  CardMeta,
  CardHeader,
  CardGroup,
  Card,
  CardContent,
  Icon,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export type Event = {
  id: number;
  title: string;
  date: number;
  organizer: number;
  description: string;
  number_of_participants: number;
  address: string;
  start_time: string;
  end_time: string;
  level_id: number;
  level_name: string;
  sport_id: number;
  sport_image: string;
};

type Level = {
  id: number;
  name: string;
};

type EventsProps = {
  events: Event[];
  levels: Level[];
};

function Main({ events, levels }: EventsProps) {
  return (
    <section className="main">
      <div className="main__card">
        <CardGroup>
          <ul>
            {events?.map((event) => (
              <li key={event.id}>
                <Link to={`/event/${event.id}`}>
                  <Card className="card">
                    {/* TO DO : Route vers l'image à rendre dynamique ==> http://localhost:3000/ */}
                    <Image
                      src={`http://localhost:3000/${event.sport_image}`}
                      wrapped
                      ui={false}
                    />
                    <CardContent>
                      <CardHeader>{event.title}</CardHeader>
                      <CardMeta>
                        <span className="date">{event.date}</span>
                        <br />
                        <span className="date">{event.address}</span>
                      </CardMeta>
                      {levels &&
                        levels
                          .filter((level) => level.id === event.level_id)
                          .map((filteredLevel) => (
                            <span key={filteredLevel.id}>
                              <p className="level">
                                Niveau : {filteredLevel.name}
                              </p>
                            </span>
                          ))}
                    </CardContent>
                    <CardContent extra>
                      <Icon name="user" /> Participants maximum :
                      {event.number_of_participants}
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </CardGroup>
      </div>
    </section>
  );
}

export default Main;
