import React from "react";
import "./App.css";
import Login from "./components/Login.js";

function Room(props) {
  const participants = []; //String array
  participants.push(props.name);
  const participantsItems = participants.map((name) => {
    <li>{name}</li>
  });
  return (
    <div className="App">
      <p>Welcome to the room</p>
      <div>
        <div>//Video area</div>
        <div>
          //Participant List
          <ol>{participantsItems}</ol>
        </div>
      </div>
    </div>
  );
}

export default Room;
