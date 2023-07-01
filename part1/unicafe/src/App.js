import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>

  )
}
const Statistics = (props) => {
  console.log(props.paramVal[0])
  return (
    <>
      <table>
        <StatisticLine param='good' paramval={props.paramVal[0]} />
        <StatisticLine param='neutral' paramval={props.paramVal[1]} />
        <StatisticLine param='bad' paramval={props.paramVal[2]} />
        <StatisticLine param='total' paramval={props.paramVal[3]} />
        <StatisticLine param='Average' paramval={props.paramVal[4]} />
        <StatisticLine param='positive' paramval={props.paramVal[5]} />
      </table>
    </>
  )

}
const StatisticLine = (props) => {
  console.log(props)
  return (
    <tbody><tr><td>{props.param}</td><td>{props.paramval}</td></tr></tbody>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const Average = ((1 * good + 0 * neutral - 1 * bad) / total).toFixed(2)
  const positive = ((good / (total)) * 100).toFixed(2)
  if (total === 0)
    return (
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={() => { setGood(good + 1) }} text={'Good'} />
        <Button handleClick={() => { setNeutral(neutral + 1) }} text={'Neutral'}></Button>
        <Button handleClick={() => { setBad(bad + 1) }} text='Bad'></Button>
        <h2>No feedback given</h2>
      </div>
    )
  else
    return (
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={() => { setGood(good + 1) }} text={'Good'} />
        <Button handleClick={() => { setNeutral(neutral + 1) }} text={'Neutral'}></Button>
        <Button handleClick={() => { setBad(bad + 1) }} text='Bad'></Button>
        <h2>Statistics</h2>
        <Statistics paramVal={[good, neutral, bad, total, Average, positive]} />
      </div>
    )
}

export default App;
