import React, { useEffect } from 'react'
import { lockKey, setKeyList, unlockKey } from '../redux/actions/keys'
import { connect } from 'react-redux'
import { Loading, Alert } from './utils'
import { Link } from 'react-router-dom'

const Keys = ({
  keys,
  setKeyList,
  history,
  lockKey,
  unlockKey,
  isLoading,
  error,
  deleteError
}) => {
  useEffect(() => {
    setKeyList()
  },[])

  const handleEnable = id => {
    unlockKey(id)
  }

  const handleDisable = id => {
    lockKey(id)
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <label className='navbar-brand'>Key List</label>
        <div className='navbar-buttons'>
          <Link className='btn btn-outline-success' to="/">
            <i className='fas fa-home' /> Home
          </Link>
          <Link className='btn btn-outline-success' to="/key">
            <i className='fas fa-key' /> Generate
          </Link>
        </div>
      </nav>
      <div className="content">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="container">
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Key</th>
                  <th>Count</th>
                  <th>Bytes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key, i) => {
                  return (
                    <tr className='key' key={key._id}>
                      <td>{i+1}</td>
                      <td>{key.email}</td>
                      <td>{key.key}</td>
                      <td>{key.count}</td>
                      <td>{key.bytes}</td>
                      <td className="buttons">
                        {key.is_active?
                        <button
                          className='btn btn-outline-danger btn-sm'
                          onClick={e => handleDisable(key.key)}
                        >
                          <i className='fas fa-lock' /> Disable
                        </button>:
                        <button
                        className='btn btn-outline-primary btn-sm'
                        onClick={e => handleEnable(key.key)}
                      >
                        <i className='fas fa-unlock' /> Enable
                      </button>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {error && <Alert waring='server' item='get' />}
            {deleteError && <Alert waring='server' item='delete' />}
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    keys: state.keys.keys,
    isLoading: state.keys.isLoading,
    error: state.keys.error,
    deleteError: state.keys.deleteError
  }
}

const mapStateToDispatch = dispatch => {
  return {
    setKeyList: () => dispatch(setKeyList()),
    lockKey: (id, history) => dispatch(lockKey(id, history)),
    unlockKey: (id, history) => dispatch(unlockKey(id, history))
  }
}

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Keys)
