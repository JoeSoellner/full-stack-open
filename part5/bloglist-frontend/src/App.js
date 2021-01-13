import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	const loginHandler = async (event) => {
		event.preventDefault()

		try {
			const currUser = await loginService.login({
				username, password
			})
			setUser(currUser)
			window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(currUser))
			setUsername('')
			setPassword('')
		} catch (exception) {
			window.alert('Wrong credentials')
		}
	}

	const logoutHandler = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedInBlogAppUser')
		setUser(null)
	}

	if (user === null) {
		return (
			<div>
				{<LoginForm
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					submitHandler={loginHandler}
				/>}
			</div>
		)
	} else {
		return (
			<div>
				<h2>blogs</h2>
				<p>{user.name} logged-in</p>
				<button type="submit" onClick={logoutHandler}>Logout</button>

				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		)
	}
}

export default App