import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>

  )
}
const Statistics = (props) => {
  return (
    <p> {props.param} {props.paramVal}</p>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const Average = (1 * good + 0 * neutral - 1 * bad) / total
  const positive = (good / (total)) * 100
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
        <Statistics paramVal={good} param='good'></Statistics>
        <Statistics paramVal={neutral} param='neutral'></Statistics>
        <Statistics paramVal={bad} param='bad'></Statistics>
        <Statistics paramVal={total} param='total'></Statistics>
        <Statistics paramVal={Average} param='Average'></Statistics>
        <Statistics paramVal={positive} param='positive'></Statistics>
      </div>
    )
}

export default App;
