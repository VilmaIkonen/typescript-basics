interface AddFunction {
  (a: number, b: number): number
}

let add: AddFunction

add = (n1: number, n2: number) => {
  return n1 + n2
}

interface Named {
	readonly name?: string, // property is optional 
  outputName?: string // property is optional 
}

interface Greetable extends Named { 
	greet(phrase: string): void
}

interface DefineAge {
	age: number
	printAge(phrase: string): void
}

class Person implements Greetable, DefineAge {
	name?: string // property is optional 
	age: number
	city = 'Helsinki'

	constructor(a: number, n?: string) {
		this.age = a

    if (n) {
      this.name = n // name will be set only if not falsy. OK as name is optional
    }		
	}

	greet(phrase: string) {
    if(this.name) {
      console.log(phrase + ' ' + this.name) 
    } else {
      console.log('Hi!')
    }
	}

	printAge(phrase: string) {
		console.log(phrase + ' ' + this.age + ' years old')
	}
}

const user1 = new Person(30) // new Person object can be set with only age as name is optional
user1.greet('Hi, my name is')
user1.printAge('I am')
console.log(user1)