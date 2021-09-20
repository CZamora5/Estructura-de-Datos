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

        this._btnAdd.addEventListener('click', this.addProduct);
    }

    addProduct = () => {
        const FIELDS = ['id', 'name', 'quantity', 'cost'];
        let input = FIELDS.map(field => document.getElementById(field));
        let values = input.map(elem => elem.value);

        let [id, name, quantity, cost] = values;
        name.trim();

        if (!(id && name && quantity && cost)) {
            Swal.fire('Error', 'Faltaron campos para esta operación, consulta las instrucciones', 'error');
            return;
        }
        
        document.querySelector('form').reset();
        let product = new Product(parseInt(id), name, parseFloat(quantity), parseFloat(cost));
        let result = this._inventory.addProduct(product);
        if (result == 'ya existe') {
            Swal.fire('Error', 'Ya existe un producto con esta Id', 'error');
        } else if (result == 'lleno') {
            Swal.fire('Error', 'El inventario está lleno', 'error');
        } else {
            Swal.fire('Correcto', 'Se agregó un nuevo producto', 'success');
        }
        return;
    }
}

// Creamos una instancia para habilitar los event listeners
new App();