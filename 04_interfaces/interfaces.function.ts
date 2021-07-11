// Defining function type. Can be done also with interface:
// type AddFunction = (a: number, b: number) => number

interface AddFunction {
  (a: number, b: number): number
}

let add: AddFunction

add = (n1: number, n2: number) => {
  return n1 + n2
}

interface Named {
	readonly name: string
}

interface Greetable extends Named { 
	greet(phrase: string): void
}

interface DefineAge {
	age: number
	printAge(phrase: string): void
}

class Person implements Greetable, DefineAge {
	name: string
	age: number
	city = 'Helsinki'

	constructor(n: string, a: number) {
		this.name = n
		this.age = a
	}

	greet(phrase: string) {
		console.log(phrase + ' ' + this.name) 
	}

	printAge(phrase: string) {
		console.log(phrase + ' ' + this.age + ' years old')
	}
}

const user1 = new Person('Matt', 30)
user1.greet('Hi, my name is')
user1.printAge('I am')
console.log(user1) // --> Person {city: "Helsinki", name: "Matt", age: 30}