import { useState } from 'react'

const Title = (props) => (<h1>{props.text}</h1>)

const Button = (props) => (<button onClick={props.onClick}>{props.text}</button>)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text} </td>
    <td>{props.value} {props.sup}</td>
  </tr>)

const Statistics = (props) => {

  if (props.statistics.good.num == 0 && props.statistics.bad.num == 0 && props.statistics.neutral.num == 0) {
    return (
      <div>
        <Title text="statistics" />
        <span>{props.statistics.labels[3]} </span>
      </div>)
  }

  return (
    <div>
      <Title text="statistics" />

      <table>
        <tbody>
          <StatisticLine text={props.statistics.good.text} value={props.statistics.good.num} />
          <StatisticLine text={props.statistics.neutral.text} value={props.statistics.neutral.num} />
          <StatisticLine text={props.statistics.bad.text} value={props.statistics.bad.num} />

          <StatisticLine text={props.statistics.labels[0]} value={props.statistics.all()} />
          <StatisticLine text={props.statistics.labels[1]} value={props.statistics.average()} />
          <StatisticLine text={props.statistics.labels[2]} value={props.statistics.positive()} sup="%" />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedbacks = () => setGood(good + 1)

  const neutralFeedbacks = () => setNeutral(neutral + 1)

  const badFeedbacks = () => setBad(bad + 1)

  const statistics = {
    good: {
      text: "good",
      num: good
    },
    bad: {
      text: "bad",
      num: bad
    },
    neutral: {
      text: "neutral",
      num: neutral
    },

    labels: ["all", "average", "positive", "No feedback given"],
    all() { return good + neutral + bad },
    average() { return (good - bad) / this.all() },
    positive() { return (100 / this.all()) * good }

  }

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" onClick={goodFeedbacks} />
      <Button text="neutral" onClick={neutralFeedbacks} />
      <Button text="bad" onClick={badFeedbacks} />
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App