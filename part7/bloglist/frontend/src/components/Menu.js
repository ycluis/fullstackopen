import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../reducers/loginReducer'
import blogService from '../services/blogs'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  const login = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setLogin(null))
    blogService.setToken('')
    navigate('/')
  }

  return (
    <div>
      <Link to="/" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>
      {login ? (
        <p style={{ display: 'inline' }}>
          {login.username} logged in <button onClick={handleLogout}>logout</button>
        </p>
      ) : (
        <Link to="/">login</Link>
      )}
    </div>
  )
}

export default Menu
