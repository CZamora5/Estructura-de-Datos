export default class Product {
    constructor(id, name, quantity, cost) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._cost = cost;
        this._totalCost = this._cost * this._quantity;
        this._next = null;
        this._prev = null;
    }

    /* Getter Methods */
    get id() { 
        return this._id;
    }

    get totalCost() {
        return this._totalCost;
    }

    get next() {
        return this._next;
    }

    get previous() {
        return this._prev;
    }

    /* Setter Methods */
    set next(product) {
        this._next = product;
    }

    set previous(product) {
        this._prev = product;
    }

    /* Public Methods */
    getInfo() {
    return `
            Id de producto: ${this._id}<br>
            Nombre de producto: ${this._name}<br>
            Valor en inventario: ${this._totalCost}<br>
        `;
    }
}