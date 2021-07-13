/* Restricting generic function types with type constraints with 'extends' + type. Can restrict only one and with eg. union type */

/* ***** Example 1 ***** */
function merge<T extends object, U extends object>(objA: T, objB: U) { 
  return Object.assign(objA, objB)
}

const mergedObj = merge({name: 'Helen', lastname: 'Smith'}, {age: 81, city: 'Toronto', hobbies: ['krav maga', 'gardening']}) 
console.log(mergedObj) 

/* ***** Example 2 ***** */
function extratAndConvert<T extends object, U extends keyof T>(obj: T, key: U) { // 1st parameter = anykind of object, 2nd parameter = key in 1st object 
  return 'Value is '+ obj[key]
}

console.log(extratAndConvert({name: 'Harry', age: 18}, 'age'))