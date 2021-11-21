export default class Station {
  constructor(name, duration) {
    this._name = name;
    this._duration = duration;
    this._next = null;
    this._prev = null;
  }

  /* Getter Methods */
  get name() {
    return this._name;
  }

  get duration() {
    return this._duration;
  }

  get next() {
    return this._next;
  }

  get previous() {
    return this._prev;
  }

  /* Setter Methods */
  set next(station) {
    this._next = station;
  }

  set previous(station) {
    this._prev = station;
  }

  /* Public Methods */
  getInfo() {
    return `
      Nombre de la base: ${this._name}<br>
      Duración del recorrido: ${this._duration}<br>
    `;
  }
}