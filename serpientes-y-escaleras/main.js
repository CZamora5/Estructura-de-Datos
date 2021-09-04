class Dice {
	static roll() {
		return Math.floor(Math.random()*6 + 1);
	}
}

class Player {
    constructor() {
        this._position = 0;
    }

    getPosition() {
        return this._position;
    }

    move(distance) {
        this._position += distance;
    }
}

class Board {
    constructor() {
        this._playerA = new Player();
        this._playerB = new Player();
        this._squares = new Array(101).fill(0);
        this._buildBoard(); // Marcamos las serpientes y escaleras
    }

    _buildBoard() {
        // Escaleras, el valor en cada posición del arreglo indica cuantas casillas más se podrán avanzar
        this._squares[1] = 37;
        this._squares[4] = 10;
        this._squares[9] = 22;
        this._squares[21] = 21;
        this._squares[28] = 56;
        this._squares[51] = 16;
        this._squares[72] = 9;
        this._squares[80] = 19;

        // Serpientes, el número negativo indica que se retrocederán casillas
        this._squares[17] = -10;
        this._squares[54] = -20;
        this._squares[62] = -43;
        this._squares[64] = -4;
        this._squares[87] = -51;
        this._squares[93] = -20;
        this._squares[94] = -19;
        this._squares[98] = -19;
    }

    getAllPlayerPositions() {
        return [this._playerA.getPosition(), this._playerB.getPosition()];
    }

    updatePlayers() {
        // Primero tiramos el dado y nos movemos el número de casillas que marque el dado,
        // luego nos movemos el número de casillas indicadas en la nueva posición del tablero,
        // en caso de que no caigamos en serpientes ni en escaleras nos moveremos cero casillas.
        this._playerA.move(Dice.roll());
        if (this._playerA.getPosition() < 100) this._playerA.move(this._squares[this._playerA.getPosition()]);
        
        this._playerB.move(Dice.roll());
        if (this._playerB.getPosition() < 100) this._playerB.move(this._squares[this._playerB.getPosition()]);
    }
}

const board = new Board();
const totalSquares = 100;
let positions = board.getAllPlayerPositions();

do {
    board.updatePlayers();
    positions = board.getAllPlayerPositions();

    console.log(`Posición del primer jugador: ${positions[0]}, posición del segundo jugador: ${positions[1]}`);
} while(positions[0] < totalSquares && positions[1] < totalSquares)

if (positions[0] >= totalSquares && positions[1] >= totalSquares) {
    console.log('Hubo un empate');
} else if (positions[0] >= totalSquares) {
    console.log('El primer jugador ganó');
} else {
    console.log('El segundo jugador ganó');
}