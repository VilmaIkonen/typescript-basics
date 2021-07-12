// Intersection types: combine othertypes
type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

// Intersection type (intersecting type = 'string'). Same could be achieved w interfaces and 'extends'
type ElevatedEmployee = Admin & Employee

const employee1: ElevatedEmployee = {
  name: 'Lee',
  privileges: ['standard-user'],
  startDate: new Date()
}

type Combinable = string | number 
type Numeric = number | boolean

type Universal = Combinable & Numeric // type = 'number' as only intersection is 'number' type

