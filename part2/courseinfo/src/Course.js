const Header = ({name}) => {
  return <h2>{name}</h2>
}

const Content = ({parts}) => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Sum = ({parts}) => {
  const totalExercise = (acc, curr) => {
    return curr.exercises + acc
  }
  
  const sum = parts.reduce(totalExercise, 0)

  return (
    <b>total of {sum} exercises</b>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Sum parts={course.parts}/>
    </>
  )
}

export default Course