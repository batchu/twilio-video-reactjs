import React from "react";
import "./Room.css";
const { connect } = require('twilio-video');


function Room(props) {
  const {room, participant, token} = props
  const participants = [];
  participants.push(props.roomName);
  const participantsItems = participants.map((roomName) => 
    <li>{roomName}</li>
  )

  connect(token, { roomName:room }).then(room => {
    console.log(`Successfully joined a Room: ${room}`);
    room.on('participantConnected', participant => {
      console.log(`A remote Participant connected: ${participant}`);
    });
  }, error => {
    console.error(`Unable to connect to Room: ${error.message}`);
  });


  return (
    <div>
      <div>
        <div>Welcome to {participants[0]}'s room</div>
      <div className="wrapper">
        <div className="video">
          <p>Video</p>
        </div>
        <div className="attendees">
          <p>Attendees</p>
          <ul>{participantsItems}</ul>
        </div>
      </div>
        
      </div>
    </div>
  );
}


export default Room;
