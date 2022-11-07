import styles from '../styles/Home.module.css'
import {useState, useEffect} from "react";
import Timer from "../components/timer";
import Script from 'next/script';

export default function Home() {
    const [task, setTask] = useState('Focus')
    const [session, setSession] = useState(false)
    const [time, setTime] = useState(25)
    const [fullScreen, setFullScreen] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            // trigger keypress combination 'shift + fKK'
            if (event.shiftKey && event.key === 'K') {
                if (fullScreen) {
                    setFullScreen(false)
                    openFullscreen()
                }
                setFullScreen(true)
                openFullscreen()
            }
        }, );
    },[fullScreen]);

    useEffect(() => {
        const script = document.createElement("script");
        const div = document.getElementById("supportByBMC");
        script.setAttribute(
            "src",
            "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        );
        script.setAttribute("data-name", "BMC-Widget");
        script.setAttribute("data-cfasync", "false");
        script.setAttribute("data-id", "devnour");
        script.setAttribute("data-description", "Support me on Buy me a coffee!");
        script.setAttribute(
            "data-message",
            "This lets me know my work is appreciated. Your support helps keep this open to everyone."
        );
        script.setAttribute("data-color", "#222");
        script.setAttribute("data-position", "Right");
        script.setAttribute("data-x_margin", "18");
        script.setAttribute("data-y_margin", "18");

        script.onload = function () {
            let evt = document.createEvent("Event");
            evt.initEvent("DOMContentLoaded", false, false);
            window.dispatchEvent(evt);
        };

        div.appendChild(script);
    }, []);


    if(!session){
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Let&apos;s focus</h1>
                <h5 className={styles.subtitle}>Press &apos;Ctrl&apos; + &apos;F&apos; to enter or exit fullscreen mode</h5>
                <input className={styles.card} placeholder={"Title: Focus"} onChange={(i) => {
                    setTask(i.target.value)
                }}/>
                <input className={styles.card} placeholder={"Minutes: 25"} onChange={(i) => {
                    setTime(i.target.value)
                }}/>
                <button className={styles.button}
                        onClick={()=>{
                            setSession(true);
                            setFullScreen(true)
                            openFullscreen();
                        }}>
                    Set Task
                </button>
                <Script
                    id={'BMC-Widget'}
                    strategy={"beforeInteractive"}
                    dangerouslySetInnerHTML={{
                        __html: `<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="devnour" data-description="Support me on Buy me a coffee!" data-message="This lets me know my work is appreciated. Your support helps keep this open to everyone." data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>`
                    }}
                />
                <div id="supportByBMC"></div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}> {task} </h1>
            <Timer time={time}/>
            <button style={{position: "fixed", bottom: '150px',}} className={styles.button}
                    onClick={()=>{setSession(false)}}>
                New Task
            </button>
        </div>
    )
}

// Function enter full screen mode
function openFullscreen() {

    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().then(r => console.log(r)).catch(e => console.log(e));
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }

    if(!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen().then(r => console.log(r)).catch(e => console.log(e));
    }
}
