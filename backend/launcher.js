// launcher.js
import app from './app.js';
import { LevelService } from './service/levelService.js';

function run() {
    console.log("Starting backend...");

    app.run();

   
    const levelService = new LevelService(1, 3);

   
    console.log("Starting letter rain...");
    levelService.startRain(300, 6000); // 500ms between letters, 5000ms total

    setTimeout(() => {
        console.log("Letter array after rain stops:", levelService.getLetterArray());
    }, 6000);  
}

run();
