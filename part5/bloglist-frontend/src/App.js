import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
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

	const createBlogHandler = async (event) => {
		try {
			event.preventDefault()
			const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).token}`
			console.log(token)
			const newBlog = {
				title: title,
				author: author,
				url: url
			}

			const response = await blogService.create(newBlog, token)
			console.log(response)
			setBlogs(blogs.concat(response))
			setTitle('')
			setAuthor('')
			setUrl('')
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

				<h2>create new blog</h2>
				<CreateBlogForm
					title={title} setTitle={setTitle}
					author={author} setAuthor={setAuthor}
					url={url} setUrl={setUrl}
					submitHandler={createBlogHandler}
				/>
			</div>
		)
	}
}

export default App