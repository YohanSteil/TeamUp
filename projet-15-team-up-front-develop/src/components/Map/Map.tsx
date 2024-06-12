import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './map.scss';

type MapProps = {
  lat: number;
  lng: number;
};

function Map({ lat = 45.764, lng = 4.8357 }: MapProps) {
  return (
    <div style={{ width: '95%', height: '400px', margin: '0 auto' }}>
      <MapContainer
        className="map-container"
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
         style={{
         height: '100%',
         width: '100%',
          margin: '20px',
           borderRadius: '2%',
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;