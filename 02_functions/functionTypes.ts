function add (n1: number, n2: number) {
  return n1 + n2
}

function printResult(num: number): void {
  console.log('Result is ' + num)
}

printResult(add(5, 12))

let combineValues: (a: number, b: number) => number // combineValues stores and accepts a function with two parameters (both must be numbers) and returns a number

combineValues = add
// combineValues= printResult // gives error as this function takes one parameter and return nothing

console.log(combineValues(8, 8))