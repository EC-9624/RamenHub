import * as React from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./app.css";
import data from "./data";

const TOKEN =
  "pk.eyJ1IjoiY2hhbm9rbmFuIiwiYSI6ImNsN3F4YTZ0MzA5cGQzb284ajhyZHZjZGMifQ.2E3RZrYHguYzsdywqupIrA";

function App() {
  const [viewState, setViewState] = React.useState({
    latitude: 34.672314,
    longitude: 135.484802,
    zoom: 13,
  });

  const [showPopup, setShowPopup] = React.useState(true);

  const markerElement = data.map((marker) => {
    return (
      <Marker longitude={marker.long} latitude={marker.lat}>
        <RamenDiningIcon style={{ color: "tomato" }} />
      </Marker>
    );
  });

  const popupElement = data.map((data) => {
    return (
      showPopup && (
        <Popup
          longitude={data.long}
          latitude={data.lat}
          anchor="left"
          onClose={() => setShowPopup(false)}
        >
          <div className="Card">
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
      )
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

      {markerElement}
      {popupElement}
    </Map>
  );
}

export default App;
