export default class Inventory {
	constructor() {
		this._head = null;
		this._length = 0;
	}

	/* Getter Methods */
	getProductById(id) {
		let aux = this._head;
		while (aux != null) {
			if (aux.getId() == id) 
				return aux;
			aux = aux.getNext();
		}
		return null;
	}

	getLength() {
		return this._length;
	}

	getList() {
		if (this._head == null) {
			return '<strong>No hay productos en inventario<strong>'
		} 

		return this._getList();
	}

	getReverseList() {
		if (this._head == null) {
			return '<strong>No hay productos en inventario<strong>'
		} 

		return this._getReverseList();
	}

	/* Public Methods */
	addProduct(product) {
		if (this.alreadyExists(product)) 
			return false;

		if (this._head == null) {
			this._head = product;
		} else {
			let aux = this._head;
			while (aux.getNext() != null) {
				aux = aux.getNext();
			}
			aux.setNext(product);
		}

		this._length++;
		return true;
	}

	insertAt(product, index) {
		if (this._length + 1 < index || index <= 0) 
			return false;

		if (index == 1) {
			product.setNext(this._head);
			this._head = product;
		} else {
			let aux = this._head;
			for (let i = 0; i < index - 2; i++) {
				aux = aux.getNext();
			}
			product.setNext(aux.getNext());
			aux.setNext(product);
		}
		this._length++;
		return true;
	}

	removeAt(index) {
		let product = null;
	
		if (this._length < index || index <= 0) 
			return product;

		if (index == 1) {
			product = this._head;
			this._head = product.getNext();
		} else {
			let aux = this._head;
			for (let i = 0; i < index - 2; i++) {
				aux = aux.getNext();
			}
			product = aux.getNext();
			aux.setNext(product.getNext());
		}

		this._length--;
		product.setNext(null);
		return product;
	}

	removeById(id) {
		let product = null;

		if (this._head == null) return product;

		if (this._head.getId() == id) {
			product = this._head;
			this._head = product.getNext();
		} else {
			let aux = this._head;
			while (aux.getNext() != null) {
				if (aux.getNext().getId() == id) {
					product = aux.getNext();
					aux.setNext(product.getNext());
					break;
				}
				aux = aux.getNext();
			}
		}

		if (product != null) { 
			product.setNext(null);
			this._length--;
		}
		return product;
	}

	alreadyExists(product) {
		let aux = this._head;
		while (aux != null) {
			if (aux.getId() == product.getId()) 
				return true;
			aux = aux.getNext();
		}
		return false;
	}

	getProductPosition(product, node = this._head, curIndex = 1) {
		if (node == null) return -1;
		if (node.getId() == product.getId()) return curIndex;
		return this.getProductPosition(product, node.getNext(), curIndex + 1);
	}
	
	/* Private Methods */
	_getList(node = this._head, curIndex = 1) {
		if (node == null) return '';
		let nodeInfo = `
			<strong>Producto #${curIndex}</strong><br>
			${node.getInfo()}<br>
		`;
		return nodeInfo + this._getList(node.getNext(), curIndex + 1);
	}

	_getReverseList(node = this._head, curIndex = 1) {
		if (node == null) return '';
		let nodeInfo = `
			<strong>Producto #${curIndex}</strong><br>
			${node.getInfo()}<br>
		`;
		return this._getReverseList(node.getNext(), curIndex + 1) + nodeInfo;
	}
}