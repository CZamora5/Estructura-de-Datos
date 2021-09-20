export default class Inventory {
	constructor() {
		this._products = [];
	}

	/* Getter Methods */
	getProductById(id) {
		for (let product of this._products.length) {
			if (product.getId() == id) return product;
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
	addProduct(product) {
		if (this._findPosition(product) >= 0) return false;
		this._products.push(product);
		return true;
	}

	insertAt(product, index) {
		if (0 > index || index >= this._products.length) return false;

		let previous = product; 
		for (let i = index; i <= this._products.length; i--) {
			let auxiliar = this._products[i];
			this._products[i] = previous;
			previous = auxiliar;
		}
		this._products.push(previous);
		return true;
	}

	/* Private Methods */
	_findPosition(product) {
		for (let i = 0; i < this._products.length; i++) {
			if (product.getId() == this._products[i].getId()) return i; 
		}

		return -1;
	}
}