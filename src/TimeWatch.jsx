import TimeWatch from "./TimeWatch.js"
import Bar from './Bar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

async function startTimeWatch() {
    const hours = parseInt(document.getElementById("timeHours").value, 10);
    const minutes = parseInt(document.getElementById("timeMinutes").value, 10);
    const seconds = parseInt(document.getElementById("timeSeconds").value, 10);

      const timer = new TimeWatch(hours,minutes,seconds);

      while (!timer.isCanceled()) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log("Koniec!");
}
function TimeWatchComponent() {
    return (
        <>
            {/* Komponent Bar na górze */}
            <Bar />

            {/* Reszta aplikacji */}
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {/* Input dla czasu */}
                        <div className="mb-3 d-flex justify-content-between">
                            <div className="mt-5 flex-fill">
                                <label htmlFor="time" className="form-label">Type time(hours)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="timeHours"
                                    min="2"
                                    defaultValue={0}
                                />
                            </div>
                            <div className="mt-5 flex-fill">
                                <label htmlFor="time2" className="form-label">Type time(minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="timeMinutes"
                                    min="2"
                                    defaultValue={0}
                                />
                            </div>
                            <div className="mt-5 flex-fill">
                                <label htmlFor="time3" className="form-label">Type time(seconds)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="timeSeconds"
                                    min="2"
                                    defaultValue={0}
                                />
                            </div>
                        </div>


                        {/* Przycisk wysyłania */}
                        <button className="btn btn-primary w-100" id="send" onClick={startTimeWatch}>Start timer</button>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            {/* Przycisk wyłączenia alarmu */}
                            <button className="btn btn-primary w-100" id="stopButton" style={{display: "none"}}>
                                Stop alarm
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                        <p id="time-left" className="text-bg-success"
                           style={{display: "none", textAlign: "center"}}>

                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TimeWatchComponent
