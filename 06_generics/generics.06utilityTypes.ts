// Two examples of build-in utility types

/* 'Partial' makes all properties in CourseGoal optional, change temporarily the object type. 
(Eventually will be assigned as 'CourseGoal') */
interface CourseGoal {
  title: string
  desc: string
  completeUntil: Date
}

function createCourseGoal(title: string, desc: string, date: Date): CourseGoal {  
    let courseGoal: Partial<CourseGoal> = {} 
    courseGoal.title = title
    courseGoal.desc = desc
    courseGoal.completeUntil = date

    // return courseGoal // does not work as is of type 'Partial<CourseGoal>'
    return courseGoal as CourseGoal // OK with type casting
}

console.log(createCourseGoal('TS Basics', 'Gain basic understanding of TS', new Date()))

/* Readonly: protecting a type */

const names: Readonly<string[]> = ['Kaino', 'Vieno'] // 'locked' array
// names.pop()
// console.log(names)