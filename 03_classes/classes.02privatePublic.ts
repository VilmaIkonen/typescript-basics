class Department {
  name: string // --> default is 'public'
  private employees: string[] = [] // 'private' --> employees now onnly accessible within the class. Otherwise could be modified outside it too, could lead to problems (e.g. with accounting.employees[2] = 'Anna' )

  constructor(n: string) {
    this.name = n 
  }

  describe(this: Department) {
    console.log('Department ' + this.name)
  } 

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInfo() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

const accounting = new Department('Accounting')  

accounting.addEmployee('Lee')
accounting.addEmployee('Max')
// accounting.employees[2] = 'Anna' // 'employees' can be added only with addEmployee method as 'employees' property is private for the class

accounting.describe()
accounting.name = 'NEW NAME' // 'name' is accessible 
accounting.printEmployeeInfo()


 // *********************************************** //
class Product {
  private isListed: boolean;

  constructor(public title: string, public price: number) {
    this.isListed = true;
  }
}

// shorthand for class Product {
//   title: string;
//   price: number;
//   private isListed: boolean;

//   constructor(name: string, pr: number) {
//     this.title = name;
//     this.price = pr;
//     this.isListed = true;
//   }
// }


