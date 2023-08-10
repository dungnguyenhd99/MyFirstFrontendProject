/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/css/MusicBar.css';

function MusicBar({ audioList, onMusicChange }) {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [preVolume, setPrevolume] = useState(0.5);
    const [duration, setDuration] = useState(0);
    const [isMute, setIsMute] = useState(false);

    const audioRef = useRef(null);
    const marqueeRef = useRef(null);

    useEffect(() => {
        setIsPlaying(true);
    }, []);

    useEffect(() => {
        audioRef.current = new Audio(audioList[currentSongIndex].audioSource);

        const audio = audioRef.current;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const updateDuration = () => {
            setDuration(audio.duration);
        };

        const handleEnded = async () => {
            setIsPlaying(false);
            await new Promise(resolve => setTimeout(resolve, 0));
            const previousSongIndex = (currentSongIndex - 1 + audioList.length) % audioList.length;
            setCurrentSongIndex(previousSongIndex);
            onMusicChange({ type: 'songIndexChange', value: previousSongIndex });
            setIsPlaying(true);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadeddata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadeddata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentSongIndex, audioList]);

    useEffect(() => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume;
    }, [volume, currentSongIndex]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleMute = async () => {
        if (volume > 0) {
            setPrevolume(volume);
            await new Promise(resolve => setTimeout(resolve, 0));
            setVolume(0);
            setIsMute(true);
        } else {
            setVolume(preVolume);
            setIsMute(false);
        }
    }

    const handleNextSong = async () => {
        setIsPlaying(false);
        await new Promise(resolve => setTimeout(resolve, 0));
        const nextSongIndex = (currentSongIndex + 1) % audioList.length;
        setCurrentSongIndex(nextSongIndex);
        setIsPlaying(true);
        onMusicChange({ type: 'songIndexChange', value: nextSongIndex });
    };

    const handlePreviousSong = async () => {
        setIsPlaying(false);
        await new Promise(resolve => setTimeout(resolve, 0));
        const previousSongIndex = (currentSongIndex - 1 + audioList.length) % audioList.length;
        setCurrentSongIndex(previousSongIndex);
        setIsPlaying(true);
        onMusicChange({ type: 'songIndexChange', value: previousSongIndex });
    };

    const handleTimeChange = (event) => {
        const newTime = parseFloat(event.target.value);
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        const marqueeText = marqueeRef.current;
        const container = marqueeText.parentElement;

        if (marqueeText.scrollWidth > container.clientWidth) {
            marqueeText.classList.add('marquee');
        } else {
            marqueeText.classList.remove('marquee');
        }
    }, [audioList[currentSongIndex].songName]);

    useEffect(() => {
        const audio = audioRef.current;

        return () => {
            audio.pause();
        };
    }, [currentSongIndex])

    return (
        <div className="music-bar row">
            <div className="song-name col-3">
                <p ref={marqueeRef} className='marquee' style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {audioList[currentSongIndex].songName}
                </p>
            </div>
            <div className="music-controls col-2">
                <button className='t-buttons' onClick={handlePreviousSong} style={{ paddingLeft: 20, paddingRight: 5, color: 'rgb(186, 177, 177)' }}><i className="fas fa-step-backward" style={{ fontSize: '0.8rem' }}></i></button>
                <button className='t-buttons' onClick={handlePlayPause}>
                    {isPlaying ? <i className="fas fa-pause t-buttons" style={{ fontSize: '0.8rem', color: 'rgb(186, 177, 177)' }}></i> : <i className="fas fa-play t-buttons" style={{ fontSize: '0.8rem', color: 'rgb(186, 177, 177)' }}></i>}
                </button>
                <button className='t-buttons' onClick={handleNextSong} style={{ paddingLeft: 5, paddingRight: 0, color: 'rgb(186, 177, 177)' }}><i className="fas fa-step-forward" style={{ fontSize: '0.8rem' }}></i></button>
            </div>
            <div className="time-slider col-3">
                <input
                    className="slider-input"
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleTimeChange}
                />
            </div>
            <div className='col-2' style={{ paddingRight: 0 }}>
                <span className="slider-value" style={{ color: 'rgb(186, 177, 177)', margin: 0, fontWeight: 'bold' }}>
                    <span style={{ fontSize: '0.75rem' }}>{formatTime(currentTime)} | {formatTime(duration)} &#160;</span> {!isMute ? <i className="fas fa-volume-down volume-button" style={{ fontSize: '0.9rem' }} onClick={handleMute}></i> : <i class="fas fa-volume-mute volume-button" style={{ fontSize: '0.9rem' }} onClick={handleMute}></i>}
                </span>
            </div>
            <div className="volume-slider col-1" style={{ width: 65, paddingLeft: 0, paddingRight: 0 }}>
                <input
                    className="volume-input"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />
            </div>
        </div>
    );
}

export default MusicBar;