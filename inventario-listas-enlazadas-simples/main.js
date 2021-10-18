import Inventory from './inventory.js'
import Product from './product.js'

class App {
    constructor(maxCapacity) {
        this._maxCapacity = maxCapacity;
        this._inventory = new Inventory();
        this._$infoDiv = document.getElementById('infoDiv');
        
        this._$btnAdd = document.getElementById('btnAdd');
        this._$btnReset = document.getElementById('btnReset');
        this._$btnDelete = document.getElementById('btnDelete');
        this._$btnSearch = document.getElementById('btnSearch');
        this._$btnList = document.getElementById('btnList');
        this._$btnReverse = document.getElementById('btnReverse');
        this._$btnInsert = document.getElementById('btnInsert');

        this._$btnAdd.addEventListener('click', this.addProduct);
        this._$btnReset.addEventListener('click', this.reset);
        this._$btnDelete.addEventListener('click', this.deleteProduct);
        this._$btnSearch.addEventListener('click', this.searchProduct);
        this._$btnList.addEventListener('click', this.listProducts);
        this._$btnReverse.addEventListener('click', this.reverseListProducts);
        this._$btnInsert.addEventListener('click', this.insertProduct);
    }

    readForm() {
        const FIELDS = ['id', 'name', 'quantity', 'cost'];
        let values = FIELDS.map(field => document.getElementById(field).value);

        let [id, name, quantity, cost] = values;
        name.trim();

        if (!(id && name && quantity && cost)) {
            Swal.fire('Error', 'Faltaron campos para esta operación, consulta las instrucciones', 'error');
            return null;
        }
        
        return new Product(parseInt(id), name, parseFloat(quantity), parseFloat(cost));
    }

    addProduct = () => {
        let product = this.readForm();
        if (product == null) return;
        document.querySelector('form').reset();

        // Primero verificamos que el inventario tenga espacio
        if (this._inventory.getLength() >= this._maxCapacity) {
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
        this._$infoDiv.innerHTML = `
            <strong>Se ha agregado un nuevo producto</strong><br>
            ${product.getInfo()}
        `;
        this._updateCounter();
    }

    reset = () => {
        document.querySelector('form').reset();
    }

    deleteProduct = () => {
        let id = document.getElementById('id').value;
        if (!id) {
            Swal.fire('Error', 'Faltaron campos para esta operación, consulta las instrucciones', 'error');
            return;
        }

        id = parseInt(id);
        document.querySelector('form').reset();

        let product = this._inventory.removeById(id);
        if (product == null) {
            this._$infoDiv.innerHTML = `
                <strong>No se ha encontrado ningún producto con la id ${id}</strong><br>
            `;
            return;
        }

        this._$infoDiv.innerHTML = `
            <strong>Se ha eliminado el producto</strong><br>
            ${product.getInfo()}
        `;
        this._updateCounter();
    }

    searchProduct = () => {
        let id = document.getElementById('id').value;
        if (!id) {
            Swal.fire('Error', 'Faltaron campos para esta operación, consulta las instrucciones', 'error');
            return;
        }

        id = parseInt(id);
        document.querySelector('form').reset();

        let product = this._inventory.getProductById(id);
        if (product == null) {
            this._$infoDiv.innerHTML = `
                <strong>No se ha encontrado ningún producto con la id ${id}</strong><br>
            `;
            return;
        }

        this._$infoDiv.innerHTML = `
            <strong>El producto con id ${id} es</strong><br>
            ${product.getInfo()}
        `;
    }

    listProducts = () => {
        this._$infoDiv.innerHTML = this._inventory.getList();
    }

    reverseListProducts = () => {
        this._$infoDiv.innerHTML = this._$infoDiv.innerHTML = this._inventory.getReverseList();
    }

    insertProduct = () => {
        let product = this.readForm();
        let index = document.getElementById('insertAt').value;
        if (!(product && index)) {
            Swal.fire('Error', 'Faltaron campos para esta operación, consulta las instrucciones', 'error');
            return;
        }

        index = parseInt(index);
        document.querySelector('form').reset();

        // Primero verificamos que el inventario tenga espacio
        if (this._inventory.getLength() >= this._maxCapacity) {
            Swal.fire('Error', 'El inventario está lleno', 'error');
            return;
        }

        if (this._inventory.alreadyExists(product) && this._inventory.getProductPosition(product) != index) {
            Swal.fire('Error', 'Ya se encuentra en el inventario un producto con la id añadida', 'error');
            return;
        }

        let success = this._inventory.insertAt(product, index);
        if (!success) {
            Swal.fire('Error', 'Se ingreso una posición no válida, consulta las instrucciones', 'error');
            return;
        }
        this._$infoDiv.innerHTML = `
            <strong>Se ha agregado un nuevo producto en la posición ${index}</strong><br>
            ${product.getInfo()}<br>
        `;

        this._updateCounter();
    }

    /* Private Methods */
    _updateCounter() {
        document.getElementById('counter').innerHTML = this._inventory.getLength();
    }
}

// Creamos una instancia para habilitar los event listeners
new App(20);