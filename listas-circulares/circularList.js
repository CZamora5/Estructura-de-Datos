export default class CircularList {
	constructor() {
		this._head = null;
		this._tail = null;
	}

	/* Public Methods */
	getStationByName(name) {
		let tmp = this._head;

		if (tmp === null) return tmp;
		if (this._tail.name === name) return this._tail;

		while (tmp.next !== this._head) {
			if (tmp.name === name) return tmp;
			tmp = tmp.next;
		}
		return null;
	}

	addStation(station) {
		if (alreadyExists(station)) return false;

		if (this._head === null) {
			this._head = station;
			this._tail = station;
			station.next = station;
			station.previous = station;
		} else {
			this._head.previous = station;
			this._tail.next = station;
			station.next = this._head;
			station.previous = this._tail;
			this._tail = station;
		}

		return true;
	}

	removeByName(name) {
		let tmp = this._head;

		if (tmp === null) return tmp;

		if (this._head.name === name && this._tail.name === name) {
			this._head = null;
			this._tail = null;
			tmp.previous = null;
			tmp.next = null;
			return tmp;
		}

		if (this._head.name === name) {
			this._head = tmp.next;
		} else if (this._tail.name === name) {
			tmp = this._tail;
			this._tail = tmp.previous;
		} else {
			while (tmp.next !== this._head) {
				if (tmp.name === name) break;
				tmp = tmp.next;
			}
		}

		if (tmp !== null) {
			tmp.previous.next = tmp.next;
			tmp.next.previous = tmp.previous;
			tmp.next = null;
			tmp.previous = null;
		}
		return tmp;
	}

	getList() {
		if (this._head === null) {
			return '<strong>No hay bases en la ruta<strong>';
		} 

		return this._getList();
	}

	getReverseList() {
		if (this._head === null) {
			return '<strong>No hay bases en la ruta<strong>';
		}

		return this._getReverseList();
	}

	alreadyExists(station) {
		let tmp = this._head;

		if (tmp === null) return false;
		if (this._tail.name === station.name) return true;

		while (tmp.next !== this._head) {
			if (tmp.name === station.name) return true;
			tmp = tmp.next;
		}
		return false;
	}
	
	/* Private Methods */
	_getList(node = this._head, nodeIndex = 1) {
		if (node === this._head && nodeIndex > 1) return '';
		let nodeInfo = `
			<strong>Base #${nodeIndex}</strong><br>
			${node.getInfo()}<br>
		`;
		return nodeInfo + this._getList(node.next, nodeIndex + 1);
	}

	_getReverseList(node = this._head, nodeIndex = 1) {
		if (node === this._head && nodeIndex > 1) return '';
		let nodeInfo = `
			<strong>Base #${nodeIndex}</strong><br>
			${node.getInfo()}<br>
		`;
		return this._getReverseList(node.next, nodeIndex + 1) + nodeInfo;
	}
}