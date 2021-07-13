/* Generic types are connected to some other type and are flexible on what type of data is stored in it. */

// Generic build-in types (Array, Promise):

// Array type: 
//  const names: Array = [] // --> error
const ages: any[] = [] // OK
const heights: Array<number> = [] // OK
const data: Array<any> = [] // OK
const userInputs: Array<string | number | boolean> = [] // OK

// Promise type: new promise object created, type 'string'
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Ready!')
  }, 2000)
})

promise.then(data => {
  data.split(' ')
})
