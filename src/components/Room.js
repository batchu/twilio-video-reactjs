import React from "react";
import "./Room.css";

function Room(props) {
  const participants = [];
  
  const { connect } = require('twilio-video');

connect('$TOKEN', { name:'my-new-room' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});
  
  participants.push(props.name);
  const participantsItems = participants.map((name) => 
    <li>{name}</li>
  )
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
