// Type casting, option 1 with '<>'
const userInputElement = <HTMLInputElement>document.getElementById('userInput')! // '!' = 'not null', <> telling ts that the type of HTML element is 'input'

userInputElement.value = 'Hi there!'

// Type casting, option 2 with 'as'
const userInputElement2 = document.getElementById('userInput')! as HTMLInputElement

// Type casting, option 2 with 'as' w/o '!'
const userInputElement3 = document.getElementById('userInput')
if(userInputElement) {
  (userInputElement3 as HTMLInputElement).value = 'Hi there!'
}