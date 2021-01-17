import React, { useState } from 'react'
import FormInput from './FormInput'

const CreateBlogForm = ({ newBlogHandler }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = (event) => {
		event.preventDefault()
		const newBlog = {
			title: title,
			author: author,
			url: url
		}
		setTitle('')
		setAuthor('')
		setUrl('')
		newBlogHandler(newBlog)
	}
	
	return (
		<div>
			<form onSubmit={createBlog}>
				<FormInput valueName={'Title'} value={title} setValue={setTitle} type={'text'} id={'title'}/>
				<FormInput valueName={'Author'} value={author} setValue={setAuthor} type={'text'} id={'author'}/>
				<FormInput valueName={'URL'} value={url} setValue={setUrl} type={'text'} id={'url'}/>
				<button id={'submitBlogButton'} type='submit'>Add Blog</button>
			</form>
		</div>
	)
}

export default CreateBlogForm