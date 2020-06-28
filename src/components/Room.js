import React, { useState } from "react";
import "./Room.css";
import RoomHelper from "../helpers/RoomHelper"
const { connect } = require('twilio-video');


function Room(props) {
console.log(`In the Room component. Connecting to Room ${props.room} for participant ${props.participant}`)
const [participants, setParticipants] = useState([]);
const [localParticipant, setLocalParticipant] = useState({});
const [localTrack, setLocalTrack] = useState([<div></div>]);

  const {room, participant, token} = props

  connect(token, { roomName:room }).then(room => {
    console.log(`Successfully joined a Room: ${room}`);

  document.getElementById("localVideo").appendChild(room.localParticipant.videoTracks.values().next().value.track.attach())
    room.participants.forEach((p)=>{
      console.log(p.identity)
      participantConnected(p)
      })

  }, error => {
    console.error(`Unable to connect to Room: ${error.message}`);
  });

  function participantConnected(participant) {
    console.log('Participant "%s" connected', participant.identity);
   
    const div = document.createElement('div');
    div.id = participant.sid;
    div.innerText = participant.identity;
  
    participant.on('trackSubscribed', track => trackSubscribed(div, track));
    participant.on('trackUnsubscribed', trackUnsubscribed);
  
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track);
      }
    });
   document.getElementById("remoteParticipants").appendChild(div)
    
    // participants.push(`<div id=${participant.identity}>${participant.identity}</div>`)
  }
  function trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
  }
  function trackSubscribed(div, track) {
    div.appendChild(track.attach());
  }

  return (
    <div>
      <div>
        <div>Welcome to {participants[0]}'s room</div>
      <div className="wrapper">
        <div className="video">
          <p>Video</p>
  <div id ="localVideo">{localTrack}</div>
        </div>
        <div className="attendees">
          <p> Local Participant</p>
          <p>Remote Participants</p>
          <div id ="remoteParticipants"></div>
        </div>
      </div>
      </div>
    </div>
  )
}


export default Room;
