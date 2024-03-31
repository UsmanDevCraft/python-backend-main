import {React , useState , useRef} from 'react'
import DualAudioPlayer from './DualAudioPlayer';

const UploadAudio = () => {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const [path1, setPath1] = useState('');
    const [path2, setPath2] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        // Set the selected file
        setSelectedFile(file);
        
        // Pause the audio when a new file is selected
        setIsPlaying(false);
        // Reset the audio element to load the new file
        if (audioRef.current) {
          audioRef.current.load();
        }
      }
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
    console.log(selectedFile);
  
     const handleSeparateButtonClick = async () => {
      const formData = new FormData();
      formData.append('audiofile', selectedFile);
      try {
        const response = await fetch('http://localhost:8000/api/process-audio/', {
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
      <div className='container my-4'>
        <h1>Choose a file to Seperate</h1>
        <div>
          <input
            className='my-3'
            type="file"
            accept=".wav"
            onChange={handleFileChange}
            style={{
              border:'1px solid #2B6CB0',
              padding:'0.5rem'
            }}
          />

          {selectedFile && (
            <div>
              <audio ref={audioRef} controls>
                <source src={URL.createObjectURL(selectedFile)} type="audio/wav" />
                Your browser does not support the audio tag.
              </audio>

              <div className='my-2 container-sm'>
                <button style={{marginRight:"10vw", borderRadius:'1.5rem', padding:'0.2rem 1.5rem', border:'solid 2px #2B6CB0', background:'transparent'}} onClick={togglePlayPause}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button style={{borderRadius:'1.5rem', border:'solid 2px #2B6CB0', padding:'0.2rem 1rem', background:'transparent'}} onClick={handleSeparateButtonClick} id='sep'>
                  Separate
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
        {isComponentVisible &&<DualAudioPlayer audioPath1= {path1}  audioPath2 = {path2} />}
        </div>
      </div>
    </>
  )
}

export default UploadAudio