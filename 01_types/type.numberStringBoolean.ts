function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  // if (typeof number1 !== 'number') {
  //   throw new  Error ('Incorrect input type')
  // }
  let result = n1 + n2
  if (showResult) {
    console.log(phrase + result)
  } else {
    return result
  }  
}

const number1 = 5
const number2 = 2.8
const printResult = true
const resultPhrase = 'result is: '

add (number1, number2, printResult, resultPhrase)