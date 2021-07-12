interface Bird { 
  type: 'bird' // must be of this exact string value (could also use eg. "kind: 'bird'")
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) { // could be checked also with type guard 'in'. 'instanceof' will not work with interfaces
  let speed
  switch(animal.type) {    
    case 'horse': 
      speed = animal.runningSpeed
      break
    case 'bird':
      speed = animal.flyingSpeed
  }
  console.log('I am a ' + animal.type + ' and I move at speed ' + speed + ' km/h')
}

moveAnimal({type: 'bird', flyingSpeed: 10})
moveAnimal({type: 'horse', runningSpeed: 30})