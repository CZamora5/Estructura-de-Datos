import Person from './person.js'
import Group from './group.js'

let group = new Group();
group.add(new Person('Carlos', '21'));
group.add(new Person('Ramiro', '19'));
group.add(new Person('Margaro', '29'));
group.add(new Person('Nepo', '5'));
group.add(new Person('Luis', '34'));
group.add(new Person('Oscar', '24'));

console.log(group.getList());