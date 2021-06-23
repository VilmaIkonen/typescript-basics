enum Role {ADMIN, READ_ONLY, AUTHOR}

// can also assign own no. identifiers (READ_ONLY --> 6, AUTHOR --> 7):
// enum Role {ADMIN = 5, READ_ONLY, AUTHOR}

// enum Role {ADMIN = 5, READ_ONLY = 100, AUTHOR = 200}
const person3 = {
  name:  'Vilma',
  age: 43,
  hobbies: ['jogging', 'gym', 'knitting'],
  role: Role.ADMIN
}

console.log(person3.role)