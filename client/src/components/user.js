import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createUser, initUser, getUser, saveUser } from '../redux/actions/users'
import { setAlert } from '../redux/actions/alert'
import { Loading, Alert } from './utils'

const CreateUser = ({
  setAlert,
  getUser,
  createUser,
  saveUser,
  alertContent,
  match,
  createSuccess,
  editSuccess,
  isLoading,
  error
}) => {
  const id = match.params.userId

  const [userData, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeat: ''
  })

  const { name, email, password, repeat } = userData

  const handleCreate = e => {
    e.preventDefault()
    if (password !== repeat) {
      setAlert('Password does not match!')
    } else if(id !== undefined) {
      saveUser({ id, name, email })
    } else {
      createUser({ name, email, password })
    }
  }

  const handleChange = e => {
    setUser({ ...userData, [e.target.name]: e.target.value })
  }

  const disableCreate = (name, email, password, repeat) => {
    return !(
      name &&
      email &&
      (id || (password &&
      repeat &&
      password === repeat)) &&
      /^[_\w\s\d]+$/.test(name) &&
      /^[\w\d_.]+@([\w\d_.]+)+$/.test(email)
    )
  }

  useEffect(() => {
    getUser(id, setUser)
  }, [getUser, id]);

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <label className='navbar-brand'>{id?'Edit User':'Create User'}</label>
        <Link className='btn btn-outline-success' to="/users">
          <i className='fas fa-arrow-left' /> List
        </Link>
      </nav>
      {createSuccess || editSuccess ? (
        <Redirect to='/users' />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="content container">
          <div className='create'>Fill in the input boxes</div>
          <div className='container'>
            <form onSubmit={e => handleCreate(e)}>
              <div className='form-group'>
                Name:
                <div className="input-wrapper">
                  <input
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={e => handleChange(e)}
                    placeholder='Name'
                  />
                  {!name && <Alert warning='empty' item='name' />}
                  {name && !/^[_\w\s\d]+$/.test(name) && (
                    <Alert warning='invalid' item='name' />
                  )}
                </div>
              </div>
              <div className='form-group'>
                E-mail:
                <div className="input-wrapper">
                  <input
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={e => handleChange(e)}
                    placeholder='Email'
                  />
                  {!email && <Alert warning='empty' item='email' />}
                  {email && !/^[\w\d_.]+@[\w\d_.]+$/.test(email) && (
                    <Alert warning='invalid' item='email' />
                  )}
                </div>
              </div>
              {id?null:
              <div className='form-group'>
                Password:
                <div className="input-wrapper">
                  <input
                    className='form-control'
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => handleChange(e)}
                    placeholder='password'
                  />
                  {!password && <Alert warning='empty' item='password' />}
                </div>
              </div>}
              {id?null:
              <div className='form-group'>
                Repeat:
                <div className="input-wrapper">
                  <input
                    className='form-control'
                    type='password'
                    name='repeat'
                    value={repeat}
                    onChange={e => handleChange(e)}
                    placeholder='repeat'
                  />
                  {!repeat && <Alert warning='empty' item='confirmed password' />}
                  {repeat && password !== repeat && (
                    <Alert warning='match' item='password' />
                  )}
                </div>
              </div>}
              {error && <Alert warning='server' item='create' />}
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      disableCreate(
                        name,
                        email,
                        password,
                        repeat
                      )
                    }
                  >
                    <i className='fas fa-save' /> Submit
                  </button>
                </div>
              </div>
            </form>
            <div className='alert-text'>{alertContent}</div>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    createSuccess: state.users.createSuccess,
    editSuccess: state.users.editSuccess,
    isLoading: state.users.isLoading,
    error: state.users.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    getUser: (id, setUser) => dispatch(getUser(id, setUser)),
    createUser: data => dispatch(createUser(data)),
    saveUser: data => dispatch(saveUser(data)),
    initUser: () => dispatch(initUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)
