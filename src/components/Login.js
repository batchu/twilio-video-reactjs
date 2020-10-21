import React, { useState } from "react"
import Room from "./Room.js"
import axios from 'axios'
import {useParams} from 'react-router-dom'
import appConfig from '../Config.js'
function Login() {

  const {room, participant} = useParams()
  console.log(`The following info was pass through the URL - room: ${room} and participant: ${participant}`)
  const [login, setLogin] = useState(false)
  const [token, setToken] = useState("")


  function checkIfRoomExists(room, participant){

    axios.get(`https://video.twilio.com/v1/Rooms/${room}`,
    {
      auth: {
        username: appConfig.username,
        password: appConfig.password
      },
    })
    .then(function (resp){
      if(resp.status===200){
        console.log(`room ${room} exists!`)
       if(token==="")
        requestAccessToken(room, participant)
       else
        setLogin(true)
        
      }
      
    })
    .catch(function (resp){
      console.log(`room ${room} doesn't exist. Creating it...`)
      createRoom(room, participant)
    })
  }
  
  function createRoom(room, participant) {

    console.log(`Creating a room - ${room} with participant ${participant}`)

    axios.post("https://video.twilio.com/v1/Rooms",
      `UniqueName=${room}`,
      {
        auth: {
          username: appConfig.username,
          password: appConfig.password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (resp) {
        console.log(resp.status)
        if (resp.status === 201){
          console.log(`Successfully created the room ${room}`)
          requestAccessToken(room, participant)
        }
      })
      .catch(function (err) {
        alert(`Error ${err.response.data.code}: ${err.response.data.message}`)
        console.error(err)
      })
  }

  function requestAccessToken(room, participant){

    //Get an access token
   console.log(`Padding a random string to participant name for testing`)
  //  const newParticipantName = participant+Math.random().toString(36).substring(4);

    const url = `https://ube-zebra-9736.twil.io/AccessTokens?room=${room}&participant=${participant}`
    console.log(`Requesting an Auth token for the participant ${participant}`)
    axios.get(url)
    .then(function (resp){
      console.log(resp.status)
      if (resp.status === 200){
        console.log(`Successfully retrieved the auth token for participant ${participant}. Token value is ${resp.data}`)
        console.log(`Setting login state attr to true. Loading the Room component`)
         setToken(resp.data.token)
     
      }
  })
  }

  if (login === true) {
    return (<Room room={room} participant={participant} token={token}/>)
  }

  else
    return (
    <div>
      <p>Checking if the room {room} exists. Please wait...</p>
      {checkIfRoomExists(room, participant)}
    </div>
    )

}

export default Login;
