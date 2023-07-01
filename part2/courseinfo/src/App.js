const Course = (props) => {
  let sum = 0
  console.log('array', props.course.parts);
  const total = props.course.parts.reduce(
    (sum, curr) => {
      console.log('iteration', curr);
      return curr.exercises + sum
    }, sum
  )
  return (
    <div>
      <h1>{props.course.name}</h1>

      {props.course.parts.map((course) =>
        <p key={course.id}> {course.name}</p>

      )}
      <h3>
        total of {total} excercise
      </h3>

    </div >
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}
export default App;
