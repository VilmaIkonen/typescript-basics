const person2: {
  name: string,
  age: number,
  nickname: string,
  hobbies: string [], // array type
  role: [number, string] // tuple type
} = {
  name:  'Vilma',
  age: 43,
  nickname: 'Wilma',
  hobbies: ['jogging', 'gym', 'knitting'],
  role: [2, 'student']
}

let favoriteActivity1: string[]
favoriteActivity1= ['sports']

console.log(person2.hobbies[0])
console.log(person2.role)

for(const hobby of person2.hobbies) {
  console.log(hobby.toUpperCase())
  // console.log(hobby.map()) --> error: Property 'map' does not exist on type 'string'
}