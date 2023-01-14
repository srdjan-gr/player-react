import React from 'react'
import { FaForward, FaBackward, FaPlay, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import album from '../../img/bob.jpg';

const Card = () => {
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
                        <div className='content-duration-time'>
                            <h3>0:46</h3>
                            <h3>3:52</h3>
                        </div>

                        <span className="line-main"></span>
                        <span className="line-moving"></span>
                    </div>

                    <div className='content-controls'>
                        <div className='content-controls-container'>
                            <FaBackward className='icon-m ' />
                            <span className='neon__ring p-22 t2 '></span>
                        </div>
                        <div className='content-controls-container'>
                            <FaPlay className='icon-xl' />
                            <span className='neon__ring p-26 t3'></span>
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