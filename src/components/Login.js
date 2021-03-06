import React, { useState } from "react"
import Room from "./Room.js"
import axios from 'axios'

function Login() {

  const [login, setLogin] = useState(false)
  const [room, setRoom] = useState("")
  const [token, setToken] = useState("")
  const [participant, setParticipant] = useState("")
  
  function handleCreateRoomEvt(event) {
    const room = event.target[0].value
    const participant = event.target[1].value
    setRoom(room)  
    console.log(`Creating a room - ${room} with participant ${participant}`)
    setParticipant(participant)
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
          console.log(`Successfully created a room`)

          requestAccessToken(room, participant)
        }
      })
      .catch(function (err) {
        alert(`Error ${err.response.data.code}: ${err.response.data.message}`)
        console.error(err)
      })

    
    
    event.preventDefault();
  }

  function requestAccessToken(room, participant){
      setRoom(room)  
    //Get an access token
   console.log(`Padding a random string to participant name for testing`)
  //  const newParticipantName = participant+Math.random().toString(36).substring(4);
    setParticipant(participant)
    const url = `https://ube-zebra-9736.twil.io/AccessTokens?room=${room}&participant=${participant}`
    console.log(`Requesting an Auth token for the participant ${participant}`)
    axios.get(url)
    .then(function (resp){
      console.log(resp.status)
      if (resp.status === 200){
        console.log(`Successfully retrieved the auth token for participant ${participant}. Token value is ${resp.data}`)
        console.log(`Setting login state attr to true. Loading the Room component`)
        const token = resp.data.token
        setToken(token)
        setLogin(true)
      }
  })
  }

  function handleJoinRoomEvt(event){

    const room = event.target[0].value
    const participant = event.target[1].value

    requestAccessToken(room, participant)
    event.preventDefault();
  }

  if (login === true) {
    return (<Room room={room} participant={participant} token={token}/>)
  }

  else
    return (
    <div>
      <p>Let's create a new meeting and join you in!</p>
      <form onSubmit={handleCreateRoomEvt}>
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
      <form onSubmit={handleJoinRoomEvt}>
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
