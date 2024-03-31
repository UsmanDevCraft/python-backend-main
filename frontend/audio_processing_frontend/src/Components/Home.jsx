import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
function Home() {
  const style = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <>
    <div className='container my-5 d-flex justify-content-center'>
      <h1>Overlapped Speech Seperation</h1>
    </div>

    <div className='container my-5 d-flex justify-content-center'>
      <p>
      Building an innovative Overlapped Speech Separation System that leverages advanced signal processing techniques and machine learning algorithms to untangle multiple speech signals occurring simultaneously. Our project aims to enhance audio clarity and intelligibility, providing a robust solution for applications such as voice communication and audio transcription in challenging, noisy environments.
      </p>
    </div>

    <div className='container my-5 d-flex justify-content-center gap-5'>
      <Link style={style} to="/uploadaudio"><button type="button" className="btn btn-success">Upload File</button></Link>
      <Link style={style} to="/AudioRecorder"><button type="button" className="btn btn-success">Live Record</button></Link>
    </div>
    </>
  )
}

export default Home