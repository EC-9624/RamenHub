import { useRef, useState } from "react";
import "./register.css";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <RamenDiningIcon />
        Ramen Hub
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={usernameRef} />
        <input type="text" placeholder="email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button>Register</button>
        {success && (
          <span className="success">Succesful. you can login now!</span>
        )}
        {error && <span className="failure">Something went wrong.</span>}
      </form>
      <CancelIcon className="cancel" onClick={() => setShowRegister(false)} />
    </div>
  );
}
