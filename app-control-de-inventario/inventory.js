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
		this._products.push(product);
		this._size++;
		return true;
	}

	insertAt(product, index) {
		if (0 > index || index >= this._size) return false;

		let previous = product; 
		for (let i = index; i <= this._size; i--) {
			let auxiliar = this._products[i];
			this._products[i] = previous;
			previous = auxiliar;
		}
		this._products.push(previous);
		return true;
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