import CircularList from './circularList.js'
import Station from './station.js'

class App {
    constructor(maxCapacity) {
        this._maxCapacity = maxCapacity;
        this._inventory = new Inventory();
        this._$infoDiv = document.getElementById('info-div');
        
        this._$btnAdd = document.getElementById('btn-add');
        this._$btnDelete = document.getElementById('btn-delete');
        this._$btnSearch = document.getElementById('btn-search');
        this._$btnList = document.getElementById('btn-list');
        this._$btnReverse = document.getElementById('btn-reverse');

        this._$btnAdd.addEventListener('click', this.addProduct);
        this._$btnDelete.addEventListener('click', this.deleteProduct);
        this._$btnSearch.addEventListener('click', this.searchProduct);
        this._$btnList.addEventListener('click', this.listProducts);
        this._$btnReverse.addEventListener('click', this.reverseListProducts);
    }

    readForm() {
        const fields = ['id', 'name', 'quantity', 'cost'];
        let values = fields.map(field => document.getElementById(field).value);

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
        if (product === null) return;
        this.reset();

        // Primero verificamos que el inventario tenga espacio
        if (this._inventory.length >= this._maxCapacity) {
            Swal.fire('Error', 'El inventario está lleno', 'error');
            return;
        }

        // Ahora agregamos, si el producto ya se encontraba en inventario marcaremos error y no se agregará nada
        let result = this._inventory.addProduct(product);
        if (result === false) {
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
        this.reset();

        let product = this._inventory.removeById(id);
        if (product === null) {
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
        this.reset();

        let product = this._inventory.getProductById(id);
        if (product === null) {
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
        this._$infoDiv.innerHTML = this._inventory.getReverseList();
    }

    /* Private Methods */
    _updateCounter() {
        document.getElementById('counter').innerHTML = this._inventory.length;
    }
}

// Creamos una instancia para habilitar los event listeners
new App(20);