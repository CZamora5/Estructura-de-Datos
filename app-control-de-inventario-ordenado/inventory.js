export default class Inventory {
	constructor() {
		this._products = [];
	}

	/* Getter Methods */
	getProductById(id) {
		for (let i = 0; i < this._products.length; i++) {
			if (this._products[i].getId() == id) return this._products[i];
		}

		return null;
	}

	getLength() {
		return this._products.length;
	}

	getProducts() {
		return this._products;
	}

    /* Public Methods */
    findPosition(product) {
        if (product == null) return -1;

		for (let i = 0; i < this._products.length; i++) {
			if (product.getId() == this._products[i].getId()) return i; 
		}

		return -1;
	}

    addProduct(product) {
        if (this.findPosition(product) >= 0) return false;

        this._products.push(product);
        return true;
    }

	addProductInAscendingOrder(product) {
		if (this.findPosition(product) >= 0) return false;

        let position = 0;
        while (position < this._products.length && product.getId() > this._products[position].getId()) {
            position++;
        }
        this._insertAt(product, position);
		return true;
	}

    removeAt(index) {
		if (0 > index || index >= this._products.length) return null;

		let product = this._products[index];
		for (let i = index; i < this._products.length - 1; i++) {
			this._products[i] = this._products[i + 1];
		}
		this._products.pop();
		return product;
	}

    /* Private Methods */
    _insertAt(product, index) {
        // Este método solo se usará dentro de la clase después de haber verificado que el producto no existe
        // y la posición será pasada por nosotros también, entonces no ocupamos hacer verificaciones.
        this._products.push(null);

		for (let i = this._products.length - 2; i >= index; i--) { 
            // -2 porque aumentamos el tamaño del vector previamente.
            //  También empezamos desde el final para no utilizar variables auxiliares.
			this._products[i + 1] = this._products[i];
		}
		this._products[index] = product;
	}
}