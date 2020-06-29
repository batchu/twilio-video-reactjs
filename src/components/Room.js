import React  from "react";
import "./Room.css";

const { connect } = require("twilio-video");

function Room(props) {
  console.log(
    `In the Room component. Connecting to Room ${props.room} for participant ${props.participant}`
  );
// const [localParticipant, setLocalParticipant] = useState("")
  const { room, token } = props;

  connect(token, { roomName: room }).then(
    room => {
      console.log(`Successfully joined a Room: ${room}`);
      console.log(`local participant: ${JSON.stringify(room.localParticipant)}`)
      console.log(`remote participant size: ${JSON.parse(room.participants.size)}`)
  
      document.getElementById("localVideo").appendChild(
        room.localParticipant.videoTracks
          .values()
          .next()
          .value.track.attach()
      );

      const div = document.createElement("div");
    div.id = room.localParticipant.sid
    div.innerText = room.localParticipant.identity;

      document.getElementById("localParticipant").appendChild(
        div
      );


      room.participants.forEach(p => {
        console.log(p.identity);
        participantConnected(p);
      });
    },
    error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    }
  );

  function participantConnected(participant) {
    console.log('Participant "%s" connected', participant.identity);

    const div = document.createElement("div");
    div.id = participant.sid;
    div.innerText = participant.identity;

    participant.on("trackSubscribed", track => trackSubscribed(div, track));
    participant.on("trackUnsubscribed", trackUnsubscribed);

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track);
      }
    });
    document.getElementById("remoteParticipants").appendChild(div);

    // participants.push(`<div id=${participant.identity}>${participant.identity}</div>`)
  }
  function trackUnsubscribed(track) {
    console.log(`subscribed: ${track}`)
    track.detach().forEach(element => element.remove());
  }
  function trackSubscribed(div, track) {
    console.log(`usubscribed: ${track}`)
    div.appendChild(track.attach());
  }

  return (
    <div>
      <div>
        <div>Welcome to {room}'s room</div>
        <div className="wrapper">
          <div className="video">
            <p>Video</p>
            <div id="localVideo"></div>
          </div>
          <div className="attendees">
            <div id = "localParticipant">
            <p> Local Participant</p>
            </div>
            
            <p>Remote Participants</p>
            <div id="remoteParticipants"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
