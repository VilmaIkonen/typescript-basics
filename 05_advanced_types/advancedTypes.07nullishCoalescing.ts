const fetchedUserData = {
  id: 'u1',
  name: 'Alani',
  job: { title: 'CEO', description: 'IT  consultancy'}
}

console.log(fetchedUserData?.job?.title) 

const userInput = ''
const storedData = userInput ?? 'DEFAULT' // '??' = nullish coalescing operator: if userInput is null or undefined --> use 'DEFAULT'. If it is anything else (eg. '') --> use that value

console.log(storedData)