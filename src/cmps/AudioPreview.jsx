import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateAudio, togglePlay } from '../store/audio.action';

import muteSvg from '../assets/imgs/svg/mute.svg';
import soundSvg from '../assets/imgs/svg/sound.svg';

const AudioPreview = ({ timeToChange, changeTime, audio }) => {
  const dispatch = useDispatch();

  const { play } = useSelector((state) => state.audioModule);
  const { pause } = useSelector((state) => state.audioModule);
  const { isLoop } = useSelector((state) => state.audioModule);

  const [recording, setRecording] = useState(new Audio());
  const intervalId = useRef();
  const reset = () => {
    if (recording.currentTime > 17.37) {
      recording.currentTime = 0;
      recording.play();
    }
  };
  const toggleMute = () => {
    const newAudio = { ...audio, isMute: !audio.isMute };
    dispatch(updateAudio(newAudio));
  };

  useEffect(() => {
    recording.src = require(`../assets/audios/${audio.name}.mp3`);
    return () => {
      recording.pause();
      changeTime(0);
      recording.currentTime = 0;
      dispatch(togglePlay(false));
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    recording.ontimeupdate = () => {
      changeTime((recording.currentTime / 17) * 17000);
    };

    if (play) {
      recording.play();
      if (isLoop && !pause) {
        intervalId.current = setInterval(reset, 1);
      } else if (!isLoop) {
        clearInterval(intervalId.current);
      }
      recording.loop = false;
    } else if (!play && pause) {
      recording.pause();
      clearInterval(intervalId.current);
    } else {
      recording.pause();
      changeTime(0);
      recording.currentTime = 0;
      clearInterval(intervalId.current);
    }

    recording.onended = () => {
      recording.currentTime = 0;
      dispatch(togglePlay(false));
    };
  }, [isLoop, play, pause]);

  useEffect(() => {
    if (audio.isMute) recording.volume = 0;
    else recording.volume = 1;
  }, [audio.isMute]);

  useEffect(() => {
    recording.currentTime = (timeToChange * 17) / 17000;
  }, [timeToChange]);

  return (
    <div style={{ backgroundColor: audio.color }} className='audio'>
      <span className='audio-name'>{audio.name}</span>
      {audio.isMute && (
        <img className='mute-btn' onClick={toggleMute} src={muteSvg} alt='' />
      )}
      {!audio.isMute && (
        <img className='mute-btn' onClick={toggleMute} src={soundSvg} alt='' />
      )}
    </div>
  );
};

export default AudioPreview;
