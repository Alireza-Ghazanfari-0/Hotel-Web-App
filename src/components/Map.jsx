import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import useGeoLocation from "../hooks/useGeoLocation";
import useUrlLocation from "../hooks/useUrlLocation";
import { useNavigate } from "react-router-dom";

function Map({ hotelsOrBookmarksData }) {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const {
    position: myPosition,
    getLocation: getMyLocation,
    isLoading: isLoadingMyLocation,
  } = useGeoLocation();
  const [lat, lng] = useUrlLocation();
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (myPosition?.latitude && myPosition?.longitude) {
      setMapCenter([myPosition.latitude, myPosition.longitude]);
    }
  }, [myPosition?.latitude, myPosition?.longitude]);
  return (
    <div className="childd ">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <button className="get-location-button" onClick={getMyLocation}>
          {isLoadingMyLocation ? "is Loading ..." : "use My Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotelsOrBookmarksData.map((item) => (
          <Marker position={[item.latitude, item.longitude]} key={item.id}>
            <Popup>{item.smart_location}</Popup>
          </Marker>
        ))}
        <DetectClick />
        {/* <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return (
    <Marker position={position}>
      <Popup>{position}</Popup>
    </Marker>
  );
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(
        `/bookmarks/addBookmark?lat=${e.latlng.lat}&lng=${e.latlng.lng}`
      ),
  });
  return null;
}
