export default class Group {
    constructor() {
        this._head = null;
    }

    /* Getter Methods */
    getHead() { 
        return this._head;
    }

    getList() {
        let aux = this._head;
        if (aux == null) {
            return 'No hay alumnos inscritos en este grupo.';
        }

        let str = '';
        while (aux != null) {
            str += `${aux.getName()}, ${aux.getAge()} años; `;
            aux = aux.getNext();
        }
        // Otra manera de hacerlo es con while (aux.getNext() != null) y eso me
        // permitiría poner el último elemento afuera del ciclo como
        // if (str != '') str += `y ${aux.getName()}, ${aux.getAge()} años.`;
        // else str = `${aux.getName()}, ${aux.getAge()} años.`;

        return str;
    }

    /* Public Methods */
    add(person) {
        if (this._head == null) {
            this._head = person;
        } else {
            let aux = this._head;
            while (aux.getNext() != null) {
                aux = aux.getNext();
            }
            aux.setNext(person);
        }
    }
}