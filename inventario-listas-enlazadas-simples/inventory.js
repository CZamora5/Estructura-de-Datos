export default class Inventory {
	constructor() {
		this._head = null;
		this._end = null;
		this._size = 0;
	}

	/* Getter Methods */
	getProductById(id) {
		let aux = this._head;
		while (aux != null) {
			if (aux.getId() == id) return aux;
			aux = aux.getNext();
		}
		return null;
	}

	getLength() {
		return this._size;
	}

	/* Public Methods */
	addProduct(product) {
		if (this.getProductById(product.getId()) != null) return false;

		if (this._size == 0) {
			this._head = product;
			this._end = product;
		} else {
			this._end.setNext(product);
		}
		this._size++;
		return true;
	}

	insertAt(product, index) {
		if (0 > index || index > this._size) return false;
		if (index == this._size) return addProduct(product);
		if (this.getProductById(product.getId()) != null) return false;

		let aux = this._head;
		for (let i = 0; i < index; i++) {
			aux = aux.getNext();
		}
		product.setNext(aux.getNext());
		aux.setNext(product);
		this._size++;
		return true;
	}

	removeAt(index) {
		let product = null;
		if (0 > index || index >= this._size) return product;
		if (this._size == 1) {
			product = this._head;
			this._head = null;
			this._end = null;
		} else if (index == 0) {
			product = this._head;
			this._head = this._head.getNext();
		} else {
			let aux = this._head;
			for (let i = 0; i < index; i++) {
				aux = aux.getNext();
			}
			if (this._size == index + 1) {
				this._end = aux;
			}
			product = aux.getNext();
			aux.setNext(aux.getNext().getNext());
		}
		product.setNext(null);
		this._size--;
		return product;
	}
}
