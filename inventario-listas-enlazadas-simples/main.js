import Inventory from './inventory.js'
import Product from './product.js'

class App {
    constructor(capacity) {
        this._capacity = capacity;
        this._inventory = new Inventory();
        this._infoDiv = document.getElementById('infoDiv');
        
        this._btnAdd = document.getElementById('btnAdd');
        this._btnReset = document.getElementById('btnReset');
        this._btnDelete = document.getElementById('btnDelete');
        this._btnSearch = document.getElementById('btnSearch');
        this._btnList = document.getElementById('btnList');
        this._btnReverse = document.getElementById('btnReverse');
        this._btnInsert = document.getElementById('btnInsert');

        this._btnAdd.addEventListener('click', this.addProduct);
        this._btnReset.addEventListener('click', this.reset);
        this._btnDelete.addEventListener('click', this.deleteProduct);
        this._btnSearch.addEventListener('click', this.searchProduct);
        this._btnList.addEventListener('click', this.listProducts);
        this._btnReverse.addEventListener('click', this.reverseListProducts);
        this._btnInsert.addEventListener('click', this.insertProduct);
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
        this._infoDiv.innerHTML = `
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

        let product = this._inventory.getProductById(id);
        if (product == null) {
            this._infoDiv.innerHTML = `
                                        <strong>No se ha encontrado ningún producto con la id ${id}</strong><br>
                                    `;
            return;
        }

        // Una vez que compruebo que el producto fue encontrado por Id, se que tiene una posición válida
        // de hecho ya tengo el producto guardado en la variable producto
        let position = this._inventory.findPosition(product);
        this._inventory.removeAt(position);
        this._infoDiv.innerHTML = `
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
            this._infoDiv.innerHTML = `
                                        <strong>No se ha encontrado ningún producto con la id ${id}</strong><br>
                                    `;
            return;
        }

        this._infoDiv.innerHTML = `
                                    <strong>El producto con id ${id} es</strong><br>
                                    ${product.getInfo()}
                                `;
    }

    listProducts = () => {
        this._infoDiv.innerHTML = '';
        for (let i = 0; i < this._inventory.getLength(); i++) {
            this._infoDiv.innerHTML += `
                                        <strong>Producto #${i + 1}</strong><br>
                                        ${this._inventory.getProducts()[i].getInfo()}<br>
                                    `;
        }
    }

    reverseListProducts = () => {
        this._infoDiv.innerHTML = '';
        const products = this._inventory.getProducts();
        for (let i = 0; i < this._inventory.getLength(); i++) {
            this._infoDiv.innerHTML += `
                                        <strong>Producto #${this._inventory.getLength() - i}</strong><br>
                                        ${products[this._inventory.getLength() - 1 - i].getInfo()}<br>
                                    `;
        }
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
        if (this._inventory.getLength() >= this._capacity) {
            Swal.fire('Error', 'El inventario está lleno', 'error');
            return;
        }
        if (this._inventory.getProductById(product.getId()) != null) {
            Swal.fire('Error', 'Este id ya se encuentra en el inventario', 'error');
            return;
        }

        let previous = this._inventory.insertAt(product, index - 1);
        if (previous == false) {
            Swal.fire('Error', 'Se ingreso una posición no válida, consulta las instrucciones', 'error');
            return;
        }
        this._infoDiv.innerHTML = `
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

let inventory = new Inventory();
inventory.addProduct(new Product(1, 'Carlos', 2, 2));
inventory.addProduct(new Product(2, 'Ramiro', 3, 3));
inventory.addProduct(new Product(3, 'Margaro', 4, 4));
inventory.addProduct(new Product(4, 'Nepo', 5, 5));
inventory.addProduct(new Product(5, 'Luis', 6, 6));
inventory.addProduct(new Product(6, 'Oscar', 7, 7));

console.log(inventory);
let list = inventory.getList(), 
    reverseList = inventory.getReverseList();
let $infoDiv = document.getElementById('infoDiv');
// $infoDiv.innerHTML = list;
// $infoDiv.innerHTML = reverseList;
// document.write(inventory.getReverseList());
console.log(inventory.removeAt(2));
console.log(inventory.removeAt(inventory.getLength()));
console.log(inventory.insertAt(new Product(1, 'Carlos', 2, 2), 3));
console.log(inventory.insertAt(new Product(10, 'Carlos', 2, 2), 5));
console.log(inventory.insertAt(new Product(11, 'Carlos', 2, 2), 6));
console.log(inventory.insertAt(new Product(0, 'Carlos', 2, 2), 1));
$infoDiv.innerHTML = inventory.getList();
$infoDiv.innerHTML = inventory.getReverseList();