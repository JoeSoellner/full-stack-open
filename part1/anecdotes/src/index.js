import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => {
	return (
		<>
			<button onClick={props.handleClick}>
				{props.text}
			</button>
		</>
	)
}

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [voteCounts, setVoteCounts] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

	const getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max))
	}

	const getRandomAnecdote = () => {
		setSelected(getRandomInt(anecdotes.length))
	}

	const increaseVote = () => {
		const voteCountsCopy = { ...voteCounts }
		voteCountsCopy[selected] += 1
		setVoteCounts(voteCountsCopy)
	}

	const getHighestVote = () => {
		// index and num of votes respectively
		let mostVotes = [0, 0]

		for (const [key, value] of Object.entries(voteCounts)) {
			if (value > [mostVotes[1]]) {
				mostVotes = [key, value]
			}
		}
		return mostVotes[0]
	}

	return (
		<div>
			<h1>Anecdote of the day</h1>
			{props.anecdotes[selected]}
			<br></br>
			this anecdote has {voteCounts[selected]} votes
			<br></br>
			<Button handleClick={increaseVote} text={"vote"} />
			<Button handleClick={getRandomAnecdote} text={"next anecdote"} />

			<h1>Anecdote with the most votes</h1>
			{props.anecdotes[getHighestVote()]}
		</div>
	)
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))