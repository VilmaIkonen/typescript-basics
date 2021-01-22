interface Pet {
  name: string,
  age: number,
  weight: number,
  height?: number,
  microChipped: boolean,
  spayedOrNeutered: boolean,
  breed: string
}

interface Dog extends Pet {
  sporty: boolean,
  bark? (): void
}

let dogArray: Dog[] = [
  { name: 'RuffRuff', age: 4, weight: 20, microChipped: true, spayedOrNeutered: true, breed: 'labradorian', sporty: true, bark: () => {} },
  { name: 'Haukku', age: 0, weight: 7, microChipped: true, spayedOrNeutered: false, breed: 'german sheppard', sporty: true, bark: () => {}  },
  { name: 'Lady', age: 10, weight: 3, microChipped: true, spayedOrNeutered: true, breed: 'chihuahua', sporty: false, bark: () => {}  },
  { name: 'Nelli', age: 2, weight: 5, microChipped: true, spayedOrNeutered: false, breed: 'russian tsvetnaya bolonka', sporty: false, bark: () => {} }
]

function adopt(pet: Dog) {
  const name: string = pet.name;
  const age: number = pet.age;
  const weight: number = pet.weight;
  const height: number = pet.height;
  const microChipped: boolean = pet.microChipped;
  const spayedOrNeutered: boolean = pet.spayedOrNeutered;
  const breed: string = pet.breed;
  const sporty: boolean = pet.sporty;
  const bark = pet.bark;

  // const sportyDog = (pet.sporty === true);
  // const nonSportyDog = (pet.sporty === false);

  console.log(`We adopted ${name}, it is ${age} years old. It is ${sporty ? 'sporty' : 'not sporty'}`);
}

adopt(dogArray[0]);
adopt(dogArray[2]);

console.log('################')
// ############### //

dogArray.forEach((dog) => {
  console.log(`We adopted ${dog.name}, it is ${dog.age} years old. It is ${dog.sporty ? 'sporty' : 'not sporty'}`);
})

console.log('################')
// ############### //

interface Cat extends Pet {
  purr? (): void
}

let catArray: Cat[] = [
  { name: 'Miisu', age: 7, weight: 4, microChipped: false, spayedOrNeutered: true, breed: 'seroki', purr: () => {console.log('murrr')} },
  { name: 'Katti', age: 1, weight: 2, microChipped: true, spayedOrNeutered: false, breed: 'persian', purr: () => {console.log('purrr')} },
  { name: 'Fluffy', age: 2, weight: 5, microChipped: true, spayedOrNeutered: true, breed: 'norwegian forest cat', purr: () => {console.log('kurrr')} },
]

console.log(catArray);

console.log('################')
// ############### //

interface Pets extends Dog, Cat {}

let petArray = [...dogArray, ...catArray];

console.log(petArray);

console.log('################')
// ############### //

function adoptCatOrDog(animal: Pets) {
  const name: string = animal.name;
  const age: number = animal.age;
  const weight: number = animal.weight;
  const height: number = animal.height;
  const microChipped: boolean = animal.microChipped;
  const spayedOrNeutered: boolean = animal.spayedOrNeutered;
  const breed: string = animal.breed;
  const sporty: boolean = animal.sporty;
  const bark = animal.bark;
  const purr = animal.purr

  console.log(`We adopted ${name}, it is ${age} years old.`);
}

adoptCatOrDog(petArray[0]);
adoptCatOrDog(petArray[6]);