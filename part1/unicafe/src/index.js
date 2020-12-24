import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
	return (
		<>
			<button onClick={props.handleClick}>
				{props.text}
			</button>
		</>
	)
}

const Statistic = (props) => {
	return (
		<>
			<tbody>
				<tr>
					<td>{props.statName}</td>
					<td>{props.statValue}</td>
				</tr>
			</tbody>
		</>
	)
}

const Statistics = (props) => {
	console.log(props);
	return (
		<>
			<h1>statistics</h1>
			<table>
				<Statistic statName={"good"} statValue={props.statsObj.good} />
				<Statistic statName={"neutral"} statValue={props.statsObj.neutral} />
				<Statistic statName={"bad"} statValue={props.statsObj.bad} />
				<Statistic statName={"all"} statValue={props.statsObj.total} />
				<Statistic statName={"average"} statValue={props.statsObj.average} />
				<Statistic statName={"positive percent"} statValue={props.statsObj.positivePercent} />
			</table>
		</>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const increaseCount = (feedbackType) => () => {
		if (feedbackType === "good") {
			setGood(good + 1);
		} else if (feedbackType === "neutral") {
			setNeutral(neutral + 1);
		} else if (feedbackType === "bad") {
			setBad(bad + 1);
		}
	}
	let total = good + neutral + bad;
	let average = (good + (bad * -1)) / total;
	let positivePercent = (good / total) * 100;

	const stats = {
		good: good,
		neutral: neutral,
		bad: bad,
		total: total,
		average: average,
		positivePercent: positivePercent
	}


	if (good === 0 && neutral === 0 && bad === 0) {
		return (
			<div>
				<h1>give feedback</h1>
				<Button handleClick={increaseCount("good")} text={"good"} />
				<Button handleClick={increaseCount("neutral")} text={"neutral"} />
				<Button handleClick={increaseCount("bad")} text={"bad"} />

				<h1>statistics</h1>
					no feedback given
			</div>
		)
	} else {
		return (
			<div>
				<h1>give feedback</h1>
				<Button handleClick={increaseCount("good")} text={"good"} />
				<Button handleClick={increaseCount("neutral")} text={"neutral"} />
				<Button handleClick={increaseCount("bad")} text={"bad"} />

				<Statistics statsObj={stats} />
			</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('root'));