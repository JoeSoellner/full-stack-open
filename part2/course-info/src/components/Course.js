import React from 'react';

const Header = (props) => {
	return (
		<>
			<h1>{props.course}</h1>
		</>
	)
}

const Part = (props) => {
	return (
		<>
			<p>
				{props.part.name} {props.part.exercises}
			</p>
		</>
	)
}

const Content = ({ parts }) => {
	const partComponents = parts.map(part => <Part part={part} />);
	return (
		<>
			{partComponents}
		</>
	)
}

const Total = ({ parts }) => {
	const exerciseTotal = parts.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<>
			<p><b>Number of exercises:</b> {exerciseTotal}</p>
		</>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course