class Department {

  protected employees: string[] = [] 
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

class Accounting extends Department {

  // Setters (creating aproperty) & Getters (reading a property)  
  private newestAuditor: string

  // 'newestAuditor' cannot be accessed directly used outside class as it is private but with getter it is (indirectly) possible
  get latestAuditor() {
    if(this.newestAuditor) {
      return this.newestAuditor // getter must always return something
    }
    throw new Error('No auditors listed.')
  }

  set latestAuditor(value: string) {
    if(!value) {
      throw new Error('Add auditor')
    }
    this.addInternalAuditor(value)
  }
  
  internalAuditors: string[]
  constructor(id: string, name: string, internalAuditors: string[]) {
    super(id, name)
    this.internalAuditors = internalAuditors
    this.newestAuditor = internalAuditors[0]
  }

  addEmployee(name: string) {
    if(name === 'Lissu') {
      return
    }
    this.employees.push(name)
  }

  addInternalAuditor = (auditor: string) => {
    this.internalAuditors.push(auditor)
    this.newestAuditor = auditor
  }

  listInternalAuditors() {
    console.log(this.internalAuditors)
  }
}

const accountingDepart = new Accounting('d3', 'Accounting', [])
accountingDepart.addInternalAuditor('Sara')
accountingDepart.addInternalAuditor('Mikke')
accountingDepart.listInternalAuditors()
accountingDepart.addEmployee('Sisu') 
console.log(accountingDepart)
accountingDepart.latestAuditor= 'Vili' // using setter
console.log(accountingDepart.latestAuditor) // using getter



