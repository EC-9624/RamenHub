import React, { useEffect, useRef } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import axios from "axios";
import { format } from "timeago.js";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import StarRateIcon from "@mui/icons-material/StarRate";
import ClickAwayListener from "react-click-away-listener";
import "./app.css";

import placeholder from "./images/strike.jpg";

const TOKEN =
  "pk.eyJ1IjoiY2hhbm9rbmFuIiwiYSI6ImNsN3F4YTZ0MzA5cGQzb284ajhyZHZjZGMifQ.2E3RZrYHguYzsdywqupIrA";

function App() {
  const currentUser = "bob";
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [newPlace, setnewPlace] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [star, setStar] = React.useState(0);
  const [viewState, setViewState] = React.useState({
    latitude: 34.701505710769574,
    longitude: 135.50419927296977,
    transitionDuration: 500,
    zoom: 13,
  });

  const handleAddClick = (e) => {
    const { lat: lat, lng: lng } = e.lngLat;
    console.log(lat, lng);
    setnewPlace({
      lat: lat,
      lng: lng,
    });
  };
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const closePopup = () => {
    console.log("close Popup");
    setCurrentPlaceId(null);
    setnewPlace(null);
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
        transitionDuration="200"
        onDblClick={handleAddClick}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}
            >
              <RamenDiningIcon
                style={{
                  fontSize: 2 * viewState.zoom,
                  color: currentUser === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <ClickAwayListener onClickAway={closePopup}>
                  <div className="Card">
                    <img width="100%" src={placeholder} alt="placeHolder" />
                    <label>Name</label>
                    <br />
                    {p.title} <br />
                    <label>Description</label>
                    <br />
                    {p.desc} <br />
                    <label>review</label>
                    <div className="stars">
                      {Array(p.rating).fill(<StarRateIcon className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      <br />
                      Created by <b>{p.username}</b>
                    </span>
                    <br />
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </ClickAwayListener>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.lng}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setnewPlace(null)}
            anchor="left"
          >
            <ClickAwayListener onClickAway={closePopup}>
              <div>
                <form onSubmit>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </ClickAwayListener>
          </Popup>
        )}
      </Map>
    </>
  );
}

export default App;
