import { useState } from 'react';
import Bar from './Bar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import stopWatch from './StopWatch.js';

function StopWatchComponent() {
    const [timers, setTimers] = useState([]);

    const StartStopWatch = () => {
        console.log('Starting stop watch');
        const newTimer = new stopWatch(timers.length);
        setTimers((prevTimers) => [...prevTimers, newTimer]);
    };

    return (
        <>
            <Bar />
            <center>
                <div className="mb-3 d-flex justify-content-between">
                    <div className="mt-5 flex-fill">
                        <div className="col-md-6">
                            <button
                                className="btn btn-primary w-100"
                                id="send"
                                onClick={StartStopWatch}
                            >
                                Start timer
                            </button>
                            <ul id="timers">
                                {/* UL for timers */}
                            </ul>
                        </div>
                    </div>
                </div>
            </center>
        </>
    );
}

export default StopWatchComponent;
