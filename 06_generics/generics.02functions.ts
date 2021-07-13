// Generic functions

/* function merge(objA: object, objB: object) {
  return Object.assign(objA, objB) // .assign 'merges' source objects
  }

const mergedObj = merge({name: 'Helen'}, {age: 81, city: 'Toronto'})
mergedObj.name // does not work

with type casting OK, but not ideal
const mergedObj = merge({name: 'Helen'}, {age: 81, city: 'Toronto'}) as {name: string, age: number, city: string}
mergedObj.name // OK */

/* ***** Example 1 ***** */
function merge<T, U>(objA: T, objB: U) { // T & U: telling TS that objA and objB might be of different types. 'T' as convention for type, next ones in alphabetic order. 
  return Object.assign(objA, objB) // Function returns an intersection of T & U.
}

const mergedObj = merge({name: 'Helen', lastname: 'Smith'}, {age: 81, city: 'Toronto', hobbies: ['krav maga', 'gardening']}) // mergedObj = intersection of two object types: T & U
console.log(mergedObj) // OK

/* ***** Example 2 ***** */
interface Length { // guarantees that there is an object with length property
  length: number
}
// also custom type would work:
// type Length = {
//   length: number 
// }

// '<T extends Length>' guarantees that 'length property is available for the function
function countAndDescribe<T extends Length>(element: T): [T, string] { // return type: tuple with generic 'T' + string
  let descrText = 'Got no value'
  if(element.length === 1) {
    descrText = 'Got 1 element'
  } else if (element.length > 1) {
    descrText = 'Got ' + element.length + ' elements' 
  }
  return [element, descrText]
}

console.log(countAndDescribe('Soon there!')) // --> ["Soon there!", "Got 11 elements"]
console.log(countAndDescribe(['h', 1])) // --> [Array(2), "Got 2 elements"]
// console.log(countAndDescribe(19)) --> does not work as number does not have length (from 'Length')