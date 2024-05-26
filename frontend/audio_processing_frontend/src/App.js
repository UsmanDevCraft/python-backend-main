import React from 'react'
import Home from './Components/Home';
import UploadAudio from './Components/UploadAudio';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AudioRecorder from './Components/AudioRecorder';
import Navbar from './Components/Navbar';
import About from "./Components/About"


function App() {
  return (
    <>
      <Router>
          <Navbar />
          <div className='container'>
            <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route exact path="/uploadaudio">
                  <UploadAudio/>
                </Route>
                <Route exact path="/AudioRecorder">
                  <AudioRecorder/>
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
            </Switch>
          </div>
      </Router>
    </>
  )
}

export default App