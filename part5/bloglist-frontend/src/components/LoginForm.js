import React from 'react'
import FormInput from './FormInput'

const LoginForm = ({ username, setUsername, password, setPassword, submitHandler }) => (
    <div>
        <form onSubmit={submitHandler}>
            <FormInput valueName={'Username'} value={username} setValue={setUsername} type={'text'} id={'username'}/>
            <FormInput valueName={'Password'} value={password} setValue={setPassword} type={'password'} id={'password'}/>
            <button id={'loginButton'} type='submit'>Login</button>
        </form>
    </div>
)

export default LoginForm