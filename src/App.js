import React from 'react';
import './App.css';
import Login from './components/Login.js';
import Home from './components/Home.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
     <div>
<h2> Navigation</h2>
       <ul>
         <li>
           <Link to ="/home">Home</Link>
          
         </li>
         <li>
         <Link to ="/video/room/someRoom/participant/someParticipant">Join a test room</Link>
         </li>
       </ul>
     <Switch>
        <Route path="/video/room/:room/participant/:participant" children={<Login />}/>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="">
          <Home />
        </Route>
      </Switch>
     </div>
    </Router>
  );
}

export default App;
