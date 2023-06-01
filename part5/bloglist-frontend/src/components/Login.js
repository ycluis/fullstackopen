const Login = ({ username, password, handleUsernameChg, handlePasswordChg, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={handleUsernameChg} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={handlePasswordChg} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
