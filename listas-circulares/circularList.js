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

  alreadyExists(name) {
    let tmp = this._head;

    if (tmp === null) return false;
    if (this._tail.name === name) return true;

    while (tmp.next !== this._head) {
      if (tmp.name === name) return true;
      tmp = tmp.next;
    }
    return false;
  }

  addStation(station) {
    if (this.alreadyExists(station.name)) return false;

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
      return '<h3>No hay bases en la ruta</h3>';
    }

    return '<h3>Bases en la ruta</h3>' + this._getList();
  }

  getReverseList() {
    if (this._head === null) {
      return '<h3>No hay bases en la ruta</h3>';
    }

    return '<h3>Bases en la ruta</h3>' + this._getReverseList();
  }

  createCard(name, startingTime, duration) {
    let station = this.getStationByName(name);
    if (station === null) {
      return '';
    }

    let msg = '<h3>Recorrido</h3>',
      accDuration = 0;
    while (duration >= accDuration) {
      msg += `(${station.name}) > ${this._getTime(startingTime, accDuration)}<br>`;
      station = station.next;
      accDuration += station.duration;
    }
    return msg;
  }

  /* Private Methods */
  _getList(node = this._head, nodeIndex = 1) {
    if (node === this._head && nodeIndex > 1) return '';
    let nodeInfo = `
			<b>Base #${nodeIndex}</b><br>
			${node.getInfo()}<br>
		`;
    return nodeInfo + this._getList(node.next, nodeIndex + 1);
  }

  _getReverseList(node = this._head, nodeIndex = 1) {
    if (node === this._head && nodeIndex > 1) return '';
    let nodeInfo = `
			<b>Base #${nodeIndex}</b><br>
			${node.getInfo()}<br>
		`;
    return this._getReverseList(node.next, nodeIndex + 1) + nodeInfo;
  }

  _getTime(start, duration) {
    let h = ((start + Math.floor(duration / 60)) % 24).toString().padStart(2, '0');
    let m = (duration % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}