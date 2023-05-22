const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = ({partAndExercises}) => {
  return (
    <div>
      <Part part={partAndExercises[0]} exercise={partAndExercises[1]}/>
      <Part part={partAndExercises[2]} exercise={partAndExercises[3]}/>
      <Part part={partAndExercises[4]} exercise={partAndExercises[5]}/>
    </div>
  )
}

const Total = ({total}) => {
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/> 
      <Content partAndExercises={[part1, exercises1, part2, exercises2, part3, exercises3]}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App