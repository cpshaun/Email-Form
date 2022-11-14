import React, { useState, useEffect, useRef } from 'react'
import { LinearProgress } from '@mui/material';

import './LoadingScreen.css'

const LoadingScreen = (props) => {
    const [progress,setProgress] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if(oldProgress == 100){
                    setTimeout(()=> {
                        ref.current.innerHTML = 'Sent!'
                        ref.current.style.color = 'rgb(25, 118, 210)';
                        clearInterval(timer);   
                    },300)
                }
                const diff = 10;
                return Math.min(oldProgress + diff, 100);
            })
        },props.loadingTime/13);
    },[]);

  return (
    <>
        <div className="success_loading-background"/>
        <div className="page-width">
            <div className="success_loading-elements">
                <span className="success_loading-message" ref={ref}>Sending</span>
                <LinearProgress className="success_loading-progress-bar" variant="determinate" value={progress}/>
            </div>
        </div>
    </>
  )
}

export default LoadingScreen