// unknown

let userInput: unknown
let userName : string

userInput = 5
userInput = 'string'
userInput = true

// runtime check needed with unknown type if userIput is assigned to another variable. 
if(typeof userInput === 'string') {
  userName = userInput
}

// userName = userInput // --> error. If type unknown --> any --> no error

// never
// as function only throws error, stops the scripts, function never returns anything
function generateError(message: string, code: number): never {
  throw{message: message, errorCde: code}
  // while (true) {} this would also never return as causes infinite loop
}

generateError('An error occured', 500)