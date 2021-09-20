export default class Product {
   constructor(id, name, quantity, cost) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._cost = cost;
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
}