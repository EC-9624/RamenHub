import React, { useRef } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./app.css";
import data from "./data";

const TOKEN =
  "pk.eyJ1IjoiY2hhbm9rbmFuIiwiYSI6ImNsN3F4YTZ0MzA5cGQzb284ajhyZHZjZGMifQ.2E3RZrYHguYzsdywqupIrA";

function App() {
  const [viewState, setViewState] = React.useState({
    latitude: 34.701505710769574,
    longitude: 135.50419927296977,
    transitionDuration: 500,
    zoom: 13,
  });

  const [showPopup, setShowPopup] = React.useState(true);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const pinElement = data.map((data) => {
    return (
      <>
        <Marker
          longitude={data.long}
          latitude={data.lat}
          offsetLeft={-3.5 * viewState.zoom}
          offsetTop={-7 * viewState.zoom}
        >
          <RamenDiningIcon
            style={{ fontSize: 2.5 * viewState.zoom, color: "tomato" }}
            onClick={() => handleMarkerClick(data.id, data.lat, data.long)}
            cursor="pointer"
          />
        </Marker>
        {data.id === currentPlaceId && (
          <Popup
            longitude={data.long}
            latitude={data.lat}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setCurrentPlaceId(null)}
          >
            <div className="Card">
              <label>picture</label>
              <img src="" alt="" />
              <label>Name</label>
              <h4 className="place">{data.title}</h4>
              <label>Review</label>
              <p className="desc">{data.desc}</p>
              <label>Rating</label>
              <div className="stars">
                <StarRateIcon className="star" />
                <StarRateIcon className="star" />
                <StarRateIcon className="star" />
                <StarRateIcon className="star" />
                <StarRateIcon className="star" />
              </div>
              <label>Information</label>

              <span className="username">
                Created by <b>{data.username}</b>
              </span>
            </div>
          </Popup>
        )}
      </>
    );
  });

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={TOKEN}
    >
      <GeolocateControl position="top-left" />
      <NavigationControl position="top-left" />

      {pinElement}
    </Map>
  );
}

export default App;
