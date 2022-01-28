import React, { useRef, useState } from 'react';
import HomeView from './HomeView';

const HomeController = () => {

    const [count, setCount] = useState(0);
    const [statusPlay, setStatusPlay] = useState(0);
    const timer = useRef(null);

    const onStart = () => {        
        timer.current = setInterval(() => {
            setStatusPlay(1);
            setCount((count) => count + 1);
        }, 1000);
    }

    const onPause = () => {        
        setStatusPlay(2);
        clearInterval(timer.current);
    }

    const onStop = () => {
        setCount(0);
        setStatusPlay(0);
        clearInterval(timer.current);
    }

    return <HomeView count={count} statusPlay={statusPlay}
                     onStart={onStart} onPause={onPause} onStop={onStop} />;
}


export default HomeController;