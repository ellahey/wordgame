
function startLevel(timeBetweenLetters, timeout) {
    this.intervalId = setInterval(() => {
        this.character = new Letter();
        this.letterArray.push(this.character);
        console.log(this.character) //testing
    }, timeBetweenLetters);

    setTimeout(() => {
        this.stopRain();
        this.isRainStopped = true;
        console.log("Rain stopped.");
    }, timeout);
}

stopRain() {
    clearInterval(this.intervalId);
}