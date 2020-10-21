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
  //local participant video
      document.getElementById("localVideo").appendChild(
        room.localParticipant.videoTracks
          .values()
          .next()
          .value.track.attach()
      );

//remote participants
      room.participants.forEach(p => {
        console.log(p.identity);
        participantConnected(p);
      });
  //handle new participants

  room.on('participantConnected', (participant) => {
    console.log("Participant '" + participant.identity + "' joined the room")

    participantConnected(participant)
    
  })

  room.on('participantDisconnected', (participant) => {
    console.log("Participant '" + participant.identity + "' left the room")
    detachParticipantTracks(participant)
  })

     
    },
    error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    }
  );

  function detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values())
    detachTracks(tracks)
  }

  // Detach the Tracks from the DOM.
  function detachTracks(tracks) {
    tracks.forEach(function (track) {
      if (track.track) track = track.track
      if (!track.detach) return
      track.detach().forEach(function (detachedElement) {
        detachedElement.remove()
      })
    })
  }


  function participantConnected(participant) {
    console.log('Participant "%s" connected', participant.identity);

    const div = document.createElement("div");
    div.id = participant.sid;

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


        <div className="wrapper">
          <div className="video-grid">
            <div id="localVideo" className="video"></div>
            <div id="remoteParticipants" className="video"></div>
          </div>
 
        </div>


  );
}

export default Room;
