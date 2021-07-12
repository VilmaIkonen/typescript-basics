// OPtional chaining: if not known whether an object has certain properties or not

const fetchedUserData = {
  id: 'u1',
  name: 'Alani',
  job: { title: 'CEO', description: 'IT  consultancy'}
}

// Optional chaining
console.log(fetchedUserData?.job?.title) // if 'fetchedUserData' exists, and if 'job' exists, only then access 'title'