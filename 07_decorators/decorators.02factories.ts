// Decorator factories:

function Logger(logString: string) {
  console.log('@Logger FACTORY')
  return function(target: Function) {
    console.log('Rendering @Logger')
    console.log(logString)
    console.log(target) 
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('@WithTemplate FACTORY')
  // return function(_: Function) { // was: return function(target: Function) --> '_' = telling ts that this is not needed --> warning on 'target' cleared 
    return function(target: any) { 
      console.log('Rendering @WithTemplate')
      const hookElem = document.getElementById(hookId)
      const p = new target()

    if(hookElem) {
      hookElem.innerHTML = template
      hookElem.querySelector('h1')!.textContent = p.name
    }
  }
}

@Logger('LOGGING - PERSON DATA')
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
@Logger FACTORY
@WithTemplate FACTORY
Rendering @WithTemplate
Creating person object...
Rendering @Logger
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

/* Decorator facotories are executed in normal JS order, but the decorator functions itself (@Logger, @WithTemplate) are execute bottom up, so @WithTemplate first */