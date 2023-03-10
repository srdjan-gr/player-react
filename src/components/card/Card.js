import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { FaFastForward, FaFastBackward, FaPlay, FaVolumeUp, FaVolumeMute, FaPause } from 'react-icons/fa';
import { songsData } from '../../data';

const noCover = 'data/covers/No_Image_Available.jpg';


const Card = () => {

    const [songs, setSongs] = useState(songsData);
    const [currentSong, setCurrentSong] = useState(songsData[2]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [currentVolume, setCurrentVolume] = useState('');
    const [autoplay, setAutoplay] = useState(false);

    const [fullTime, setFullTime] = useState(0);
    const [playingTime, setPlayingTime] = useState(0);

    const audioElement = useRef();
    const clickRef = useRef();
    const clickVolumeRef = useRef();


    const playPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
            audioElement.current.pause();
        } else {
            setIsPlaying(true);
            audioElement.current.play();
        }
    }


    const muteFunction = () => {
        if (mute) {
            setMute(false);
            audioElement.current.volume = currentVolume;

        } else {
            setMute(true);
            // Current volume is state for volume before Mute. Unmute returns the volume to CurrentVolume 
            setCurrentVolume(audioElement.current.volume)
            audioElement.current.volume = 0;
        }
    }


    const changeSong = () => {
        let index = songs.findIndex(x => x.title == currentSong.title);

        if (index == 0) {
            setCurrentSong(songs[songs.length - 1]);
            audioElement.current.play();
        } else {
            setIsPlaying(true)
            setCurrentSong(songs[index - 1]);
            audioElement.current.autoplay = true;
        }
    }


    const timeConversion = (duration, currentTime) => {

        let hrs = Math.floor(duration / 3600);
        let mins = Math.floor((duration % 3600) / 60);
        let secs = Math.floor(duration % 60);

        let time = ''

        if (hrs > 0) {
            time += (mins < 10 ? "0" : "");
        }

        time += "" + mins + ":" + (secs < 10 ? "0" : "");
        time += "" + secs;

        setFullTime(time);



        let hrsCurr = Math.floor(currentTime / 3600);
        let minsCurr = Math.floor((currentTime % 3600) / 60);
        let secsCurr = Math.floor(currentTime % 60);

        let timeCurr = ''

        if (hrsCurr > 0) {
            timeCurr += (minsCurr < 10 ? "0" : "");
        }

        timeCurr += "" + minsCurr + ":" + (secsCurr < 10 ? "0" : "");
        timeCurr += "" + secsCurr;

        setPlayingTime(timeCurr);
    }


    // Adding lenght, current time and volume properties on play press to CurrentSong object from  <Audio /> HTML Element Ref
    const onPlaying = () => {

        const duration = audioElement.current.duration;
        const currentTime = audioElement.current.currentTime;
        const elVolume = audioElement.current.volume;

        setCurrentSong({ ...currentSong, 'progress': currentTime / duration * 100, 'length': duration, 'current': currentTime, 'currentVolume': elVolume, 'onStartVolume': 1 })

        timeConversion(duration, currentTime)
    }


    const changeProgress = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElement.current.currentTime = divprogress / 100 * currentSong.length;
    }


    const changeVolume = (e) => {
        let height = clickVolumeRef.current.clientHeight;
        const offset = e.nativeEvent.offsetY;

        const divVolume = offset / height * 100;
        audioElement.current.volume = divVolume / 100 * currentSong.onStartVolume;
    }


    return (
        <section className='container'>
            <article className='card'>
                <div className={`${isPlaying == false ? 'image' : 'rotation image'}`}>
                    {
                        currentSong.cover == '' ? (<img src={noCover} alt='' />) : (<img src={currentSong.lpcover} alt={currentSong.title} />)
                    }
                </div>



                <div className="content">
                    <div className='content-info'>
                        <h1>{currentSong.artist}</h1>
                        <h2>{currentSong.title}</h2>
                    </div>

                    <div className='content-duration'>

                        <audio src={currentSong.song} type="audio/mpeg" ref={audioElement} onTimeUpdate={onPlaying} onEnded={changeSong} />

                        {
                            !currentSong.current ? (
                                <div className='content-duration-time'>
                                    <h3>0:00</h3>
                                    <h3>0:00</h3>
                                </div>
                            ) : (
                                <div className='content-duration-time'>
                                    <h3>{playingTime}</h3>
                                    <h3>{fullTime}</h3>
                                </div>
                            )
                        }

                        <span className="line-main" onClick={changeProgress} ref={clickRef}>
                            <span className="line-moving" style={{ width: `${currentSong.progress + '%'}` }} ></span>
                        </span>
                    </div>

                    <div className='content-controls'>
                        <div className='content-controls-container' onClick={() => changeSong()}>
                            <FaFastBackward className='icon-m ' />
                            <span className='neon__ring p-22 t2 '></span>
                        </div>

                        <div className='content-controls-container' id="playButton">
                            {isPlaying == false ?
                                (
                                    <div className='content-controls-container' onClick={() => playPause()} >
                                        <FaPlay className='icon-xl' />
                                        <span className='neon__ring p-26'></span>
                                    </div>
                                )
                                :
                                (
                                    <div className='content-controls-container' onClick={() => playPause()} >
                                        <FaPause className='icon-xl' />
                                        <span className='neon__ring p-26'></span>
                                    </div>
                                )
                            }
                        </div>

                        <div className='content-controls-container' onClick={() => changeSong()}>
                            <FaFastForward className='icon-m' />
                            <span className='neon__ring p-22 t1'></span>
                        </div>
                    </div>
                </div>
            </article>

            <article className='sound'>

                <div className="sound__control">
                    <span className="sound__control-line-main" onClick={changeVolume} ref={clickVolumeRef}>
                        <span className="sound__control-line-moving" style={{ height: `${currentSong.currentVolume * 100 + '%'}` }}></span>
                    </span>
                </div>

                {
                    mute == false ?
                        (
                            <div className="sound-icon" onClick={() => muteFunction()}>
                                <FaVolumeUp className='icon-m icon-rotate' />
                                <span className='neon__ring p-22'></span>
                            </div>
                        )
                        :
                        (
                            <div className="sound-icon" onClick={() => muteFunction()}>
                                <FaVolumeMute className='icon-m icon-rotate' />
                                <span className='neon__ring p-22'></span>
                            </div>
                        )
                }
            </article>
        </section>
    )
}

export default Card