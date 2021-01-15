import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
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

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
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
			console.log(exception)
		}
	}

	const logoutHandler = (event) => {
		window.localStorage.removeItem('loggedInBlogAppUser')
		setUser(null)
	}

	const newBlogHandler = async (newBlog) => {
		try {
			const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).token}`
			const response = await blogService.create(newBlog, token)
			setBlogs(blogs.concat(response))
		} catch (exception) {
			window.alert('Invalid input')
			console.log(exception)
		}
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
				<Togglable buttonLabel={'create blog'}>
					<h2>create new blog</h2>
					<CreateBlogForm
						newBlogHandler={newBlogHandler}
					/>
				</Togglable>
			</div>
		)
	}
}

export default App