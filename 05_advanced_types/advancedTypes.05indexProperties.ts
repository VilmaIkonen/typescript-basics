// Index properties:

// Objects later constructed based on interface must have properties of type 'string'
interface ErrorContainer {
  [prop: string]: string // property name and count is unknown, prop name must be string and the value must be a string
}

const errors: ErrorContainer = {
  1: 'Not a valid email',
  username: 'Must contain characters'
}