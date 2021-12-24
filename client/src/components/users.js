import React, { useEffect } from 'react'
import { setUserList } from '../redux/actions/users'
import { connect } from 'react-redux'
import { initUser, initEdit, deleteUser } from '../redux/actions/users'
import { Loading, Alert } from './utils'
import { Link } from 'react-router-dom'

const Users = ({
  users,
  setUserList,
  history,
  initUser,
  initEdit,
  deleteUser,
  isLoading,
  error,
  deleteError
}) => {
  useEffect(() => {
    initUser()
    initEdit()
    setUserList()
  },[])

  const handleEdit = id => {
    history.push(`/user/${id}`)
  }

  const handleDelete = id => {
    deleteUser(id)
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <label className='navbar-brand'>User List</label>
        <div className='navbar-buttons'>
          <Link className='btn btn-outline-success' to="/">
            <i className='fas fa-home' /> Home
          </Link>
          <Link className='btn btn-outline-success' to="/user">
            <i className='fas fa-users' /> Create
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
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr className='user' key={user._id}>
                      <td>{i+1}</td>
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td className="buttons">
                        <button
                          className='btn btn-outline-primary btn-sm'
                          onClick={e => handleEdit(user._id)}
                        >
                          <i className='fas fa-pen' /> Edit
                        </button>
                        <button
                          className='btn btn-outline-danger btn-sm'
                          onClick={e => handleDelete(user._id)}
                        >
                          <i className='fas fa-trash' /> Delete
                        </button>
                        {/* <button
                          className='btn btn-outline-warning btn-sm'
                          onClick={e => handleDelete(user._id)}
                        >
                          <i className='fas fa-lock' /> Reset
                        </button> */}
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
    users: state.users.users,
    isLoading: state.users.isLoading,
    error: state.users.error,
    deleteError: state.users.deleteError
  }
}

const mapStateToDispatch = dispatch => {
  return {
    setUserList: () => dispatch(setUserList()),
    initUser: () => dispatch(initUser()),
    initEdit: () => dispatch(initEdit()),
    deleteUser: id => dispatch(deleteUser(id))
  }
}

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Users)
