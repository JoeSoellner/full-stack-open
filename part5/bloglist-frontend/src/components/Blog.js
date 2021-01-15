import React, { useState } from 'react'

const Blog = ({ blog, likeButtonClickHandler }) => {
	const blogStyle = {
	  paddingTop: 10,
	  paddingLeft: 2,
	  border: 'solid',
	  borderWidth: 1,
	  marginBottom: 5
	}

	const [detailsVisible, setDetailsVisible] = useState(false)

	const addLikeToBlog = (blogToUpdate) => {
		const updatedBlog = {
			id: blogToUpdate.id,
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blog.likes + 1
		}
		likeButtonClickHandler(updatedBlog)
	}

	const showDetails = (visible) => {
		if(visible) {
			return (
				<div>
					{blog.author} <br />
					{blog.url} <br />
					{'likes: '} {blog.likes}
					<button onClick={() => addLikeToBlog(blog)} type='submit'>like</button>
				</div>
			)
		} else {
			return (<></>)
		}
	}
	
	return (
	  <div style={blogStyle}>
		<div>
		  	{blog.title}
		  	<button onClick={() => setDetailsVisible(!detailsVisible)} type='button'>
				{detailsVisible ? 'hide' : 'details'}
			</button>
		</div>
		{showDetails(detailsVisible)}
	</div>
  )}

export default Blog
