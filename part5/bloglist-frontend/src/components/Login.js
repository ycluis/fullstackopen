import PropTypes from 'prop-types'

const Login = ({ login, handleLoginFieldChange, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={login.username} name="username" onChange={handleLoginFieldChange} />
      </div>
      <div>
        password
        <input type="password" value={login.password} name="password" onChange={handleLoginFieldChange} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

Login.propTypes = {
  login: PropTypes.object.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login
