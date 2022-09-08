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

const TOKEN =
  "pk.eyJ1IjoiY2hhbm9rbmFuIiwiYSI6ImNsN3F4YTZ0MzA5cGQzb284ajhyZHZjZGMifQ.2E3RZrYHguYzsdywqupIrA";

function App() {
  const [viewState, setViewState] = React.useState({
    latitude: 34.672314,
    longitude: 135.484802,
    zoom: 13,
  });

  const [showPopup, setShowPopup] = React.useState(true);

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

      <Marker
        longitude={135.50767022111842}
        latitude={34.71047003382566}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <RamenDiningIcon
          style={{ fontSize: visualViewport.zoom * 7, color: "tomato" }}
        />
      </Marker>

      {showPopup && (
        <Popup
          longitude={135.50767022111842}
          latitude={34.710470033825}
          anchor="left"
          onClose={() => setShowPopup(false)}
        >
          <div className="Card">
            <label>Name</label>
            <h4 className="place">ラーメン屋01</h4>
            <label>Review</label>
            <p className="desc">a good ramen place</p>
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
              Created by <b>Bob</b>
            </span>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
