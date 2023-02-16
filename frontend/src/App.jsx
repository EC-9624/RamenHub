import React, { useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";

import axios from "axios";
import { format } from "timeago.js";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import StarRateIcon from "@mui/icons-material/StarRate";
import ClickAwayListener from "react-click-away-listener";
import "./app.css";
import Register from "./components/register";
import Login from "./components/login";
import placeholder from "./images/strike.jpg";


function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = React.useState(null);
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [newPlace, setnewPlace] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [star, setStar] = React.useState(0);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const [viewState, setViewState] = React.useState({
    latitude: 34.70738613323661,
    longitude: 135.50433940447317,
    transitionDuration: 500,
    zoom: 15,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.lng,
    };
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setnewPlace(null);
    } catch (err) {
      console.log(err);
    }
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

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
        transitionDuration="200"
        onDblClick={currentUser && handleAddClick}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {pins.map((p) => (
          <>
            <Marker
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-2 * viewState.zoom}
              offsetTop={-2 * viewState.zoom}
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
                    {/* fetch img */}
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
                <form onSubmit={handleSubmit}>
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
        {currentUser ? (
          <button className="btn logout" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <div className="btns">
            <button className="btn login" onClick={() => setShowLogin(true)}>
              Log In
            </button>
            <button
              className="btn register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </>
  );
}

export default App;
