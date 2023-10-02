import { useState } from "react";

const Statistics = (props) => {
  const { good, neutral, bad } = props.feedback;
  const feedbackGathered = good || neutral || bad;

  return feedbackGathered ? (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(
              (good * 1 + neutral * 0 + bad * -1) /
              (good + neutral + bad)
            ).toFixed(2)}
          />
          <StatisticLine
            text="positive"
            value={((good / (good + neutral + bad)) * 100).toFixed(2) + "%"}
          />
        </tbody>
      </table>
    </div>
  ) : (
    <p>No feedback given</p>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Statistics feedback={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
