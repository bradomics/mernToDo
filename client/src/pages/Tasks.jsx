import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../App";
import NavBar from '../components/NavBar';


export default function Tasks() {
  const [credentails, setCredentials] = useContext(AuthContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
        <NavBar/>
      {credentails && <button onClick={logout}>Logout</button>}
      <h1>Welcome {credentails && credentails.email}</h1>
      {!credentails && <Link to="/register">Register</Link>}
      <br />
      {!credentails && <Link to="/login">Login</Link>}
    </div>
  );
}
