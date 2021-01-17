import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

describe('<Blog />', () => {
	let component
	let mockHandlerLikeButton
	let mockHandlerRemoveButton

	beforeEach(() => {
		mockHandlerLikeButton = jest.fn()
		mockHandlerRemoveButton = jest.fn()

		const testBlog = {
			id: 1,
			title: 'testing is boring but useful',
			author: 'me :)',
			url: 'https://testYourAppDummy.com',
			likes: 88
		}

	  component = render(
		<Blog blog={testBlog}
			likeButtonClickHandler={mockHandlerLikeButton}
			removeButtonClickHandler={mockHandlerRemoveButton}/>
	  )
	})

	test('renders title', () => {
		expect(component.container).toHaveTextContent('testing is boring but useful')
	})

	test('does not render author, url, or likes', () => {
		expect(component.container).not.toHaveTextContent('me :)') &&
		expect(component.container).not.toHaveTextContent('https://testYourAppDummy.com') &&
		expect(component.container).not.toHaveTextContent('88')
	})

	test('clicking details buttons shows author, url, and likes', () => {
		const detailsButton = component.getByText('details')
		fireEvent.click(detailsButton)

		expect(component.container).toHaveTextContent('me :)') &&
		expect(component.container).toHaveTextContent('https://testYourAppDummy.com') &&
		expect(component.container).toHaveTextContent('88')
	})

	test('when like button is clicked twice, handler receives two calls', () => {
		const detailsButton = component.getByText('details')
		fireEvent.click(detailsButton)

		const likeButton = component.getByText('like')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(mockHandlerLikeButton.mock.calls).toHaveLength(2)
	})
})