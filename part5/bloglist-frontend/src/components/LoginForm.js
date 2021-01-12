import React from 'react'
const LoginForm = ({ username, setUsername, password, setPassword, submitHandler }) => (
    <div>
        <form onSubmit={submitHandler}>
            <div>
                Username
                <input
                    type='text'
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password
                <input
                    type='password'
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>
)

export default LoginForm