'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Options from '@/func/Options';
import { Progress } from '@/func/Progress';
import { formatTime } from '@/utils/timeFormat';
import { Button, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const AUDIO_PATH = '/audio/alarm.wav';

export default function Timer() {
    const theme = useTheme();
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [finished, setFinished] = useState(false);
    const [selected, setSelected] = useState(-1);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);

    const startTimer = useCallback((seconds: number) => {
        loadSound();
        setSeconds(seconds);
        setSelected(seconds);
        setFinished(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds <= 1) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    setFinished(true);
                    playSound();
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);
    }, []);

    const loadSound = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }

        fetch(AUDIO_PATH)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => audioContextRef.current!.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
                audioBufferRef.current = audioBuffer;
            })
            .catch((error) => console.error('Error loading audio:', error));
    }, []);

    function playSound() {
        if (audioBufferRef.current && audioContextRef.current) {
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBufferRef.current;
            source.connect(audioContextRef.current.destination);
            source.start(0);
            console.log('Audio playing successfully.');
        } else {
            console.log('Audio buffer is not loaded.');
        }
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            audioContextRef.current?.close();
        };
    }, []);

    return (
        <div
            style={{
                height: '100%',
                padding: '32px',
                background: finished ? 'grey' : theme.palette.background.default,
            }}
        >
            <div
                style={{
                    borderRadius: '16px',
                    background: theme.palette.background.paper,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* View */}
                <div
                    style={{
                        padding: '32px',
                        height: '230px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Countdown */}
                    {selected != -1 && !finished && (
                        <Typography variant='h1' marginY={2}>
                            {formatTime(seconds)}
                        </Typography>
                    )}

                    {/* Nothing selected */}
                    {selected == -1 && (
                        <Typography variant='h2' marginY={2}>
                            Select a timer
                        </Typography>
                    )}

                    {/* Restart Last */}
                    {finished && (
                        <Button
                            color='primary'
                            variant='outlined'
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                fontSize: '1.5rem',
                                minHeight: '100px',
                            }}
                            onClick={() => startTimer(selected)}
                        >
                            {formatTime(selected)}
                        </Button>
                    )}
                </div>

                {/* Glow animation */}
                {finished && <Glow />}

                {/* Options */}
                <Options selected={selected} onSelected={startTimer} />

                <Progress seconds={selected} running={!!intervalRef.current} />
            </div>
        </div>
    );
}

function Glow() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                setFinished(true);
            }, 4000);
        }
    }, []);

    if (finished) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeatType: 'reverse', repeat: Infinity }}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 1,
                background: 'rgba(255, 255, 255, 0.1)',
            }}
        />
    );
}
