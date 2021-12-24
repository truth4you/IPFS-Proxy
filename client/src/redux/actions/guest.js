import axios from 'axios'

const logonSuccess = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: { user }
  }
}

const loginFail = (code, message) => {
  return {
    type: 'LOGIN_FAIL',
    payload: { code, message }
  }
}

export const isLogon = (history) => (dispatch, history) => {
  axios
    .get('http://localhost:5000/api/logon')
    .then(res => {
      if(res.data.success)
        dispatch(logonSuccess(res.data.user))
    })
}

export const doLogin = (user, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/login', user)
    .then(res => {
      if(res.data.success)
        dispatch(logonSuccess(res.data.user))
      else
        dispatch(loginFail(res.data.code, res.data.message))
    }).catch(err=>dispatch(loginFail(0, err.toString())))
}
