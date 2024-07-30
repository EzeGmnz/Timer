import { useEffect } from 'react';

const AUDIO_PATH = '/audio/alarm.wav';
export default function Finish() {
    const audio = new Audio(AUDIO_PATH);

    const playSound = () => {
        audio.play();
    };

    useEffect(() => {
        playSound();
    }, []);

    return <div></div>;
}
