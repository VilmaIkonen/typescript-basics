/* Property Decorator -->
Decorator will have two arguments: 
target of the property (instance property --> prototype of the object, static property --> contructor function) and
propertyName
*/

function Log (target: any, propertyName: string | Symbol ) { 
  console.log('Property decorator!')
  console.log(target, propertyName)
}

class Product {
  @Log // Decorator added to a property
  title: string
  private _price: number

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
Property decorator!
{constructor: ƒ, getPriceWithTax: ƒ} "title"
*/