/* Accessor Decorator -->
Decorator will have three arguments: 
target of the property (instance property --> prototype of the object, static property --> contructor function) and
name of the accessor and
descriptor of the property
*/

function Log (target: any, propertyName: string | Symbol ) { 
  console.log('Property decorator!')
  console.log(target, propertyName)
}

// Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

class Product {
  @Log 
  title: string
  private _price: number

  @Log2 // Decorator added to an accessor
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

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax)
  }
}

/* -->
Accessor decorator!
{constructor: ƒ, getPriceWithTax: ƒ}
price
get: undefined, enumerable: false, configurable: true, set: ƒ}
*/