const person1 = {
  name:  'Vilma',
  age: 43,
  hobbies: ['jogging', 'gym', 'knitting']
}

let favoriteActivity: string[]
favoriteActivity= ['sports']

console.log(person1.hobbies[0])

for(const hobby of person1.hobbies) {
  console.log(hobby.toUpperCase())
  // console.log(hobby.map()) --> error: Property 'map' does not exist on type 'string'
}