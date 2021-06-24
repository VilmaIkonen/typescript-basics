class Department {

  protected employees: string[] = [] // 'proteted': available in base and inheriting classes. 'Private' onl available in the class where declared
  constructor(private readonly id: string, public name: string) {}

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

// Inheritance:
class ITDepartment extends Department {
  admins: string[]
  constructor(id: string, name: string, admins: string[]) {
    super(id, name) // calls the constructor of the base class
    this.admins = admins // 'this' must be always used after 'super' in the inheriting class
  }
}

// Inheritance:
class Accounting extends Department {
  internalAuditors: string[]
  constructor(id: string, name: string, internalAuditors: string[]) {
    super(id, name)
    this.internalAuditors = internalAuditors
  }

  // overriding base class property:
  addEmployee(name: string) {
    if(name === 'Lissu') {
      return
    }
    this.employees.push(name)
  }

  addInternalAuditor = (auditor: string) => {
    this.internalAuditors.push(auditor)
  }

  listInternalAuditors() {
    console.log(this.internalAuditors)
  }
}

const ITDepart = new ITDepartment('d2', 'IT', ['Minna', 'Heikki'])
ITDepart.addEmployee('Minna')
ITDepart.addEmployee('Heikki')
ITDepart.printEmployeeInfo()
console.log(ITDepart)

const accountingDepart = new Accounting('d3', 'Accounting', ['Lee', 'Sim'])
accountingDepart.addInternalAuditor('Sara')
accountingDepart.listInternalAuditors()
accountingDepart.addEmployee('Lissu') // will fail
accountingDepart.addEmployee('Sisu') // will be added
console.log(accountingDepart)



