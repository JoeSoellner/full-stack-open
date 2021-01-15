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
		blogService.getAll().then(blogs => {
			const sortedBlogs = sortBlogs(blogs)
			setBlogs(sortedBlogs)
		})
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
			const sortedBlogs = sortBlogs(blogs.concat(response))
			setBlogs(sortedBlogs)
		} catch (exception) {
			window.alert('Invalid input')
			console.log(exception)
		}
	}

	const sortBlogs = (blogsToSort) => {
		const blogCompator = (blog1, blog2) => {
			if (blog1.likes < blog2.likes) {
				return -1;
			  }
			  if (blog1.likes > blog2.likes) {
				return 1;
			  }
			  return 0;
		}

		blogsToSort.sort(blogCompator)
		blogsToSort.reverse()
		return blogsToSort
	}

	const likeButtonClickHandler = async (updatedBlog) => {
		const response = await blogService.update(updatedBlog)
		const oldBlogIndex = blogs.findIndex(blog => blog.title === updatedBlog.title)
		blogs[oldBlogIndex] = response
		setBlogs([...blogs])
	}

	const removeButtonClickHandler = async (deletedBlog) => {
		try {
			const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).token}`
			await blogService.remove(deletedBlog, token)
			
			const removedBlogIndex = blogs.findIndex(blog => blog.id === deletedBlog.id)
			blogs.splice(removedBlogIndex, 1)
			setBlogs([...blogs])
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
					<Blog key={blog.id} blog={blog}
					likeButtonClickHandler={likeButtonClickHandler}
					removeButtonClickHandler={removeButtonClickHandler}/>
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