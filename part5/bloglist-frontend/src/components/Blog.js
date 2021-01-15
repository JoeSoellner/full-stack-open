import React, { useState } from 'react'

const Blog = ({ blog }) => {
	const blogStyle = {
	  paddingTop: 10,
	  paddingLeft: 2,
	  border: 'solid',
	  borderWidth: 1,
	  marginBottom: 5
	}

	const [detailsVisible, setDetailsVisible] = useState(false)

	const showDetails = (visible) => {
		if(visible) {
			return (
				<div>
					{blog.author} <br />
					{blog.url} <br />
					{'likes: '} {blog.likes}
					<button type='submit'>like</button>
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
