
const Header = (props) => {
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
      <p>{props.part[0]} {props.excercise[0]} </p>
      <p>{props.part[1]} {props.excercise[1]} </p>
      <p>{props.part[2]} {props.excercise[2]} </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p> Number of excercises {props.Total} </p>
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
  /*<Content part={part1} excercise={exercises1} />
        <Content part={part2} excercise={exercises2} />
        <Content part={part3} excercise={exercises3} />*/
  return (
    <div>
      <Header course={course} />
      <Content part={[part1, part2, part3]} excercise={[exercises1, exercises2, exercises3]}></Content>
      <Total Total={exercises1 + exercises2 + exercises3} />
    </div >
  )
}
export default App;
