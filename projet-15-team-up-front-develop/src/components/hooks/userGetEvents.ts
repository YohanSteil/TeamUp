import { useEffect, useState } from 'react';
import axios from 'axios';
// Add the missing import statement for the EventDetail type
import { EventDetail } from '../Event/Event';
const fetchAddressesLatLng = async (addresses: string[]) => {
  const encodedAddresses = addresses
    .map((address) => encodeURIComponent(address))
    .join(';');
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddresses}&format=json`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }

  return [];
};

export interface EventWithCoordinates extends EventDetail {
  coordinates?: {
    lat: string;
    lng: string;
  };
}

export const useGetEvents = () => {
  const [events, setEvents] = useState<EventWithCoordinates[]>([]);
  const [error, setError] = useState();

  const getEvents = async () => {
    try {
      const response = await axios.get('/events');
      setEvents(response.data.data);
    } catch (err) {
      //@ts-ignore
      setError(err);
    }
  };

  const getEventLocations = async () => {
    if (!events.length) return;

    try {
      const addresses = events.map((event) => event.address);
      const result = await fetchAddressesLatLng(addresses);
      console.log(result);
      return result;
    } catch (error) {
      console.log('could not fetch coordinates');
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getEventLocations();
  }, [events]);
  return { events, error };
};