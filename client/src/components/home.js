import React, { useEffect, useState } from 'react'
import { doLogin, isLogon } from '../redux/actions/guest'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = ({
  user, isLogon, doLogin, error
}) => {
  useEffect(() => {
    isLogon()
  }, [ isLogon ])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    doLogin({
      email, password
    })
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <label className='navbar-brand'>
          Fleek
        </label>
      </nav>
      <div>
        {user?
          <ul className="main-menu">
            <li><Link to="/users">Manage Users</Link></li>
            <li><Link to="/keys">Manage Keys</Link></li>
          </ul>:
          <div className='login-form'>
            <h5 className="heading">Login</h5>
            <input placeholder="Email" value={email} onChange={handleEmail}/>
            <input type="password" placeholder="Password" value={password} onChange={handlePassword}/>
            <div className="error-message">{error?.message}</div>
            <button onClick={handleLogin}>Login</button>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.home.user,
    isLoading: state.home.isLoading,
    error: state.home.error
  }
}

const mapStateToDispatch = dispatch => {
  return {
    isLogon: () => dispatch(isLogon()),
    doLogin: user => dispatch(doLogin(user))
  }
}

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Home)
