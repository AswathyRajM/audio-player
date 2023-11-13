import React, { useRef, useState, useEffect } from 'react';
import { formatTime } from '../util/formatTime';
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';

const AudioPlayerWithWaveform = () => {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      audioRef.current.src = objectURL;
      setAudioUrl(objectURL);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', () => {
      setTotalTime(audioRef.current.duration);
    });

    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const indicatorStyle = {
    width: '3px',
    height: '100%',
    background: 'rgb(15 23 42 / var(--tw-bg-opacity))',
    position: 'absolute',
    left: `${(currentTime / totalTime) * 100}%`,
    transition: 'left 0.1s',
  };

  return (
    <div>
      <h1 className='text-3xl font-extrabold mt-8'>Audio Player</h1>
      <div className='m-8'>
        <input type='file' accept='audio/*' onChange={handleFileChange} />
      </div>
      <audio ref={audioRef} controls={false} autoPlay />
      {audioUrl && (
        <div className='border-2 my-4 p-2'>
          <h3 className='animate-pulse m-4 text-lg font-medium'>
            {audioUrl ? 'Now Playing' : ''}
          </h3>
          <div>
            <button
              className='text-4xl rounded-full m-4 outline-1 p-2 border-slate-300 hover:text-white hover:bg-slate-800'
              onClick={togglePlayPause}
            >
              {isPlaying ? <BsPauseCircleFill /> : <BsFillPlayCircleFill />}
            </button>
          </div>
          <div className='flex items-center'>
            <p className='px-2'>{formatTime(currentTime)}</p>
            <div>
              <div className='max-w-[60vw] md:max-w-[80vw] h-fit w-[30rem] m-2 '>
                <div className='w-full h-2 bg-slate-300 relative'>
                  <div style={indicatorStyle} />
                </div>
              </div>
            </div>

            <p className='px-2'> {formatTime(totalTime)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayerWithWaveform;
