type Admin = {
  name: string
  privileges: string[]
}
type Employee = {
  name: string
  startDate: Date
}
type ElevatedEmployee = Admin & Employee

const employee1: ElevatedEmployee = {
  name: 'Lee',
  privileges: ['standard-user'],
  startDate: new Date()
}

type Combinable = string | number 
type Numeric = number | boolean
type Universal = Combinable & Numeric 

// 'typeof' type guard
function add(a: Combinable, b: Combinable) {
  // return a + b does not work, need to do runtime check

  if(typeof a === 'string' || typeof b === 'string') { 
    return a.toString + b.toString()
  } 
  return a + b
}

// 'in' type guard. 
type UnknownEmployee = Employee | Admin

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log('name: '+ emp.name)

  if('privileges' in emp) { // Check if property 'priviliges' exists in 'emp'
    console.log('privileges: ' + emp.privileges)
  }
  if('startDate' in emp) { 
    console.log('start date: ' + emp.startDate)
  }
}

printEmployeeInfo(employee1) // -->  name: 'Lee', privileges: ['standard-user'],startDate: 'new Date()'
printEmployeeInfo({name: 'Suvi', startDate: new Date()}) // --> name: 'Suvi', start date: 'new Date'

// 'instance of' type guard
class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }
  loadCargo(amount: number) {
    console.log('Loading cargo, amount: ' + amount + ' kg')
  }
}

type Vehicle = Car | Truck

const vehicle1 = new Car()
const vehicle2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()

  if(vehicle instanceof Truck) { // if 'vehicle' is instance of 'Truck', it will have method 'loadCargo'
    vehicle.loadCargo(1000)
  }
}

useVehicle(vehicle1)
useVehicle(vehicle2)


