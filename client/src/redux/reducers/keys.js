const initState = {
  keys: [],
  error: null,
  deleteError: null,
  isLoading: false
};

const keys = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_KEY_LIST_START':
      return { ...state, isLoading: true };
    case 'SET_KEY_LIST_SUCCESS':
      return { ...state, ...payload, isLoading: false };
    case 'SET_KEY_LIST_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'UPDATE_KEY_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'UPDATE_KEY_SUCCESS':
      state.keys.map(key=>{
        if(key.key===payload.key)
          key.is_active = payload.is_active
        return null
      })
      return {
        ...state,
        isLoading: false
      };
    case 'GET_KEY_START':
      return { ...state, isLoading: true };
    case 'GET_KEY_SUCCESS':
      return {
        ...state,
        ...payload,
        isLoading: false
      };
    case 'GET_KEY_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'EDIT_KEY_START':
      return { ...state, isLoading: true };
    case 'EDIT_KEY_SUCCESS':
      return {
        ...state,
        ...payload,
        isLoading: false,
        editSuccess: true,
        error: null
      };
    case 'EDIT_KEY_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'INIT_EDIT':
      return { ...state, ...payload, error: null };
    case 'CREATE_KEY_START':
      return { ...state, isLoading: true };
    case 'CREATE_KEY_SUCCESS':
      return {
        ...state,
        ...payload,
        isLoading: false,
        createSuccess: true,
        error: null // need this? or just in init?
      };
    case 'CREATE_KEY_ERROR':
      return { ...state, ...payload, isLoading: false };
    case 'INIT_KEY':
      return { ...state, ...payload, error: null };
    default:
      return state;
  }
};

export default keys;
