import React, { useState } from "react";
import Room from "./Room.js"
import axios from 'axios';

function Login() {

  const [login, setLogin] = useState({ login: false });
  const [room, setName] = useState({ room: "" });
  const [token, setToken] = useState({ token: "" });
  
  function handleSubmit(event) {
    setName(event.target[0].value)
    axios.post("https://video.twilio.com/v1/Rooms",
      `UniqueName=${room}`,
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
        if (resp.status === 201){

          //Get an access token
          axios.get("https://ube-zebra-9736.twil.io/AccessTokens")
          .then(function (resp){
            console.log(resp.status)
            if (resp.status === 200){
              const token = resp.data
              setToken(token)
              setLogin(true)
            }
        })
        }
      })
      .catch(function (err) {
        console.error(err)
      })

    
    
    event.preventDefault();
  }

  if (login === true) {
    return (<Room room={room} participant={participant} token={token}/>)
  }

  else
    return (
    <div>
      <p>Let's create a new meeting and join you in!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Room Name:
        <input type="text" name="room" />
        </label>
        <label>
          Your Name:
        <input type="text" name="participant" />
        </label>
        <input type="submit" value="Create a room" />
      </form>
    <div>
      <p>Already created a meeting? Join Now</p>
      <form onSubmit={handleSubmit}>
        <label>
          Room Name:
        <input type="text" name="room" />
        </label>
        <label>
          Your Name:
        <input type="text" name="participant" />
        </label>
        <input type="submit" value="Join my room" />
      </form>
    </div>
    </div>
    )

}

export default Login;
