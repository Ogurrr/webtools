import timeConvert from "./timeConvert.js";

function playBellSound(time=5) {
    for (let i = 0; i < time; i++) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator1.type = 'sine';  // Sinusoidalna fala dla głównego tonu
        oscillator2.type = 'sine';  // Sinusoidalna fala dla wyższego tonu
        oscillator1.frequency.setValueAtTime(440, audioContext.currentTime); // A4
        oscillator2.frequency.setValueAtTime(880, audioContext.currentTime); // A5 (wyższy ton)
        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);  // Początkowe ciche wzmocnienie
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.2);  // Stopniowe wzmocnienie
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);  // Zanik dźwięku
        oscillator1.start();
        oscillator2.start();
        oscillator1.stop(audioContext.currentTime + 2);
        oscillator2.stop(audioContext.currentTime + 2);

    }
}
let intervalId;
function startSoundLoop() {
    // Wykonuj dźwięk co 2 sekundy
    intervalId = setInterval(() => {
        playBellSound();
    }, 2000);
}

function stopSoundLoop() {
    // Zatrzymuje pętlę, gdy przycisk jest kliknięty
    clearInterval(intervalId);
    const stopButton = document.getElementById("stopButton");
    stopButton.style.display = "none";
}

function hoursToSeconds(hours) {
    return hours * 3600;
}
function minutesToSeconds(minutes) {
    return minutes * 60;
}

export class TimeWatch {
    constructor(timeHours, timeMinutes,timeSeconds) {
        this.time = hoursToSeconds(timeHours) + minutesToSeconds(timeMinutes) + timeSeconds;
        this.actualTime = 0;
        this.timeLeftParagraph = document.getElementById("time-left");
        this.timeLeftParagraph.style.display = "block";
        if(isNaN(this.time)){
            return 404
        }
        this.intervalId = setInterval(() => this.callback(), 1000);
    }

    callback() {
        this.actualTime++;
        console.log(this.actualTime + "/" + this.time);
        this.timeLeftParagraph.innerText = timeConvert(this.time - this.actualTime);
        if (this.actualTime >= this.time) {
            this.stop();
        }
    }

    stop() {
        clearInterval(this.intervalId);
        this.timeLeftParagraph.style.display = "none";

        const stopButton = document.getElementById("stopButton");
        stopButton.style.display = "block";
        stopButton.onclick = stopSoundLoop;

        // Rozpocznij odtwarzanie dźwięku w pętli
        startSoundLoop();

    }

    isCanceled() {
        return this.actualTime >= this.time;
    }
}
export default TimeWatch;
