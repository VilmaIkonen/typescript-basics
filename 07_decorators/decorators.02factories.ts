// Decorator factories:

function Logger(logString: string) {
  return function(target: Function) {
    console.log(logString)
    console.log(target) 
  }
}

function WithTemplate(template: string, hookId: string) {
  // return function(_: Function) { // was: return function(target: Function) --> '_' = telling ts that this is not needed --> warning on 'target' cleared 
    return function(target: any) { 
    const hookElem = document.getElementById(hookId)
    const p = new target()

    if(hookElem) {
      hookElem.innerHTML = template
      hookElem.querySelector('h1')!.textContent = p. name
    }
  }
}

// @Logger('LOGGING - PERSON DATA')
@WithTemplate('<h1>Person Data Object</h1>', 'app')
class Person {
  name = 'Vilma'

  constructor() {
    console.log('Creating person object...')
  }
}
const person = new Person()
console.log(person)

/* --> 
LOGGING - PERSON DATA
class Person {
    constructor() {
        this.name = 'Vilma';
        console.log('Creating person object...');
    }
}
Creating person object...
Person {name: "Vilma"}
*/