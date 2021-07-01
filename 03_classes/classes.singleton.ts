abstract class Department {

    protected employees: string[] = [] 

    constructor(protected readonly id: string, public name: string) {}

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
  
	// The singleton pattern: a way to structure code so that one can have only one instance of code logic
  class Accounting extends Department {
    private internalAuditors: string[]
    private static instance: Accounting // 'instance' stores an 'Accounting' instance
    
		// Private constructor will ensure that the class is only accessible within the class
    private constructor(id: string, name: string, internalAuditors: string[]) {
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

		// static method can be called on the class itself
		// below method will ensure that the class is instantiated only once (if it already exists, return the class, if not, created one)
    static getInstance() {
			if(this.instance) {
				return this.instance
			}
			// or:
			/* 	if(Accounting.instance) {
				return Accounting.instance
			} */
    	this.instance = new Accounting('d3', 'Accounting', ['Lee', 'Sim'])
			return this.instance
    }
  }
  
  const ITDepart = new ITDepartment('d2', 'IT', ['Minna', 'Heikki'])
  ITDepart.addEmployee('Minna')
  ITDepart.addEmployee('Heikki')
  ITDepart.printEmployeeInfo()
  ITDepart.describe()
  console.log(ITDepart)
  
	// Will not work as the constructor is private, ie accessible only from within the class
	//  const accountingDepart = new Accounting('d3', 'Accounting', ['Lee', 'Sim'])

	// Must be called like this:
	const accountingDepart = Accounting.getInstance()
  accountingDepart.addInternalAuditor('Sara')
  accountingDepart.listInternalAuditors()
  accountingDepart.addEmployee('Lissu') // will fail
  accountingDepart.addEmployee('Sisu') // will be added
  accountingDepart.describe()
  console.log(accountingDepart)

  
  
  
  