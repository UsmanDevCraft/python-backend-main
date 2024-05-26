import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { TypeAnimation } from 'react-type-animation';
import '../App.css'


function Home() {


  const style = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <>
    {/* <div className='container my-5 d-flex justify-content-center'>
      <h1>Overlapped Speech Seperation</h1>
    </div> */}

    <TypeAnimation className='mt-4'
      sequence={[
        'Speech Segmentation System',
        3000,
        'Overlapping Voice Disentanglement Tool',
        3000,
        'Multi-Voice Separation System',
        3000,
        'Overlapping Sound Extraction Tool',
        3000,
        () => {
          // console.log('Sequence completed');
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '3em', display: 'inline-block' }}
    />


    <div className='container my-5 d-flex justify-content-center'>
      <p className='fs-4'>
      Building an innovative Overlapped Speech Separation System that leverages advanced signal processing techniques and machine learning algorithms to untangle multiple speech signals occurring simultaneously. Our project aims to enhance audio clarity and intelligibility, providing a robust solution for applications such as voice communication and audio transcription in challenging, noisy environments.
      </p>
    </div>
    

    <div className='container my-5 d-flex justify-content-center gap-5'>
      <Link style={style} to="/uploadaudio"><button type="button" className="btn btn-success fs-6">Upload File</button></Link>
      <Link style={style} to="/AudioRecorder"><button type="button" className="btn btn-success fs-6">Live Record</button></Link>
    </div>
    </>
  )
}

export default Home