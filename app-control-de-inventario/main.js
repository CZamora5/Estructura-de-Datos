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
        this._btnDelete.addEventListener('click', this.deleteProduct);
        this._btnSearch.addEventListener('click', this.searchProduct);
        this._btnList.addEventListener('click', this.listProducts);
        this._btnInverse.addEventListener('click', this.inverseListProducts);
        this._btnInsert.addEventListener('click', this.insertProduct);
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

    deleteProduct = () => {
        let id = parseInt(document.getElementById('id').value);

        let product = this._inventory.getProductById(id);
        if (product == null) {
            this._paragraph.innerHTML = `
                                            <strong>No se ha encontrado ningún producto con la id ${id}</strong><br>
                                        `;
            return;
        }

        // Una vez que compruebo que el producto fue encontrado por Id, se que tiene una posición válida
        // de hecho ya tengo el producto guardado en la variable producto
        let position = this._inventory.findPosition(product);
        this._inventory.removeAt(position);
        this._paragraph.innerHTML = `
                                        <strong>Se ha eliminado el producto</strong><br>
                                        ${this._infoHTML(product)}
                                    `;
    }

    searchProduct = () => {
        
    }

    listProducts = () => {
        this._paragraph.innerHTML = '';
        for (let i = 0; i < this._inventory.getLength(); i++) {
            this._paragraph.innerHTML += `
                                            <strong>Producto #${i + 1}</strong><br>
                                            ${this._infoHTML(this._inventory.getProducts()[i])}<br>
                                        `;
        }
    }

    inverseListProducts = () => {
        this._paragraph.innerHTML = '';
        const products = this._inventory.getProducts();
        for (let i = 0; i < this._inventory.getLength(); i++) {
            this._paragraph.innerHTML += `
                                            <strong>Producto #${i + 1}</strong><br>
                                            ${this._infoHTML(products[this._inventory.getLength() - 1 - i])}<br>
                                        `;
        }
    }

    insertProduct = () => {
        
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
new App(20);