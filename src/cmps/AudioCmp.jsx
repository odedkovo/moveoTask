import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateAudio, togglePlay } from '../store/audio.action';

import muteSvg from '../assets/imgs/svg/mute.svg';
import soundSvg from '../assets/imgs/svg/sound.svg';

const AudioCmp = ({ time, time1, changeTime, audio }) => {
  const dispatch = useDispatch();

  const { play } = useSelector((state) => ({
    play: state.audioModule.play,
  }));
  const { pause } = useSelector((state) => ({
    pause: state.audioModule.pause,
  }));

  const { loop } = useSelector((state) => ({
    loop: state.audioModule.loop,
  }));

  const [recording, setRecording] = useState(new Audio());
  const intervalId = useRef();

  useEffect(() => {
    recording.src = require(`../assets/audios/${audio.name}.mp3`);
    return () => {
      console.log('unmounting');
      recording.pause();
      changeTime(0);
      recording.currentTime = 0;
      dispatch(togglePlay(false));
    };
  }, []);

  useEffect(() => {
    recording.ontimeupdate = () => {
      changeTime((recording.currentTime / 17) * 17000);
    };

    if (play) {
      recording.play();
      if (loop) recording.loop = true;
      else if (!loop) recording.loop = false;
    } else if (!play && pause) {
      recording.pause();
    } else {
      recording.pause();
      changeTime(0);
      recording.currentTime = 0;
    }

    recording.onended = () => {
      recording.currentTime = 0;
      dispatch(togglePlay(false));
    };
  }, [loop, play]);

  useEffect(() => {
    if (audio.isMute) recording.volume = 0;
    else recording.volume = 1;
  }, [audio.isMute]);

  useEffect(() => {
    recording.currentTime = (time1 * 17) / 17000;
  }, [time1]);

  const toggleMute = () => {
    const newAudio = { ...audio, isMute: !audio.isMute };
    dispatch(updateAudio(newAudio));
  };

  return (
    <div style={{ backgroundColor: audio.color }} className='audio'>
      <span className='audio-name'>{audio.name}</span>
      <input
        className='audio-range'
        min={0}
        max={17000}
        onChange={() => {}}
        type='range'
        value={time}
      />
      {audio.isMute && (
        <img className='mute-btn' onClick={toggleMute} src={muteSvg} alt='' />
      )}
      {!audio.isMute && (
        <img className='mute-btn' onClick={toggleMute} src={soundSvg} alt='' />
      )}
    </div>
  );
};

export default AudioCmp;
