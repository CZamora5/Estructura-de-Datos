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
        // Tenía pensado hacer un vector de jugadores, lo cual iba a facilitar el método
        // para desplazar los jugadores, pero también iba a dificultar los mensajes en consola de
        // así que decidí crear ambos jugadores como distintos atributos de la clase.
        this._playerA = new Player();
        this._playerB = new Player();
        this._squares = new Array(101).fill(0); // Empezamos con todas las casillas vacias
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
        let result = Dice.roll();
        this._playerA.move(result);
        console.log(`El primer jugador avanza ${result} casillas`);
        if (this._playerA.getPosition() < 100) { // Si el jugador no ha ganado entonces puede haber caído en una casilla especial
            let nextMove = this._squares[this._playerA.getPosition()]
            if (nextMove > 0) {
                console.log(`¡El primer jugador cayó en una escalera! Avanza ${nextMove} casillas`);
            } else if (nextMove < 0) {
                console.log(`¡El primer jugador cayó en una serpiente! Retrocede ${-nextMove} casillas`);
            }
            this._playerA.move(nextMove);
        } else { // En caso de que ya haya ganado simplemente salimos de la función ya que no es necesario que el siguiente jugador avance
            console.log(`¡El primer jugador ganó!`);
            return; 
        }
        
        result = Dice.roll();
        console.log(`El segundo jugador avanza ${result} casillas`);
        this._playerB.move(result);
        if (this._playerB.getPosition() < 100) {
            let nextMove = this._squares[this._playerB.getPosition()]
            if (nextMove > 0) {
                console.log(`¡El segundo jugador cayó en una escalera! Avanza ${nextMove} casillas`);
            } else if (nextMove < 0) {
                console.log(`¡El segundo jugador cayó en una serpiente! Retrocede ${-nextMove} casillas`);
            }
            this._playerB.move(nextMove);
        } else {
            console.log(`¡El segundo jugador ganó!`);
        }
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