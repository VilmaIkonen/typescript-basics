let dogArray = [
    { type: 'dog', name: 'RuffRuff', age: 4, weight: 20, microChipped: true, spayedOrNeutered: true, breed: 'labradorian', sporty: true, bark() { return 'wuf'; } },
    { type: 'dog', name: 'Haukku', age: 0, weight: 7, microChipped: true, spayedOrNeutered: false, breed: 'german sheppard', sporty: true, bark() { return 'bowwow'; } },
    { type: 'dog', name: 'Lady', age: 10, weight: 3, microChipped: true, spayedOrNeutered: true, breed: 'chihuahua', sporty: false, bark() { return 'yapyap'; } },
    { type: 'dog', name: 'Nelli', age: 2, weight: 5, microChipped: true, spayedOrNeutered: false, breed: 'russian tsvetnaya bolonka', sporty: false, bark() { return 'wufff'; } }
];
const adopt = (subject) => {
    console.log(`We adopted ${subject.name}, it is ${subject.age} years old. It is ${subject.sporty ? 'sporty' : 'not sporty'}. When happy, it says "${subject.bark()}"`);
};
adopt(dogArray[0]);
adopt(dogArray[2]);
console.log('################');
// ############### //
dogArray.forEach(adopt);
console.log('################');
let catArray = [
    { type: 'cat', name: 'Miisu', age: 7, weight: 4, microChipped: false, spayedOrNeutered: true, breed: 'seroki', purr() { return 'hurrrr'; } },
    { type: 'cat', name: 'Katti', age: 1, weight: 2, microChipped: true, spayedOrNeutered: false, breed: 'persian', purr() { return 'purrrr'; } },
    { type: 'cat', name: 'Fluffy', age: 2, weight: 5, microChipped: true, spayedOrNeutered: true, breed: 'norwegian forest cat', purr() { return 'kurrrr'; } },
];
console.log(catArray[0].purr());
console.log('################');
let petArray = [...dogArray, ...catArray];
// let petArray: Array<Dog | Cat> = [...dogArray, ...catArray];
console.log(petArray);
const isDog = (petArray) => Boolean(petArray.type === 'dog');
const isCat = (petArray) => Boolean(petArray.type === 'cat');
petArray.forEach((pet) => {
    if (isDog(pet)) {
        console.log(`We adopted ${name}, it is ${age} years old. It is ${sporty ? 'sporty' : 'not sporty'}. When happy, it says "${bark()}"`);
    }
    else {
        console.log(`We adopted ${name} and when I pet it, it says ${purr()}`);
    }
});
