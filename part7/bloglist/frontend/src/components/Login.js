import PropTypes from 'prop-types'

import { Button, TextField } from '@mui/material'

const Login = ({ login, handleLoginFieldChange, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          size="small"
          label="username"
          type="text"
          value={login.username}
          name="username"
          onChange={handleLoginFieldChange}
          className="login_username"
          margin="dense"
        />
      </div>
      <div>
        <TextField
          size="small"
          label="password"
          type="password"
          value={login.password}
          name="password"
          onChange={handleLoginFieldChange}
          className="login_password"
          margin="dense"
        />
      </div>
      <Button type="submit" className="login_btn" size="small" variant="contained" style={{ marginTop: '0.5em' }}>
        login
      </Button>
    </form>
  )
}

Login.propTypes = {
  login: PropTypes.object.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login
