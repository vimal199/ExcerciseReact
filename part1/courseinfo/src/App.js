
const Header = (props) => {
  console.log(props.course.name)
  return (
    <h1>{props.course.name}</h1>
  )
}
/*const Content = (props) => {
  return (
    <p>{props.part} {props.excercise} </p>
  )
}*/
const Content = (props) => {
  return (
    <>
      <p>{props.course.parts[0].name} {props.course.parts[0].excercise} </p>
      <p>{props.course.parts[1].name} {props.course.parts[1].excercise} </p>
      <p>{props.course.parts[2].name} {props.course.parts[2].excercise} </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p> Number of excercises {props.course.parts[0].excercise + props.course.parts[1].excercise + props.course.parts[2].excercise} </p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      excercise: 10
    },
    {
      name: 'Using props to pass data',
      excercise: 7
    },
    {
      name: 'State of a component',
      excercise: 14
    }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div >
  )
}
export default App;
