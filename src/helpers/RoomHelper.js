import axios from 'axios';

class RoomHelper{

     getParticipants(room){
    
       return axios.post(
            `'https://video.twilio.com/v1/Rooms/${room}/Participants/`,
            {
                auth: {
                  username: window.Config.apiKeySID,
                  password: window.Config.apiKeySecret
                }
              }
            )
      
    }
}

export default RoomHelper