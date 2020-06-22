import React, { useState } from "react";
import Room from "./Room.js"
function Login() {

  const [login, setLogin] = useState({ login: false });
  const [name, setName] = useState({ name: "" });

  function handleSubmit(event) {
    setLogin(true)
    setName(event.target[0].value)
    event.preventDefault();
  }

  if (login === true) {
    return (<Room name={name} />)
  }

  else
    return (<div>
      <p>Please Login</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
        <input type="text" name="name" />
        </label>
        <input type="submit" value="Join my room" />
      </form>
    </div>
    )

}

export default Login;
