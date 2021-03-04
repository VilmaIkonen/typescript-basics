class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
// compareName expects a paramater of a type Person and will return a boolean value (is target person(otherName) equal to current person name(this.name)))
  compareName(otherName: Person): boolean {
    return this.name === otherName.getName(); // 'otherName' is the instance of Person, therefore has also getName() method available
  }  
}

// ****************************************************** //

class PersonAddress extends Person {
  address: string;

  constructor(name: string, address: string, age: number) {
    // eg. console.log can be called before super, but 'this' cannot!
    super(name, age);
    this.address = address;
  }

  getAddress():string {
    return this.address
  }

  sameHousehold(otherName: PersonAddress) {
    return this.compareName(otherName) && this.address === otherName.getAddress(); // name and address comparisons are available here as otherName is based on PersonAddress (getAddress())which includes Person getName())
  }
}

// ****************************************************** //

const newPerson = new PersonAddress('Harry', '4 Privet Drive', 29); // Properties must in same order as in classes, otherwise error is thrown
console.log(newPerson.getName()) // PersonAddress inherits getName() from parent Person and is valid method here.

const harry = new Person('harry', 15);
const dudleyAddr = new PersonAddress('Dudley', '4 Privet Drive', 15);

// valid or invalid?
console.log(harry.getAddress()) // not valid: getAddress() does not exist on type 'Person'
console.log(dudleyAddr.getName()) // valid: DudleyAddr is an instance of Person, which has getName() method
console.log(harry.compareName(dudleyAddr)) // valid: harry is Person that has compareName() method
console.log(dudleyAddr.compareName(harry)) // valid: dudleyAddr is PersonAddress that inherits all from Person, also compareName()
console.log(dudleyAddr.sameHousehold(harry)) // invalid: comparing type Person, ie 'harry' to type PersonAddress, which a subtype, does not work. Subtypes (here personAddress) have unique features that the parent (here Person) does not have

// ****************************************************** //

class C {
  x: number;

  constructor(num1: number) {
    this.x = num1;
  }
}

class D extends C {

  y: number;

  constructor(num1: number, num2: number) {
    super(num1);
    this.y = num2;
  }

  increment() {}
}


// ************ getters, setters ****************** //

class Human {
  private _name: string // Private field names have _undescore infront of the name if they are to be used in getters/setters (ts convention)
  private _age: number

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  getName(): string {
    return this._name;
  }
  getAge(): number {
    return this._age;
  }

  setName(newName: string): void {
    if (newName.indexOf(' ') > -1 && newName.length <30) {
      this._name = newName;
    }
  }
  setAge(newAge: number):void {
    if (newAge > 0) {
      this._age = newAge;
    }
  }
}

const harry2 = new Human('harry2', 17);
console.log(harry2.getName()) // --> 

harry2.setAge(-100);
console.log(harry2.getAge() // --> 17, new age will not be set as the condition is not fulfilled
harry2.setAge(18);
console.log(harry2.getAge()) // --> 18, new age is set as the condition is fulfilled

// ************ getters, setters, TS way ****************** //

class Human2 {
  private _name: string // Private field names have _undescore infront of the name (ts convention)
  private _age: number

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  get name(): string {
    return this._name;
  }
  get age(): number {
    return this._age;
  }

  set name(newName: string){
    if (newName.indexOf(' ') > -1 && newName.length <30) {
      this._name = newName;
    }
  }
  set age(newAge: number) {
    if (newAge > 0) {
      this._age = newAge;
    }
  }
}

const harry3 = new Human2('harry3', 17);
console.log(harry3.name) // --> 

harry3.age = -100;
console.log(harry3.age) // --> 17, new age will not be set as the condition is not fulfilled
harry3.age =18;
console.log(harry3.age) // --> 18, new age is set as the condition is fulfilled

// ************ Abstract class ****************** //
// Abstract class is incomplete, created to be completed by other classes. Abstract class can define which properties or methods the subclass should have.

abstract class AbstractHuman { 
  constructor(
    private _name: string,
    private _age: number
  ) {}

  get name() {
    return this._name;
  }

  get age() {
    return this._age;
  }

  abstract address: string;
  
  abstract move(): void // abstract class can have abstract methods or properties. Note the syntax in method: This is incorrect 'abstract move:() => void'
}

class ActualHuman extends AbstractHuman {

  address: string = '';

  constructor(name: string, age: number) {
    super(name, age);
  }

  move() {
    console.log('I am moving')
  }
}

const newHuman = new ActualHuman('Harry', 89);