export default class Product {
    /*
        La información de cada producto debe permitir guardar 
        el código, el nombre, cantidad y el el costo, 
        además como propiedad calcular el valor de mercancía 
        que sería un valor calculado por la cantidad y el costo.
    */
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
   
   getTotalCost() {
       return this._quantity * this._cost;
   }
}