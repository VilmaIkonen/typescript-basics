abstract class Department {

    protected employees: string[] = [] 

    constructor(protected readonly id: string, public name: string) {}

    // When one cannot provide a default implementation for inheriting classes, but want to enforce that the method exists, use 'abstract'. Inheriting classes will/must provide their own implementation for the method. If one method is marked 'abstract, the whole class needs to be marked 'abstract'
    abstract describe(this: Department): void 
  
    addEmployee(employee: string) {
      this.employees.push(employee)
    }
  
    printEmployeeInfo() {
      console.log(this.employees.length)
      console.log(this.employees)
    }
  }
  
  class ITDepartment extends Department {
    admins: string[]
    constructor(id: string, name: string, admins: string[]) {
      super(id, name) 
      this.admins = admins 
    }

    describe() {
      console.log('The IT department printout...')
    }
  }
  
  class Accounting extends Department {
    internalAuditors: string[]
    
    constructor(id: string, name: string, internalAuditors: string[]) {
      super(id, name)
      this.internalAuditors = internalAuditors
    }

    describe() {
      console.log(`Accounting department, id: ${this.id}`)
    }
  
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
  ITDepart.describe()
  console.log(ITDepart)
  
  const accountingDepart = new Accounting('d3', 'Accounting', ['Lee', 'Sim'])
  accountingDepart.addInternalAuditor('Sara')
  accountingDepart.listInternalAuditors()
  accountingDepart.addEmployee('Lissu') // will fail
  accountingDepart.addEmployee('Sisu') // will be added
  accountingDepart.describe()
  console.log(accountingDepart)

  
  
  
  