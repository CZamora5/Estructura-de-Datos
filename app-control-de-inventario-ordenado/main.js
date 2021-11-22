import Inventory from './inventory.js'
import Product from './product.js'

class App {
    constructor(capacity) {
        this._capacity = capacity;
        this._inventory = new Inventory();
        this._infoLastOperation = document.getElementById('info');
        
        this._btnAdd = document.getElementById('btnAdd');
        this._btnReset = document.getElementById('btnReset');
        this._btnDelete = document.getElementById('btnDelete');
        this._btnSearch = document.getElementById('btnSearch');
        this._btnList = document.getElementById('btnList');
        this._btnInverse = document.getElementById('btnInverse');

        this._btnAdd.addEventListener('click', this.addProduct);
        this._btnReset.addEventListener('click', this.reset);
        this._btnDelete.addEventListener('click', this.deleteProduct);
        this._btnSearch.addEventListener('click', this.searchProduct);
        this._btnList.addEventListener('click', this.listProducts);
        this._btnInverse.addEventListener('click', this.inverseListProducts);
    }

    readForm() {
        const FIELDS = ['id', 'name', 'quantity', 'cost'];
        let input = FIELDS.map(field => document.getElementById(field));
        let values = input.map(elem => elem.value);

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
        if (this._inventory.getLength() >= this._capacity) { // this._inventory.getLength() == this._capacity también funciona
            Swal.fire('Error', 'El inventario está lleno', 'error');
            return;
        }

        // Ahora agregamos, si el producto ya se encontraba en inventario marcaremos error y no se agregará nada
        let result = this._inventory.addProductInAscendingOrder(product);
        if (result == false) {
            Swal.fire('Error', 'Ya existe un producto con esta Id', 'error');
            return;
        }
        
        Swal.fire('Correcto', 'Se agregó un nuevo producto', 'success');
        this._infoLastOperation.innerHTML = `
                                                <strong>Se ha agregado un nuevo producto</strong><br>
                                                ${this._infoHTML(product)}
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

        let product = this._inventory.removeAt(this._inventory.findPosition(this._inventory.getProductById(id)));
        // Aqui puede encadenar todos los métodos debido a que agregué las condiciones necesarias para que si
        // no se encuentra el producto por Id entonces findPosition retornará -1 y removeAt retornará null
        if (product == null) {
            this._infoLastOperation.innerHTML = `
                                                    <strong>No se ha encontrado ningún producto con la id ${id}</strong><br>
                                                `;
            return;
        }
        
        this._infoLastOperation.innerHTML = `
                                                <strong>Se ha eliminado el producto</strong><br>
                                                ${this._infoHTML(product)}
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
            this._infoLastOperation.innerHTML = `
                                                    <strong>No se ha encontrado ningún producto con la id ${id}</strong><br>
                                                `;
            return;
        }

        this._infoLastOperation.innerHTML = `
                                                <strong>El producto con id ${id} es</strong><br>
                                                ${this._infoHTML(product)}
                                            `;
    }

    listProducts = () => {
        this._infoLastOperation.innerHTML = '';
        const products = this._inventory.getProducts();
        const size = this._inventory.getLength();
        // En este método y en el método para listar en reversa, declaro como variables el vector de los productos 
        // y el número de elementos de este. Lo hago para evitar usar múltiples veces getLength y getProducts, pero 
        // no estoy seguro si es la mejor alternativa.

        for (let i = 0; i < size; i++) {
            this._infoLastOperation.innerHTML += `
                                                    <strong>Producto #${i + 1}</strong><br>
                                                    ${this._infoHTML(products[i])}<br>
                                                `;
        }
    }

    inverseListProducts = () => {
        this._infoLastOperation.innerHTML = '';
        const products = this._inventory.getProducts();
        const size = this._inventory.getLength();

        for (let i = 0; i < size; i++) {
            this._infoLastOperation.innerHTML += `
                                                    <strong>Producto #${size - i}</strong><br>
                                                    ${this._infoHTML(products[size - 1 - i])}<br>
                                                `;
        }
    }

    /* Private Methods */
    _infoHTML(product) {
        return `
                    Id de producto: ${product.getId()}<br>
                    Nombre de producto: ${product.getName()}<br>
                    Valor en inventario: ${product.getTotalCost()}<br>
              `;
    }

    _updateCounter() {
        document.getElementById('counter').innerHTML = this._inventory.getLength();
    }
}

// Creamos una instancia para habilitar los event listeners
new App(20);