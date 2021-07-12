// Interface descripes structure of an object (only name of the type)
interface Named {
	readonly name: string
}

interface Greetable extends Named { // Could also inherit more interfaces unlike classes
	greet(phrase: string): void
}

interface DefineAge {
	age: number
	printAge(phrase: string): void
}

// Class can implement several interfaces (but can only extend on class)
class Person implements Greetable, DefineAge {
	name: string
	age: number
	city = 'Helsinki'

	// properties from interfaces:
	constructor(n: string, a: number) {
		this.name = n
		this.age = a
	}

	// methods from interfaces:
	greet(phrase: string) {
		console.log(phrase + ' ' + this.name)  // return nothing as method type = void
	}

	printAge(phrase: string) {
		console.log(phrase + ' ' + this.age + ' years old')
	}
}

const user1 = new Person('Matt', 30)
user1.greet('Hi, my name is')
user1.printAge('I am')
console.log(user1) // --> Person {city: "Helsinki", name: "Matt", age: 30}