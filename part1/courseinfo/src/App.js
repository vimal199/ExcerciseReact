
const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
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
      <p>{props.Parts[0].name} {props.Parts[0].excercise} </p>
      <p>{props.Parts[1].name} {props.Parts[1].excercise} </p>
      <p>{props.Parts[2].name} {props.Parts[2].excercise} </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p> Number of excercises {props.Parts[0].excercise + props.Parts[1].excercise + props.Parts[2].excercise} </p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    excercise: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    excercise: 7
  }
  const part3 = {
    name: 'State of a component',
    excercise: 14
  }
  const Parts = [part1, part2, part3]
  /*<Content part={part1} excercise={exercises1} />
        <Content part={part2} excercise={exercises2} />
        <Content part={part3} excercise={exercises3} />*/
  return (
    <div>
      <Header course={course} />
      <Content Parts={Parts} />
      <Total Parts={Parts} />
    </div >
  )
}
export default App;
