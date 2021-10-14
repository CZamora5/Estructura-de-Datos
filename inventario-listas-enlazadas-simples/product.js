export default class Product {
   constructor(id, name, quantity, cost) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._cost = cost;
        this._next = null;
   }

   /* Getter Methods */
   getId() {
       return this._id;
   }

   getName() {
       return this._name;
   }

   getTotalCost() {
       return this._quantity * this._cost;
   }

   getNext() {
       return this._next;
   }

   /* Setter Methods */
   setNext(product) {
       this._next = product;
   }
}