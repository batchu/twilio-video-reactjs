import React from "react";
import "./Room.css";
const { connect } = require('twilio-video');

connect(getToken(), { name:'VideoReactApp' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});

function Room(props) {
  const participants = [];
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

function getToken(){

  return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQ5YTk4YjQzNGRjNmZmMTk3YjAwYTZjODU4MDIxODk2LTE1OTI4NzA2MDUiLCJpc3MiOiJTSzQ5YTk4YjQzNGRjNmZmMTk3YjAwYTZjODU4MDIxODk2Iiwic3ViIjoiQUM4MGUwOTI2MTIwNTNmYTU1OWQ0MjZiNDMwZTdkNmU3ZSIsImV4cCI6MTU5Mjg3NDIwNSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiVmlkZW9SZWFjdEFwcCIsInZpZGVvIjp7InJvb20iOiJWaWRlb1JlYWN0QXBwIn19fQ.63yQOuT20EUAa2hcpZ6MD03ysbN8KRG1rYQp7o7lQXI"
}

export default Room;
