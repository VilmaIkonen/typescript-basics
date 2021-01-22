var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var dogArray = [
    { name: 'RuffRuff', age: 4, weight: 20, microChipped: true, spayedOrNeutered: true, breed: 'labradorian', sporty: true, bark: function () { } },
    { name: 'Haukku', age: 0, weight: 7, microChipped: true, spayedOrNeutered: false, breed: 'german sheppard', sporty: true, bark: function () { } },
    { name: 'Lady', age: 10, weight: 3, microChipped: true, spayedOrNeutered: true, breed: 'chihuahua', sporty: false, bark: function () { } },
    { name: 'Nelli', age: 2, weight: 5, microChipped: true, spayedOrNeutered: false, breed: 'russian tsvetnaya bolonka', sporty: false, bark: function () { } }
];
function adopt(pet) {
    var name = pet.name;
    var age = pet.age;
    var weight = pet.weight;
    var height = pet.height;
    var microChipped = pet.microChipped;
    var spayedOrNeutered = pet.spayedOrNeutered;
    var breed = pet.breed;
    var sporty = pet.sporty;
    var bark = pet.bark;
    console.log("We adopted " + name + ", it is " + age + " years old.");
}
adopt(dogArray[0]);
adopt(dogArray[1]);
console.log('################');
// ############### //
dogArray.forEach(function (dog) {
    console.log("We adopted " + dog.name + ", it is " + dog.age + " years old.");
});
console.log('################');
var catArray = [
    { name: 'Miisu', age: 7, weight: 4, microChipped: false, spayedOrNeutered: true, breed: 'seroki', purr: function () { console.log('murrr'); } },
    { name: 'Katti', age: 1, weight: 2, microChipped: true, spayedOrNeutered: false, breed: 'persian', purr: function () { console.log('purrr'); } },
    { name: 'Fluffy', age: 2, weight: 5, microChipped: true, spayedOrNeutered: true, breed: 'norwegian forest cat', purr: function () { console.log('kurrr'); } },
];
console.log(catArray);
console.log('################');
var petArray = __spreadArrays(dogArray, catArray);
console.log(petArray);
console.log('################');
// ############### //
function adoptCatOrDog(animal) {
    var name = animal.name;
    var age = animal.age;
    var weight = animal.weight;
    var height = animal.height;
    var microChipped = animal.microChipped;
    var spayedOrNeutered = animal.spayedOrNeutered;
    var breed = animal.breed;
    var sporty = animal.sporty;
    var bark = animal.bark;
    var purr = animal.purr;
    console.log("We adopted " + name + ", it is " + age + " years old.");
}
adoptCatOrDog(petArray[0]);
adoptCatOrDog(petArray[6]);
