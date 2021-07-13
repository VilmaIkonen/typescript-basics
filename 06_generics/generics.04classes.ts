// Generic classes

// item can be of any primitive value types as long as it is same in all items inside the class ('locking down' the typefor a class)
class DataStorage<T extends string | number | boolean> { 
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1) // removing 1 element from an array
  }

  getItems() {
    return [...this.data] // returns copy of the data
  }
}

// using generic class with different data types:
const textStorage = new DataStorage<string>()
textStorage.addItem('Vilma')
textStorage.addItem('NuuJuu')

console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()
numberStorage.addItem(2)
numberStorage.addItem(555)
numberStorage.addItem(-47)
numberStorage.removeItem(2)
console.log(numberStorage.getItems())

const booleanStorage = new DataStorage<boolean>()
booleanStorage.addItem(true)
booleanStorage.addItem(false)
console.log(booleanStorage.getItems())

