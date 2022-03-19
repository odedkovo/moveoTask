import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioCmp from '../cmps/AudioCmp.jsx';
import { togglePlay, toggleLoop, togglePause } from '../store/audio.action.js';

export function HomePage() {
  const dispatch = useDispatch();

  const { audios } = useSelector((state) => ({
    audios: state.audioModule.audios,
  }));

  const { play } = useSelector((state) => ({
    play: state.audioModule.play,
  }));

  const { loop } = useSelector((state) => ({
    loop: state.audioModule.loop,
  }));

  const [time, setTime] = useState(0);
  const [time1, setTime1] = useState(0);

  const changeTime = (val) => {
    // console.log('inchange');
    setTime(val);
  };
  const onTogglePlay = (boolean) => {
    dispatch(togglePlay(boolean));
    dispatch(togglePause(false));
  };

  const onToggleLoop = () => {
    console.log('toggle');
    dispatch(toggleLoop());
  };

  const onPause = () => {
    dispatch(togglePlay(false));
    dispatch(togglePause(true));
  };

  const moveTime = (ev) => {
    console.log('hi');
    setTime1(ev.target.value);
  };

  return (
    <section className='home-page'>
      <section className='audios slide-in-br'>
        <div className='controle-panel'>
          <span>Control here:</span>
          <input
            className='top-range'
            min='0'
            max='17000'
            type='range'
            value={time}
            onChange={moveTime}
          />
        </div>

        {audios.map((audio) => {
          return (
            <AudioCmp
              key={audio._id}
              changeTime={changeTime}
              time={time}
              time1={time1}
              audio={audio}
            />
          );
        })}
      </section>

      <section className='controle-btns'>
        <button className='controle-btn' onClick={() => onTogglePlay(true)}>
          <span className='text'>play</span>
        </button>
        <button className='controle-btn' onClick={() => onTogglePlay(false)}>
          <span className='text'>stop</span>
        </button>
        <button className='controle-btn' onClick={onToggleLoop}>
          <span className='text'>loop/{loop ? 'on' : 'off'}</span>
        </button>
        <button className='controle-btn' onClick={onPause}>
          <span className='text'>pause</span>
        </button>
      </section>
    </section>
  );
}
