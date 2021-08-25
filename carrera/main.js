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
