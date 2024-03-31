import React from 'react'
import Home from './Components/Home';
import UploadAudio from './Components/UploadAudio';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AudioRecorder from './Components/AudioRecorder';


function App() {
  return (
    <>
      <Router>
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
            </Switch>
          </div>
      </Router>
    </>
  )
}

export default App