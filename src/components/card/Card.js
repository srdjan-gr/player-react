import React from 'react'
import { useState, useEffect } from 'react'
import { FaForward, FaBackward, FaPlay, FaVolumeUp, FaVolumeMute, FaPause } from 'react-icons/fa';

import album from '../../img/bob.jpg';
import song from '../../data/Billy Idol - Speed.mp3';

const Card = () => {

    const [playing, setPlaying] = useState(false);
    const [mute, setMute] = useState(false);



    return (
        <section className='container'>
            <article className='card'>
                <img src={album} alt="autor" />


                <div className="content">
                    <div className='content-info'>
                        <h1>Bob Marley</h1>
                        <h2>Song</h2>
                    </div>

                    <div className='content-duration'>

                        <audio controls src={song} type="audio/mpeg" id='song' ></audio>

                        <div className='content-duration-time'>
                            <h3>0:46</h3>
                            <h3>3:52</h3>
                        </div>

                        {/*<input type="range" value={20} min='0' max='100' className='progres__range' id='progresRange' />*/}

                        <span className="line-main"></span>
                        <span className="line-moving"></span>
                    </div>

                    <div className='content-controls'>
                        <div className='content-controls-container'>
                            <FaBackward className='icon-m ' />
                            <span className='neon__ring p-22 t2 '></span>
                        </div>

                        <div className='content-controls-container' id="playButton">

                            {playing == false ?
                                (
                                    <div className='content-controls-container' onClick={() => setPlaying(true)} >
                                        <FaPlay className='icon-xl' />
                                        <span className='neon__ring p-26'></span>
                                    </div>
                                )
                                :
                                (
                                    <div className='content-controls-container' onClick={() => setPlaying(false)} >
                                        <FaPause className='icon-xl' />
                                        <span className='neon__ring p-26'></span>
                                    </div>
                                )
                            }
                        </div>

                        <div className='content-controls-container'>
                            <FaForward className='icon-m' />
                            <span className='neon__ring p-22 t1'></span>
                        </div>
                    </div>
                </div>
            </article>

            <article className='sound'>

                <div className="sound__control">
                    <span className="sound__control-line-main"></span>
                    <span className="sound__control-line-moving"></span>
                </div>

                <div className="sound-icon">
                    <FaVolumeUp className='icon-m' />
                    <span className='neon__ring p-22'></span>
                </div>

            </article>
        </section>
    )
}

export default Card