import Inventory from './inventory.js'
import Product from './product.js'

class App {
    constructor() {
        this._inventory = new Inventory();
        
        this._btnAdd = document.getElementById('btnAdd');
        this._btnReset = document.getElementById('btnReset');
        this._btnDelete = document.getElementById('btnDelete');
        this._btnSearch = document.getElementById('btnSearch');
        this._btnList = document.getElementById('btnList');
        this._btnInverse = document.getElementById('btnInverse');
        this._btnInsert = document.getElementById('btnInverse');
    }
}

// Creamos una instancia para habilitar los event listeners
new App();