function renderletter(letter) {
    const rainContainer = document.querySelector('#rainArea')
    const raindrop = document.createElement('div');
    let raindrops = [];

    raindrop.classname = 'raindrop';
    raindrop.innertext = letter;
   //to CSS raindrop.style.left = `${math.random() * 100}vw`;
   //to CSS raindrop.style.animationduration = `${math.random() * 5 + 3}s`;
    rainContainer.appendChild(raindrop);
    raindrops.push(raindrop);

    raindrop.addeventlistener('click', () => this.renderselectedletter(letter));

    raindrop.addeventlistener('animationend', () => {
        raindrop.remove();
        this.raindrops = this.raindrops.filter(drop => drop !== raindrop);

        if (this.raindrops.length === 0 && this.israinstopped && this.onrainstop) {
            this.onrainstop();
        }
    });
}
