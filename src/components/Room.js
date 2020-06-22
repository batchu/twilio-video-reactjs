import React from "react";
import "../App.css";


function Room(props) {
  const participants = []; 
  participants.push(props.name);
  const participantsItems = participants.map((name) => 
    <li>{name}</li>
  )
  return (
    <div className="App">
      <p>Welcome to the room</p>
      <div>
        <div>Video area</div>
        <div>
          <ol>{participantsItems}</ol>
        </div>
      </div>
    </div>
  );
}

export default Room;
