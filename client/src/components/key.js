import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createKey, getKey } from '../redux/actions/keys'
import { setAlert } from '../redux/actions/alert'
import { Loading, Alert } from './utils'

const CreateKey = ({
  setAlert,
  getKey,
  createKey,
  alertContent,
  match,
  createSuccess,
  isLoading,
  error
}) => {
  const id = match.params.key

  const [keyData, setKey] = useState({
    email: ''
  })

  const { email } = keyData

  const handleCreate = e => {
    e.preventDefault()
    createKey({ email })
  }

  const handleChange = e => {
    setKey({ ...keyData, [e.target.name]: e.target.value })
  }

  const disableCreate = (email) => {
    return !(
      email &&
      /^[\w\d_.]+@([\w\d_.]+)+$/.test(email)
    )
  }

  useEffect(() => {
    getKey(id, setKey)
  }, [getKey, id]);

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <label className='navbar-brand'>{id?'Edit Key':'Create Key'}</label>
        <Link className='btn btn-outline-success' to="/keys">
          <i className='fas fa-arrow-left' /> List
        </Link>
      </nav>
      {createSuccess ? (
        <Redirect to='/keys' />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="content container">
          <div className='create'>Fill in the input boxes</div>
          <div className='container'>
            <form onSubmit={e => handleCreate(e)}>
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
              {error && <Alert warning='server' item='create' />}
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      disableCreate(
                        email
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
    createSuccess: state.keys.createSuccess,
    isLoading: state.keys.isLoading,
    error: state.keys.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    getKey: (id, setKey) => dispatch(getKey(id, setKey)),
    createKey: data => dispatch(createKey(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKey)
