import React from 'react'
import FormInput from './FormInput'

const CreateBlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, submitHandler }) => (
    <div>
        <form onSubmit={submitHandler}>
            <FormInput valueName={'Title'} value={title} setValue={setTitle} type={'text'} />
            <FormInput valueName={'Author'} value={author} setValue={setAuthor} type={'text'} />
            <FormInput valueName={'URL'} value={url} setValue={setUrl} type={'text'} />
            <button type='submit'>Add Blog</button>
        </form>
    </div>
)

export default CreateBlogForm