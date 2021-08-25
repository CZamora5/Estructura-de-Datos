class Dice {
	static roll() {
		return Math.floor(Math.random()*6 + 1);
	}
}

class Runner {
    constructor() {
        this._position = 0;
    }

    getPosition() {
        return this._position;
    }

    move() {
        let result = Dice.roll();
        if (result >= 4) {
            this._position += 2;
        } else if (result >= 2) {
            this._position += 1;
        } else {
            this._position += 3;
        }
    }
}

const runnerA = new Runner();
const runnerB = new Runner();
const distance = 100;

while(runnerA.getPosition() < distance && runnerB.getPosition() < distance) {
    runnerA.move();   
    runnerB.move();

    console.log(`Posición del primer corredor: ${runnerA.getPosition()}, posición del segundo corredor: ${runnerB.getPosition()}`);
}

if (runnerA.getPosition() >= distance && runnerB.getPosition() >= distance) {
    console.log('Hubo un empate');
} else if (runnerA.getPosition() >= distance) {
    console.log('El primer corredor ganó');
} else {
    console.log('El segundo corredor ganó');
}