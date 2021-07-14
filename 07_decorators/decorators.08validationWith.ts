// Validation with decorators

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // eg. ['required', 'OK']))
  }
}

const registeredValidators: ValidatorConfig = {}

// Property decorator:
function TitleRequired (target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [...registeredValidators[target.constructor.name][propertyName], 'required']
  }   
}
// Property decorator:
function PositiveNumber (target:any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [...registeredValidators[target.constructor.name][propertyName], 'positive']
  }
}

// Will go through all registered validators and run different logic based on which validators it finds
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if(!objValidatorConfig) {
    return true
  }
  let isValid = true;
  for(const prop in objValidatorConfig) { // access to all prop. names for which there are validators
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break; // '!!' --> cast variable to boolean value
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }    
  } 
  return isValid
}

class Course {
  @TitleRequired
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {    
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!

courseForm.addEventListener('submit', event => {
  event.preventDefault()

  const titleElement = document.getElementById('title') as HTMLInputElement
  const priceElement = document.getElementById('price') as HTMLInputElement

  const title = titleElement.value
  const price = +priceElement.value

  const createdCourse = new Course(title, price) 

  if(!validate(createdCourse)) {
    alert('Invalid input')
    return
  }

  console.log(createdCourse)
})

/* check https://github.com/typestack/class-validator */
