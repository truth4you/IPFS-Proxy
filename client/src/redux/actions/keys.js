import axios from 'axios';

const setKeyListStart = () => {
  return {
    type: 'SET_KEY_LIST_START',
    payload: { error: null, deleteError: null } // init
  };
};

const setKeyListSuccess = data => {
  // data: Array of key obj
  //   console.log(data[0]);
  return {
    type: 'SET_KEY_LIST_SUCCESS',
    payload: { keys: data }
  };
};

const setKeyListError = err => {
  return {
    type: 'SET_KEY_LIST_ERROR',
    payload: { error: err }
  };
};

export const setKeyList = () => dispatch => {
  dispatch(setKeyListStart());
  axios
    .get('http://localhost:5000/api/keys')
    .then(res => dispatch(setKeyListSuccess(res.data)))
    .catch(err => dispatch(setKeyListError(err)));
};

// --------------

const createKeyStart = () => {
  return {
    type: 'CREATE_KEY_START',
    payload: {}
  };
};

const createKeySuccess = keyData => {
  // data: key obj: {fn, ln, sex, age, pw}
  return {
    type: 'CREATE_KEY_SUCCESS',
    payload: keyData
  };
};

const createKeyError = err => {
  return {
    type: 'CREATE_KEY_ERROR',
    payload: { error: err }
  };
};

export const createKey = keyData => dispatch => {
  dispatch(createKeyStart());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .post('http://localhost:5000/api/keys', keyData, config)
    .then(res => dispatch(createKeySuccess(res.data)))
    .catch(err => dispatch(createKeyError(err)));
}

const setKeyUpdateSuccess = (key, is_active) => {
  return {
    type: 'UPDATE_KEY_SUCCESS',
    payload: {key:key, is_active:is_active}
  };
};

export const lockKey = (id) => dispatch => {
  dispatch(setKeyListStart());
  axios
    .put(`http://localhost:5000/api/keys/lock/${id}`)
    .then(() => {
      dispatch(setKeyUpdateSuccess(id,false));
    })
    .catch(err => dispatch(setKeyListError(err)));
};

export const unlockKey = (id) => dispatch => {
  dispatch(setKeyListStart());
  axios
    .put(`http://localhost:5000/api/keys/unlock/${id}`)
    .then(() => {
      dispatch(setKeyUpdateSuccess(id,true));
    })
    .catch(err => dispatch(setKeyListError(err)));
};

// --------

const getKeyStart = () => {
  return {
    type: 'GET_KEY_START',
    payload: {}
  };
};

const getKeySuccess = keyData => {
  // console.log(keyData);
  return {
    type: 'GET_KEY_SUCCESS',
    payload: { key: keyData }
  };
};

const getKeyError = err => {
  return {
    type: 'GET_KEY_ERROR',
    payload: { error: err }
  };
};

export const getKey = (id, setKeyData) => dispatch => {
  dispatch(getKeyStart());
  axios
    .get(`http://localhost:5000/api/keys/${id}`)
    .then(res => {
      const { name, email } = res.data;
      const keyData = { name, email };
      dispatch(getKeySuccess(keyData));
      setKeyData(keyData);
    })
    .catch(err => dispatch(getKeyError(err)));
};
