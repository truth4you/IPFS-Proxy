const initState = {
  users: [],
  error: null,
  deleteError: null,
  isLoading: false
};

const users = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER_LIST_START':
      return { ...state, isLoading: true };
    case 'SET_USER_LIST_SUCCESS':
      return { ...state, ...payload, isLoading: false };
    case 'SET_USER_LIST_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'DELETE_USER_START':
      return { ...state, isLoading: true };
    case 'DELETE_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'DELETE_USER_SUCCESS':
      //   // console.log(payload._id, ' in reducer');
      //   // console.log(users); // this users is THIS REDUCER ITSELF, NOT the array
      //   // totally wrong, users.filter return undefined
      //  // either pass users in payload or make another http call to get list
      return {
        ...state,
        // users: [...users.filter(user => user._id !== payload._id)],
        // users: [],
        // deleteId: payload._id,
        isLoading: false
      };
    case 'GET_USER_START':
      return { ...state, isLoading: true };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        ...payload,
        isLoading: false
      };
    case 'GET_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'EDIT_USER_START':
      return { ...state, isLoading: true };
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        ...payload,
        isLoading: false,
        editSuccess: true,
        error: null
      };
    case 'EDIT_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'INIT_EDIT':
      return { ...state, ...payload, error: null };
    case 'CREATE_USER_START':
      return { ...state, isLoading: true };
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        ...payload,
        isLoading: false,
        createSuccess: true,
        error: null // need this? or just in init?
      };
    case 'CREATE_USER_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'INIT_USER':
      return { ...state, ...payload, error: null };
    default:
      return state;
  }
};

export default users;
