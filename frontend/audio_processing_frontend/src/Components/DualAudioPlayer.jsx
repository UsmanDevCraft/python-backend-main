import React, { useState, useRef } from "react";

const DualAudioPlayer = (props) => {
  const { audioPath1, audioPath2 } = props;
  console.log(audioPath1, audioPath2);
  const [isPlaying, setIsPlaying] = useState([false, false]);
  const audioRefs = [useRef(), useRef()];

  const togglePlayPause = (index) => {
    // Toggle the play/pause state for the specified index
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = [...prevIsPlaying];
      newIsPlaying[index] = !newIsPlaying[index];
      return newIsPlaying;
    });

    // Play or pause the audio accordingly for the specified index
    if (audioRefs[index].current) {
      if (isPlaying[index]) {
        audioRefs[index].current.pause();
      } else {
        audioRefs[index].current.play();
      }
    }
  };

  return (
    <div className="container">
      {[audioPath1, audioPath2].map((path, index) => (
        <div key={index}>
          <audio controls>
            <source
              src={`data:audio/wav;base64,${path}`}
              type="audio/wav"
            />
            Your browser does not support the audio element.
          </audio>

          <div className="my-2 container-sm">
            <button
              style={{
                marginRight: "10vw",
                borderRadius: "1.5rem",
                padding: "0.2rem 1.5rem",
                border: "solid 2px #2B6CB0",
                background: "transparent",
              }}
              onClick={() => togglePlayPause(index)}
            >
              {isPlaying[index] ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DualAudioPlayer;
