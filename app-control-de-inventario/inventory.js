export default class Inventory {
	constructor() {
		this._products = [];
		this._size = 0;
	}

	/* Getter Methods */
	getProductById(id) {
		for (let i = 0; i < this._size; i++) {
			if (this._products[i].getId() == id) return this._products[i];
		}

		return null;
	}

	getLength() {
		return this._size;
	}

	getProducts() {
		return this._products;
	}

	/* Public Methods */
	addProduct(product) {
		if (this.findPosition(product) >= 0) return false;
		if (this._products.length == this._size) {
                    // Tenemos this._products.length >= this._size, por definición. Cuando ambos son iguales tendremos que hacer
                    // un push para no tener un error acceso. Cuando el vector tiene más capacidad solo modificamos la posición.
                    this._products.push(product);
                } else this._products[this._size] = product;
                this._size++;
                return true;
	}

	insertAt(product, index) {
		if (0 > index || index >= this._size) return false;

		let auxiliar = this._products[index];
		this._products[index] = product;
		return auxiliar;
	}

	removeAt(index) {
		if (0 > index || index >= this._size) return false;

		let product = this._products[index];
		for (let i = index; i < this._size; i++) {
			this._products[i] = this._products[i + 1]; 
		}
		this._size--;
		return product;
	}

	/* Private Methods */
	findPosition(product) {
		for (let i = 0; i < this._size; i++) {
			if (product.getId() == this._products[i].getId()) return i; 
		}

		return -1;
	}
}
