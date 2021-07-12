class Department {
  name: string // default value can be set --> name: string = 'DEFAULT'

  constructor(n: string) {
    this.name = n // sets value of 'name' field to the value of 'n' when 'Department' object is created
  }
  // assigning method
  describe(this: Department) {
    console.log('Department ' + this.name)
  } 
}

// Creating 'Department' object with 'new' and pass constructor argument(s) to 'Department' call
const accounting = new Department('Accounting') // --> new JS object created based on the 'blueprint'

const IT = new Department('IT')

console.log(accounting) // --> Department {name: 'Accounting'}
console.log(IT) // --> Department {name: 'IT'}

accounting.describe() // --> Department Accounting

const accountingCopy = { name: 'DUMMY', describe: accounting.describe}
accountingCopy.describe() // --> Department DUMMY
console.log(accountingCopy) // {name: 'DUMMY, describe: f}

