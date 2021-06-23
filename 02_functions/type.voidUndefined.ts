function add (n1: number, n2: number) {
  return n1 + n2
}

function printResult(num: number): void { // void: function does not return anything (technically returns 'undefined')
  console.log('Result ' + num)
}

printResult(add(5, 12))

function printResult2(num: number): undefined { // undefined: function has return statement, but does not return a value
  console.log('Result ' + num)
  return 
}
