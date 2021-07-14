/* Method Decorator -->
target of the property (instance property --> prototype of the object, static property --> contructor function) and
name of the method and
descriptor of the property
*/

function Log (target: any, propertyName: string | Symbol ) { 
  console.log('Property decorator!')
  console.log(target, propertyName)
}

function Log2 (target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// Method Decorator
function Log3 (target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

class Product {
  @Log 
  title: string
  private _price: number

  @Log2 
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

  @Log3 // Decorator added to a method
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax)
  }
}

/* -->
Method decorator!
{constructor: ƒ, getPriceWithTax: ƒ}
getPriceWithTax
{writable: true, enumerable: false, configurable: true, value: ƒ}t: ƒ}
*/