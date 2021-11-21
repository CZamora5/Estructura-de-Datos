export default class CircularList {
	constructor() {
		this._head = null;
		this._length = 0;
	}
	
	/* Getter Methods*/
	get length() {
		return this._length;
	}

	/* Public Methods */
	getProductById(id) {
		let tmp = this._head;
		while (tmp !== null) {
			if (tmp.id === id) 
				return tmp;
			tmp = tmp.next;
		}
		return null;
	}

	getList() {
		if (this._head === null) {
			return '<strong>No hay productos en inventario<strong>'
		} 

		return this._getList();
	}

	getReverseList() {
		if (this._head === null) {
			return '<strong>No hay productos en inventario<strong>'
		} 

		return this._getReverseList();
	}

	addProduct(product) {
		if (this.alreadyExists(product)) 
			return false;
			
		let tmp = this._head;

		if (tmp === null) {
			this._head = product;
		} else if (tmp.id > product.id) {
			this._head = product;
			tmp.previous = product;
			product.next = tmp
		} else {
			while (tmp.next !== null && tmp.next.id < product.id) {
				tmp = tmp.next;
			}

			if (tmp.next !== null) {
				tmp.next.previous = product;
				product.next = tmp.next;
			}

			tmp.next = product;
			product.previous = tmp;
		}

		this._length++;
		return true;
	}

	removeById(id) {
		let product = null;
		let tmp = this._head;

		if (tmp === null) return product;
		
		if (tmp.id === id) {
			product = tmp;
			this._head = product.next;
		} else {
			while (tmp.next !== null) {
				if (tmp.next.id === id) {
					product = tmp.next;
					tmp.next = product.next;
					if (product.next !== null) 
						product.next.previous = product.previous;
					break;
				}
				tmp = tmp.next;
			}
		}

		if (product === null) return product;

		product.previous = null;
		product.next = null;
		this._length--;
		return product;
	}

	alreadyExists(product) {
		let tmp = this._head;
		while (tmp !== null) {
			if (tmp.id === product.id)
				return true;
			tmp = tmp.next;
		}
		return false;
	}
	
	/* Private Methods */
	_getList(node = this._head, nodeIndex = 1) {
		if (node === null) return '';
		let nodeInfo = `
			<strong>Producto #${nodeIndex}</strong><br>
			${node.getInfo()}<br>
		`;
		return nodeInfo + this._getList(node.next, nodeIndex + 1);
	}

	_getReverseList(node = this._head, nodeIndex = 1) {
		if (node === null) return '';
		let nodeInfo = `
			<strong>Producto #${nodeIndex}</strong><br>
			${node.getInfo()}<br>
		`;
		return this._getReverseList(node.next, nodeIndex + 1) + nodeInfo;
	}
}