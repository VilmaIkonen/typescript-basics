type Combinable = string | number 

// Function overloads: tell explicitly call and return types
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: string, b: number): string
function add(a: number, b: string): string

function add(a: Combinable, b: Combinable) {
  if(typeof a === 'string' || typeof b === 'string') { 
    return a.toString + b.toString()
  } 
  return a + b
}

// w/o type casting, does not work
// const result = add('Mary', 'Smith') 
// result.split(' ')

// with type casting ok, but not optimal
// const result = add('Mary', 'Smith') as string 
// result2.split(' ')

const result = add('Mary', 'Smith')
result.split(' ')

const result2 = add('Mary', 77)
result.split(' ')
