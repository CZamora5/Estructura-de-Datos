import Inventory from './inventory.js'
import Product from './product.js'

class App {
    constructor(capacity) {
        this._capacity = capacity;
        this._inventory = new Inventory();
        this._paragraph = document.getElementById('paragraph');
        
        this._btnAdd = document.getElementById('btnAdd');
        this._btnReset = document.getElementById('btnReset');
        this._btnDelete = document.getElementById('btnDelete');
        this._btnSearch = document.getElementById('btnSearch');
        this._btnList = document.getElementById('btnList');
        this._btnInverse = document.getElementById('btnInverse');
        this._btnInsert = document.getElementById('btnInverse');

        this._btnAdd.addEventListener('click', this.addProduct);
        this._btnReset.addEventListener('click', this.reset);
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

        // Primero verificamos que el inventario tenga espacio
        if (this._inventory.getLength() >= this._capacity) {
            Swal.fire('Error', 'El inventario está lleno', 'error');
            return;
        }

        // Ahora agregamos, si el producto ya se encontraba en inventario marcaremos error y no se agregará nada
        let result = this._inventory.addProduct(product);
        if (result == false) {
            Swal.fire('Error', 'Ya existe un producto con esta Id', 'error');
            return;
        }
        
        Swal.fire('Correcto', 'Se agregó un nuevo producto', 'success');
        this._paragraph.innerHTML = `
                                        <strong>Se ha agregado un nuevo producto</strong><br>
                                        ${this._infoHTML(product)}
                                    `;
    }

    reset = () => {
        document.querySelector('form').reset();
    }

    /* Private Methods */
    _infoHTML(product) {
        return `
                    Id de producto: ${product.getId()}<br>
                    Nombre de producto: ${product.getName()}<br>
                    Valor en inventario: ${product.getTotalCost()}<br>
              `;
      }
}

// Creamos una instancia para habilitar los event listeners
new App(2);