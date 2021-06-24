class Department {
  // private id: number
  // private name: string 
  // private employees: string[] = [] 

  // constructor(id: number, n: string, e: string[]) {
  //   this.id = id
  //   this.name = n
  //   this.employees = e 
  // }

  // Shorthand initialization

  constructor(private id: number, private name: string, private employees: string[]) {

  }

  describe(this: Department) {
    console.log(`Department (id: ${this.id}) ${this.name}, employees: ${this.employees}`)
  } 

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInfo() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

const accounting = new Department(3, 'Accounting', ['maa', 'lii', 'ee'])  

accounting.addEmployee('Lee')
accounting.addEmployee('Max')

accounting.describe()
accounting.printEmployeeInfo()


