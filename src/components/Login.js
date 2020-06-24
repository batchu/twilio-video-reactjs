import React, { useState } from "react";
import Room from "./Room.js"
import axios from 'axios';

function Login() {

  const [login, setLogin] = useState({ login: false });
  const [name, setName] = useState({ name: "" });

  function handleSubmit(event) {
    setName(event.target[0].value)
    axios.post("https://video.twilio.com/v1/Rooms",
      `UniqueName=${name}`,
      {
        auth: {
          username: window.Config.username,
          password: window.Config.password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (resp) {
        console.log(resp.status)
        if (resp.status === 201)
          setLogin(true)
      })
      .catch(function (err) {
        console.error(err)
      })
    
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
