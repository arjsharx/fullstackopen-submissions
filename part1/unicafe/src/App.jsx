import { useState } from 'react'
const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  const average = (good-bad)/all
  const positive = (good/all)*100
return (
  <div>
  <h1>Statistics</h1>
  <table>
  <tbody>
      <StatisticLine text="good" statistic={good}/>
      <StatisticLine text="neutral" statistic={neutral}/>
      <StatisticLine text="bad" statistic={bad}/>
      <StatisticLine text="all" statistic={all}/>
      <StatisticLine text="average" statistic={average}/>
      <StatisticLine text="positive" statistic={positive + "%"}/>
  </tbody>
  </table>
  </div>
)
}
const Button =  ({text, action}) => <button onClick={action}>{text}</button>

const StatisticLine = ({text,statistic}) => {
return (
  <tr>
  <td>{text}</td>
  <td>{statistic}</td>
  </tr>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickGood = () => setGood(good+1)
  const onClickBad = () => setBad(bad+1)
  const onClickNeutral = () => setNeutral (neutral +1)
  const feedbackstarted = good + bad + neutral

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" action = {onClickGood}/>
      <Button text="neutral" action = {onClickNeutral}/>
      <Button text="bad" action = {onClickBad}/>
      {feedbackstarted ? (
      <Statistics good = {good} bad={bad} neutral={neutral}/>
      ) : (<p>No feedback given</p>)
    }
    </div>
  )
}

export default App