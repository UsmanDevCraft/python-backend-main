import React, { useState } from 'react';

const AudioRecorder = ({ sampleRate = 8000, recordDuration = 5000 }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const startRecording = () => {
    setRecording(true);
    setShowDownloadButton(false);
    navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: sampleRate,
        channelCount: 1,
      }
    })
    .then((stream) => {
      const options = { mimeType: 'audio/webm; codecs=opus' }; // MIME type for recording
      const mediaRecorder = new MediaRecorder(stream, options);
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' }); // Indicate desired output format
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioURL(url);
        setShowDownloadButton(true);
      };
      mediaRecorder.start();

      // Stop recording after a specified duration
      setTimeout(() => {
        mediaRecorder.stop();
        setRecording(false);
      }, recordDuration);
    })
    .catch((err) => {
      console.error('Error accessing microphone:', err);
    });
  };

  const handleDownloadClick = () => {
    const a = document.createElement('a');
    a.href = audioURL;
    a.download = 'recorded_audio.wav'; // Update the extension to .wav
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        {recording ? 'Recording...' : 'Start Recording'}
      </button>
      {audioBlob && (
        <div>
          <audio controls>
            <source src={audioURL} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          {showDownloadButton && (
            <button onClick={handleDownloadClick}>
              Download
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;