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


// **** Start base class for all states **** //

type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = [] // array of function references. Whenever something changes, eg. in addProject, all listenerFunctions are called. "protected": can be accessed frominheriting classes unike "private".

  addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction)
  }
}
//  **** End 'State' class ****

//  **** Start 'ProjectState' class and state management: manages app state and listens to changes (in similar way as in React) **** 

class ProjectState extends State<Project>{
  
  private projects: Project[] = []
  private static instance: ProjectState

  // singleton class (a class that can have only one object (an instance of the class) at a time)
  private constructor() {
    super()
  }

  static getInstance() {
    if(this.instance) {
      return this.instance
    } else {
      this.instance = new ProjectState()
      return this.instance
    }
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

// **** Start Validator ****
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

// **** Start Auto bind decorator ****
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

//  **** Start 'Component' class: base class to hold common properties and methods in other classes ****

// generic class, details can be modified in inheriting classes
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T // can be of any HTML elem. type
  element: U // element that will be rendered, can be of any HTML elem. type

  constructor(templateId: string, hostElementId: string, 
    insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElementId)! as T  

    const importedHTMLContent = document.importNode(this.templateElement.content, true)   
    this.element = importedHTMLContent.firstElementChild as U   

    // as newElementId? is optional, need to check in runtime
    if(newElementId) {
      this.element.id = newElementId // add ids dynamically for 'active' and 'finished' projects
    }
    
    this.attach(insertAtStart)
  }

  private attach(insertAtBeginning: boolean) {
    // Insert ('where in DOM', 'what')
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
  }

  abstract configure(): void
  abstract renderContent(): void
}
//  **** End 'Component' class ****

//  **** Start 'ProjectList' class: responsible for rendering a list of projects ****
class ProjectList extends Component<HTMLDivElement, HTMLElement> { 
  registeredProjects: Project[]

  // Access to <template> (holds the content) and <div id='app'> (holds reference to element where template content will be rendered)
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}`)
    this.registeredProjects = []
    this.configure()
    this.renderContent()    
  }

  configure() {
    // listener function from project global state (state change --> 'projects' overrided to 'registeredProjects'):
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if(this.type === 'active') {
         return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
      })
      this.registeredProjects = relevantProjects
      this.renderProjects()
    })
  }

  renderContent() {
    // ad id to <ul>:
    const listId = `${this.type}-list`
    this.element.querySelector('ul')!.id = listId // here 'element' = <section>
    // set text content for <h2>:
    const header2 = 'Projects'
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' ' + header2.toUpperCase() 
  }

  private renderProjects() {
    const listElement = document.getElementById(`${this.type}-list`)! as HTMLUListElement
    listElement.innerHTML = '' // clear list items before rendering to avoid duplicate list items
    // render all the projects:
    for(const projectItem of this.registeredProjects) {
      const listItem = document.createElement('li')
      listItem.textContent = projectItem.title
      listElement?.appendChild(listItem)
    }
  }
}
//  **** End 'ProjectList' class ****

//  **** Start 'ProjectInput' class: responsible for rendering the form and gathering the user input ****
class ProjectInput extends Component <HTMLDivElement, HTMLFormElement>{
  titleInputElement: HTMLInputElement
  descInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  // DOM selection logic and rough setup in constructor:
  constructor () {
    super('project-input', 'app', true, 'user-input')

    // Access to input elements:
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler) 
    /* If not using @AutoBind and when console.log(this)in submitHandler --> 
    ProjectInput {templateElement: template#project-input, hostElement: div#app, element: form#user-input, titleInputElement: input#title, descInputElement: textarea#description, …}
    
    If usign code: this.element.addEventListener('submit', this.submitHandler) --> wrong output and reference --> <form id="user-input">…</form>
    --> titleInputElement.value will result in reference error
    */
  }

  renderContent() {}

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
      projectState.addProject(title, desc, people) // creating/ adding project based on user input
      this.clearInputs()
    }  
  }  
}
//  **** End 'ProjectInput' class **** 

// Instatiation of classes:
const projectInput = new ProjectInput()
const activeProjectList = new ProjectList('active')
const finishedProjectList = new ProjectList('finished')