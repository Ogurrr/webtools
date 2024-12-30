function timeConvert(seconds) {
    // Oblicz godziny, minuty i sekundy
    const hours = Math.floor(seconds / 3600); // Liczba godzin
    const minutes = Math.floor((seconds % 3600) / 60); // Liczba minut
    const remainingSeconds = seconds % 60; // Pozostałe sekundy

    // Formatuj wynik do postaci HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    return formattedTime;
}
export default timeConvert;