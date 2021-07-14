/* Returning from decorator function. Return value depends on what kind of decorator is used.

Decorator in class: new constructor, will replace the old one. Function in return will only run when lassin instatiated, not on class definition

Decorator in method and in accessor: new PropertyDescriptor

*/

function WithTemplate(template: string, hookId: string) {
  console.log('@WithTemplate FACTORY')

    return function<T extends {new(...args: any[]): {name:string}}>(originalConstructor: T) { 

      // Class return type:
      return class extends originalConstructor {
      constructor(..._args: any[]) { // underscore --> this will not be used
        super() // originalConstructor logic will also be available
        console.log('Rendering @WithTemplate')
        const hookElem = document.getElementById(hookId)
  
        if(hookElem) {
          hookElem.innerHTML = template
          hookElem.querySelector('h1')!.textContent = this.name // from originalConstructor
        }
      }
    }
  }
}

@WithTemplate('<h1>Person Data Object</h1>', 'app')

class Person {
  name = 'Vilma'

  constructor() {
    console.log('Creating person object...')
  }
}

const person = new Person()

/* --> 
@WithTemplate FACTORY
Creating person object...
Rendering @WithTemplate
*/

// Accessor Decorator
function Log2 (target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// Method Decorator
function Log3 (target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  console.log('Method decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)

  return { // Changing descriptor will allow changing configuration of the method

  }
}

class Product {
  title: string
  private _price: number

  @Log2 // accessor decorator
  set price(val: number) {
    if(val > 0) {
      this._price = val
    } else {
      throw new Error ('Invalid price!')
    }
  }

  constructor(t:string, p: number) {
    this.title = t
    this._price = p
  } 

  @Log3 // method decorator
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax)
  }
}

// Decorator for method: 
// Setting 'this' keyword to the object the method belongs to (no need then for separate '.bind()')
function AutoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) { 
  // Access to the that should be called with descriptor ('value' holds function 'getPriceWithTax(tax))
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true, 
    enumerable: false,
    // new method added (getter contains extra logic that is run before the value (ie here the function) is returned):
    get() {
      // 'this' will refer here to object where the method is originally defined
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjustedDescriptor
}

class Printer {
  message = 'This works!'

  @AutoBind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()
const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)
// button.addEventListener('click', p.showMessage.bind(p))