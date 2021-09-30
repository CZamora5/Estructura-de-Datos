class Person {
    constructor(name, age) {
        this._name = name;
        this._age = age;
        this._next = null;
    }

    /* Getter Methods */
    getName() {
        return this._name;
    }

    getAge() {
        return this._age;
    }

    getNext() {
        return this._next;
    }
}