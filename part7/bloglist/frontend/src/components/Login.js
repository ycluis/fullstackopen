import PropTypes from 'prop-types'

const Login = ({ login, handleLoginFieldChange, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={login.username}
          name="username"
          onChange={handleLoginFieldChange}
          className="login_username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={login.password}
          name="password"
          onChange={handleLoginFieldChange}
          className="login_password"
        />
      </div>
      <button type="submit" className="login_btn">
        login
      </button>
    </form>
  )
}

Login.propTypes = {
  login: PropTypes.object.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login
