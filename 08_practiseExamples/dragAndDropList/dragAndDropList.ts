// This demo app will be later split into multiple files

//  **** Start 'Project' class: project object structure / custom type **** 
enum ProjectStatus { Active, Finished }

class Project { 

  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public people: number,
    public status: ProjectStatus
    ) {}
}
//  **** End 'Project' class ****

//  **** Start 'ProjectState' class and state management: manages app state and listens to changes (in similar way as in React) **** 
type Listener = (items: Project[]) => void

class ProjectState {
  private listeners: Listener[] = [] // array of function references. Whenever something changes, eg. in addProject, all listenerFunctions are called
  private projects: Project[] = []
  private static instance: ProjectState

  // singleton class (a class that can have only one object (an instance of the class) at a time)
  private constructor() {}

  static getInstance() {
    if(this.instance) {
      return this.instance
    } else {
      this.instance = new ProjectState()
      return this.instance
    }
  }

  addListener(listenerFunction: Listener) {
    this.listeners.push(listenerFunction)
  }

  // add project on button click
  addProject(title: string, desc: string, numOfPeople: number) {
    const newProject = new Project(Math.random().toString(), title, desc,numOfPeople, ProjectStatus.Active)
    this.projects.push(newProject)
    // calling listener functions:
    for(const listenerFunction of this.listeners) {
      listenerFunction(this.projects.slice()) // .slice() --> use only copy of the array!
    }
  }
}
//  **** End 'ProjectState' class ****

const projectState = ProjectState.getInstance() // globally available, guaranteed to have only one object of this type in whole application 

// **** Start Validator: ****
interface Validatable { // Definition for validatable object and it's properties:
  value: string | number
  required: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate(validatableInput: Validatable) {
  let isValid = true

  if(validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length >0
  }
  if(validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid =isValid && validatableInput.value.length >= validatableInput.minLength
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
  }
  if(validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  if(validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }
  return isValid
}
// **** End Validator **** 

// **** Start Auto bind decorator: ****
function AutoBind (_target:any, _methodName: string, descriptor: PropertyDescriptor) {
  
  const originalMethod = descriptor.value // access to original method
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this)
      return boundFunction
    }
  }
  return adjustedDescriptor
}
// **** End Auto bind decorator **** 

//  **** Start 'ProjectList' class: responsible for rendering a list of projects ****
class ProjectList {

  // Needed fields:
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLElement // element that will be rendered
  registeredProjects: Project[]

  // Access to <template> (holds the content) and <div id='app'> (holds reference to element where template content will be rendered)
  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement
    this.hostElement = document.getElementById('app')! as HTMLDivElement
    this.registeredProjects = []
    
    // Contains pointer to template element .content (reference to code between 'template' tags). 'True' --> deepclone, ie all levels of nesting in template included
    const importedHTMLContent = document.importNode(this.templateElement.content, true)
    this.element = importedHTMLContent.firstElementChild as HTMLElement
    this.element.id = `${this.type}`// add ids dynamically for active and finished projects

    // listener function from project global state (state change --> 'projects' overrided to 'registeredProjects'):
    projectState?.addListener((projects: Project[]) => {
      this.registeredProjects = projects
      this.renderProjects()
    })

    this.attach()
    this.renderContent()    
  }

  private renderProjects() {
    const listElement = document.getElementById(`${this.type}-list`)
    // render all the projects:
    for(const projectItem of this.registeredProjects) {
      const listItem = document.createElement('li')
      listItem.textContent = projectItem.title
      listElement?.appendChild(listItem)
    }
  }

  private renderContent() {
    // ad id to <ul>:
    const listId = `${this.type}-list`
    this.element.querySelector('ul')!.id = listId // here 'element' = <section>
    // set text content for <h2>:
    const header2 = 'Projects'
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' ' + header2.toUpperCase()
 
  }

  // Rendering logic:
  private attach() {
    // Insert ('where in DOM', 'what')
    this.hostElement.insertAdjacentElement('beforeend', this.element)
  }
}
//  **** End 'ProjectList' class ****

//  **** Start 'ProjectInput' class: responsible for rendering the form and gathering the user input ****
class ProjectInput {

  // Needed fields:
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  // DOM selection logic and rough setup in constructor:
  constructor () {
    // Access to <template> (holds the content) and <div id='app'> (holds reference to element where template content will be rendered)
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement  
    this.hostElement = document.getElementById('app')! as HTMLDivElement

    // Contains pointer to template element .content (reference to code between 'template' tags). 'True' --> deepclone, ie all levels of nesting in template included
    const importedHTMLContent = document.importNode(this.templateElement.content, true)
    this.element = importedHTMLContent.firstElementChild as HTMLFormElement
    this.element.id = 'user-input' // add id for selected form element

    // Access to input elements:
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
    this.attach()
  }

  // Access to input values + validation
  private gatherUserInput(): [string, string, number] | void { // method returns a tuple with 2 strings and a number or return nothing
    const enteredTitle = this.titleInputElement.value
    const enteredDesc = this.descInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validatable = {value: enteredTitle, required: true, minLength: 3, maxLength: 20}
    const descValidatable: Validatable = {value: enteredDesc, required: false, minLength: 5, maxLength: 200}
    const peopleValidatable: Validatable = {value: +enteredPeople, required: true, min: 1, max: 20}

    if(!validate(titleValidatable)) {
      alert('Title must contain 3-20 characters.')
      return // nothing      
    } 
    if(!validate(descValidatable)) {
      alert('Description length should be 5-200 characters.')
      return // nothing 
    } 
    if (!validate(peopleValidatable)) {
      alert('Number of people must be between 1-20')
      return // nothing 
    }
    else {
      return [enteredTitle, enteredDesc, +enteredPeople] // tuple
    }
  }

  private clearInputs() {  
    this.titleInputElement.value = ''
    this.descInputElement.value = ''
    this.peopleInputElement.value = ''    
  }

  // Event listener for the form:
  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()

    if(Array.isArray(userInput)) { // not possible to check if type is 'tuple', check if type is array
      const [title, desc, people] = userInput
      projectState?.addProject(title, desc, people) // creating/ adding project based on user input
      this.clearInputs()
    }  
  }  
  
  private configure() {
    this.element.addEventListener('submit', this.submitHandler) 
    /* If not using @AutoBind and when console.log(this)in submitHandler --> 
    ProjectInput {templateElement: template#project-input, hostElement: div#app, element: form#user-input, titleInputElement: input#title, descInputElement: textarea#description, …}
    
    If usign code: this.element.addEventListener('submit', this.submitHandler) --> wrong output and reference --> <form id="user-input">…</form>
    --> titleInputElement.value will result in reference error
    */
  }

  // Rendering logic:
  private attach() {
    // Insert ('where in DOM', 'what')
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}
//  **** End 'ProjectInput' class **** 

// Instatiation of classes:
const projectInput = new ProjectInput()
const activeProjectList = new ProjectList('active')
const finishedProjectList = new ProjectList('finished')