import client from "./pg.client.js";
import EventsDatamapper from "./events.datamapper.js";
import UserDatamapper from "./user.datamapper.js";
import SportDatamapper from "./sport.datamapper.js";
import LevelDatamapper from "./level.datamapper.js";

export const eventsDatamapper = new EventsDatamapper(client);
export const userDatamapper = new UserDatamapper(client);
export const sportDatamapper = new SportDatamapper(client);
export const levelDatamapper = new LevelDatamapper(client);
