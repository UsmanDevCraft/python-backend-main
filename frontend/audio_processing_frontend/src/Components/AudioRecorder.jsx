import React, { useRef, useState } from 'react';
// import recorded from './recorded.wav'
import DualAudioPlayer from './DualAudioPlayer';
import { MdKeyboardVoice } from "react-icons/md";
// import ReactAudioPlayer from 'react-audio-player';
// import { FaMicrophone } from "react-icons/fa";
import '../App.css'



// eslint-disable-next-line
const AudioRecorder = ({ recordDuration = 5000 }) => {
  // eslint-disable-next-line
  const [recording, setRecording] = useState(false);
  // eslint-disable-next-line
  const [audioURL, setAudioURL] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [path1, setPath1] = useState('');
  const [path2, setPath2] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  const [recName, setRecName] = useState('Start Recording');
  // eslint-disable-next-line
  const [gif, setGif] = useState(<div className='container d-flex justify-content-center align-items-center'>
  <MdKeyboardVoice className='fs-3 me-2' />
</div>);

  const [audioData, setAudioData] = useState(""); // State to store the base64 audio data

  const startRecording = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/modeltest/', {
        method: 'POST',
      });
      console.log(response)
      let result = await response.json();
      setAudioData(result.output_file)
      console.log(result.output_file)
      setShowDownloadButton(true)
      setRecName('Audio Recorded');
      setGif(<div className='container d-flex justify-content-center'>
      <MdKeyboardVoice className='fs-3 me-2' />
    </div>);
    }catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  const recNameChange = ()=>{
    // eslint-disable-next-line
    setGif(<div className='mixBlendMode container d-flex justify-content-center'>
      <img src='/audio_fyp_gif.gif' className='mixBlendMode' />
    </div>);
    setRecName('Recording...');
  };

  const togglePlayPause = () => {
    // Toggle the play/pause state
    setIsPlaying(!isPlaying);

    // Play or pause the audio accordingly
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };
  

  const separateAudio = async () => {
    const formData = new FormData();
      formData.append('audiofile', audioData);
      try {
        const response = await fetch('http://localhost:8000/api/live-process-audio/', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setPath1(data.file1)
        setPath2(data.file2)
        setIsComponentVisible(true)
      }catch (error) {
        console.error('Error processing audio:', error);
      }
  };

  return (
    <>
  <div className="container d-flex justify-content-center mt-4">
    <h1>Record Your Audio Here</h1>
  </div>


    <div>
        {/* <MdKeyboardVoice className='fs-1 mt-3' /> */}
        <br />
        {/* <MdKeyboardVoice className='fs-2 me-2' /> */}
        {gif}
        <button color={'black'} className='btn btn-success fs-5 my-3' onClick={()=>{startRecording(); recNameChange()}} disabled={recording}>
          {/* {recording ? 'Recording...' : 'Start Recording'} */}
          {recName}
        </button>

      {audioData && (
        <div>
          <audio ref={audioRef} controls>
          <source src={`data:audio/wav;base64,${audioData}`} type="audio/wav" />
          Your browser does not support the audio element.
          </audio>
          
          {showDownloadButton && (
            <div>
              <div className='my-2 container-sm'>
                <button style={{marginRight:"10vw", borderRadius:'1.5rem', padding:'0.2rem 1.5rem', border:'solid 2px #2B6CB0', background:'transparent'}} onClick={togglePlayPause}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button style={{borderRadius:'1.5rem', border:'solid 2px #2B6CB0', padding:'0.2rem 1rem', background:'transparent'}} onClick={separateAudio} id='sep'>
                  Separate
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        {isComponentVisible &&<DualAudioPlayer audioPath1= {path1}  audioPath2 = {path2} />}
        </div>
    </div>
    </>
  );
};

export default AudioRecorder;