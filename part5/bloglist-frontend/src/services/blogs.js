import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async (newBlog, token) => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const update = async (updatedBlog) => {
	const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
	return response.data
}

const exports = { getAll, create, update }

export default exports