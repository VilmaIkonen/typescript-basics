function combine(input1: number | string, input2: number | string) {

  let result
  // runtime check often needed in union type as it is more flexible. Here needed otherwise '+' will cause error
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2
  } else {
    result = input1.toString()+ input2.toString()
  } return result 
}

const combinedAges = combine(30, 45)
console.log(combinedAges)

const combinedNames = combine('Max', 'Lee')
console.log(combinedNames)