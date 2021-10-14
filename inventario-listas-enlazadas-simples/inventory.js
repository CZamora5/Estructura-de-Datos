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
	addProduct(product) {
		if (this.findPosition(product) >= 0) return false;

		this._products.push(product);
		return true;
	}

	insertAt(product, index) {
		if (0 > index || index > this._products.length) return false;
		this._products.push(null);

		for (let i = this._products.length - 2; i >= index; i--) {
			this._products[i + 1] = this._products[i]; 
		}
		this._products[index] = product;
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

	findPosition(product) {
		for (let i = 0; i < this._products.length; i++) {
			if (product.getId() == this._products[i].getId()) return i; 
		}

		return -1;
	}
}
