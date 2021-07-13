// Decorators: for meta-programming. DEcorators excecute when class is defined, not when it is instantiated
// For using decorators: tsgonfig.json: 'ES6' + 'experimentalDEcorators: true'

// Decorator = a function that you apply on eg. class in certain way. Convention to start name with uppercase
function Logger(target: Function) {
  console.log('Logging...')
  console.log(target) 
}

@Logger
class Person {
  name = 'Vilma'

  constructor() {
    console.log('Creating person object...')
  }
}
const person = new Person()
console.log(person)

/* -->
Logging...
class Person {
    constructor() {
        this.name = 'Vilma';
        console.log('Creating person object...');
    }
}
Creating person object...
Person {name: "Vilma"}
*/