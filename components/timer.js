// timer takes in a time in minutes and displays a countdown timer
import {useState, useEffect} from "react";
import styles from "../styles/Home.module.css";

export default function Timer({time}) {
    const [timeLeft, setTimeLeft] = useState(time * 60)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (!paused) {
            // reset timer when time is up
            if (timeLeft === 0) {
                setPaused(true)
            }
            const interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeLeft, paused]);

    // add pause, play and reset functionality
    function reset() {
        setTimeLeft(time * 60)
        setPaused(true)
    }
    function pause() {
        setPaused(true)
        setTimeLeft(timeLeft.valueOf())
    }
    function play() {
        setPaused(false)
        setTimeLeft(timeLeft.valueOf())
    }

    return (
        <div>
            <h1 className={styles.card} style={{textAlign:"center"}}>{Math.floor(timeLeft / 60)}:{timeLeft % 60}</h1>
            <div>
                <button
                    className={styles.button}
                    onClick={()=>{
                        if(!paused){
                            pause()
                        } else {
                            play()
                        }
                    }}>
                    <h2>
                        {!paused ? "Pause" : "Play"}
                    </h2>
                </button>
                <button className={styles.button} onClick={()=>{reset()}}>
                    <h2>
                        Reset
                    </h2>
                </button>
            </div>
        </div>
    )
}