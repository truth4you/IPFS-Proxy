const initState = {
  user: null,
  isLoading: true,
  error: null
}

const users = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: payload.user }
    case 'LOGIN_FAIL':
      return { ...state, isLoading: false, error: payload }
    default:
      return state
  }
}

export default users
