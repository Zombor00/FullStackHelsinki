import React from 'react'

const LoginForm = (props) => {

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <div>
        username
          <input
            type='text'
            value={props.username}
            id='username'
            onChange={props.handleUsernameChange }
          />
        </div>
        <div>
        password
          <input
            type='password'
            value={props.password}
            id='password'
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
