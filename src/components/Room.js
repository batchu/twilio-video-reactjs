import React from "react";
import "./Room.css";


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

export default Room;
