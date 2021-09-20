export default class Inventory {
	constructor() {
		this._products = [];
	}

	/* Getter Methods */
	getProductById(id) {
		for (let product of this._products.length) {
			if (product.getId() == id) return product; 
		}

		return false;
	}

	getLength() {
		return this._products.length;
	}
}