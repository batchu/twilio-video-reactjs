import React from 'react'
import {Link} from 'react-router-dom'
function Home(){

    return <div>
        
        <h2> Navigation</h2>
       <ul>
         <li>
           <Link to ="/home">Home</Link>
          
         </li>
         <li>
         <Link to ="/video/room/someRoom/participant/someParticipant">Join a test room</Link>
         </li>
       </ul>
       Nothing to see here. Go to /video/room/:room/participant/:participant instead. Make sure to pass in the roomId (Use any unique ID. We will create a room for you or use it if it's already been created) and participantId which could be your FirstnameLastName</div>
}

export default Home;