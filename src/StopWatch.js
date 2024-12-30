export class StopWatch {
    constructor(timers, removeCallback) {
        this.time = 0;
        this.minutes = 0;
        this.hours = 0;
        this.isPaused = false;
        this.removeCallback = removeCallback;

        // Ustawiamy interwał dla aktualizacji stopera
        this.intervalId = setInterval(() => this.callback(), 1000);

        // Przypisujemy nazwę elementowi
        this.name = `timer${timers}`;
        this.createTimerElement(timers);
    }

    createTimerElement(timers) {
        let timersUL = document.getElementById("timers");
        if (timersUL) {
            // Utwórz nowy element <li>
            let node = document.createElement("li");
            node.setAttribute("id", this.name);
            node.style.marginBottom = "10px"; // Dodanie odstępu między timerami
            node.style = "list-style-type: none;"

            // Utwórz wstępny tekst stopera
            let timerText = document.createElement("span");
            timerText.textContent = "00:00:00";
            timerText.setAttribute("id", `${this.name}-text`);
            timerText.style.marginRight = "1.5%"; // Odstęp od przycisków

            // Utwórz przycisk do pauzowania
            let pauseButton = document.createElement("button");
            pauseButton.textContent = "Pause";
            pauseButton.className = "btn btn-primary";
            pauseButton.style.marginRight = "2%"; // Odstęp między przyciskami
            pauseButton.addEventListener("click", () => this.togglePause(pauseButton));

            // Utwórz przycisk do usuwania
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-primary";
            deleteButton.addEventListener("click", () => this.remove());

            // Dodaj elementy do <li>
            node.appendChild(timerText);
            node.appendChild(pauseButton);
            node.appendChild(deleteButton);

            // Dodaj element <li> jako dziecko do <ul>
            timersUL.appendChild(node);
        } else {
            console.error("Element o id 'timers' nie istnieje.");
        }
    }

    callback() {
        if (this.isPaused) return;

        this.time++;

        // Aktualizacja minut i godzin
        if (this.time === 60) {
            this.minutes++;
            this.time = 0;
        }
        if (this.minutes === 60) {
            this.hours++;
            this.minutes = 0;
        }

        // Aktualizacja DOM
        const timerTextElement = document.getElementById(`${this.name}-text`);
        if (timerTextElement) {
            timerTextElement.textContent = `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.time).padStart(2, '0')}`;
        }
    }

    togglePause(button) {
        this.isPaused = !this.isPaused;
        button.textContent = this.isPaused ? "Resume" : "Pause";
    }

    remove() {
        // Usuń element z DOM
        const timerElement = document.getElementById(this.name);
        if (timerElement) {
            timerElement.remove();
        }

        // Zatrzymaj interwał
        clearInterval(this.intervalId);

        // Wywołaj callback, aby usunąć z listy
        if (this.removeCallback) {
            this.removeCallback(this);
        }
    }
}

export default StopWatch;
