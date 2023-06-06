const Header = ({ courses }) => <h1>{courses.name}</h1>

const Content = ({ courses }) => (
  <div>
    {courses.parts.map((course) => (
      <Part key={course.name} course={course} />
    ))}
  </div>
)

const Part = ({ course }) => (
  <p>
    {course.name} {course.exercise}
  </p>
)

const Total = ({ courses }) => <p>Number of exercises {courses.parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>

const App = () => {
  const courses = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header courses={courses} />
      <Content courses={courses} />
      <Total courses={courses} />
    </div>
  )
}

export default App
