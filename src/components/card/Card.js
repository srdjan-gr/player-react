import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { FaFastForward, FaFastBackward, FaPlay, FaVolumeUp, FaVolumeMute, FaPause } from 'react-icons/fa';
import { songsData } from '../../data';

import noImage from '../../data/covers/No_Image_Available.jpg';
import image from '../../data/covers/fleke.jpg';

// const imgfdolder = process.env.PUBLIC_URL;
const slike = process.env.REACT_APP_BACKEND_PRODUCT_IMAGES;

// export const songsData = [
//     {
//         id: 1,
//         title: 'Speed',
//         artist: 'Billy Idol',
//         cover: './data/covers/billy-idol-speed.jpg',
//         song: './data/songs/Billy Idol - Speed.mp3'
//     },
//     {
//         id: 2,
//         title: 'The Road To Hell',
//         artist: 'Cris Rea',
//         cover: './data/covers/The_Road_to_Hell.jpg',
//         song: './data/songs/Cris Rea - The Road To Hell.MP3'
//     },
//     {
//         id: 3,
//         title: 'Slatka mala',
//         artist: 'Fleke',
//         cover: 'public/data/fleke.jpg',
//         // cover: './data/covers/fleke.jpg',
//         // cover: '',
//         song: './data/songs/Fleke - Slatka mala.mp3'
//     },
//     {
//         id: 4,
//         title: 'Heroj Ulice',
//         artist: 'Prljavo Kazaliste',
//         // cover: './data/covers/Prljavo_kazaliste_-_heroj_ulice_album.jpg',
//         cover: '../../data/Prljavo_kazaliste_-_heroj_ulice_album.jpg',
//         song: './data/songs/Prljavo Kazaliste - Heroj Ulice.mp3'
//     }
// ]


const Card = () => {

    const [songs, setSongs] = useState(songsData);
    const [currentSong, setCurrentSong] = useState(songsData[2]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [volume, setVolume] = useState(1);
    const [autoplay, setAutoplay] = useState(false);

    const audioElement = useRef();
    const clickRef = useRef();





    // useEffect(() => {
    //     onPlaying()
    // }, [isPlaying])

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
            audioElement.current.volume = 1;
        } else {
            setMute(true);
            audioElement.current.volume = 0;
        }
    }


    const changeSong = () => {

        let index = songs.findIndex(x => x.title == currentSong.title);

        if (index == 0) {
            setCurrentSong(songs[songs.length - 1]);
            audioElement.current.play();
        } else {
            setCurrentSong(songs[index - 1]);
            audioElement.current.autoplay = true;
        }
    }


    const renderTimeDuration = () => {

        let fullTime = currentSong.length / 100;
        let st = fullTime.toFixed(2)
        let str = st.toString();

        let currentTime = currentSong.current;

        if (!currentTime) {
            return (
                <div className='content-duration-time'>
                    <h3>0:00</h3>
                    <h3>0:00</h3>
                </div>
            )
        } else {
            let sct = currentTime.toFixed(0)
            let cut = str.split('.');

            return (
                <div className='content-duration-time'>
                    <h3>0:{sct}</h3>
                    <h3>{`${cut[0]}:${cut[1]}`}</h3>
                </div>
            )
        }
    }


    const onPlaying = () => {
        const duration = audioElement.current.duration;
        const currentTime = audioElement.current.currentTime;

        setCurrentSong({ ...currentSong, 'progress': currentTime / duration * 100, 'length': duration, 'current': currentTime, })
    }


    const changeProgress = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElement.current.currentTime = divprogress / 100 * currentSong.length;
    }


    return (
        <section className='container'>


            <article className='card'>

                {
                    currentSong.cover == '' ? (<img src={noImage} alt='' />) : (<img src={slike + currentSong.cover} />)
                }


                <div className="content">
                    <div className='content-info'>
                        <h1>{currentSong.artist}</h1>
                        <h2>{currentSong.title}</h2>
                    </div>

                    <div className='content-duration'>

                        <audio src={currentSong.song} type="audio/mpeg" ref={audioElement} onTimeUpdate={onPlaying} />

                        {renderTimeDuration()}

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
                    <span className="sound__control-line-main"></span>
                    <span className="sound__control-line-moving" style={{ height: '10%' }}></span>
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
        </section >
    )
}

export default Card