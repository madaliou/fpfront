import axios from 'axios'
import useJwt from '@src/auth/jwt/useJwt'

//console.log('useJwt22 : ', useJwt)

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get('accounts').then(response => {

      console.log('users ! ', response)
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
}

/* export const getAllData = () => {
  return async dispatch => {
    await axios.get('/api/users/list/all-data').then(response => {

      console.log('users ! ', response)
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
} */

/* export const getData = params => {
  return async dispatch => {
    await axios.get('/api/users/list/data', params).then(response => {
      console.log('not all : ', response.data)
      dispatch({
        type: 'GET_DATA',
        data: response.data.users,
        totalPages: response.data.total,
        params
      })
    })
  }
} */

// ** Get data on page or row change
export const getData = params => {
  console.log('om')
  return async dispatch => {

    const mytoken = await localStorage.getItem('token')

    const token = JSON.parse(mytoken)

    console.log('santri : ', token)   

    await axios.get("accounts", {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log('accounts : ', response.data)
      /* dispatch({
        type: 'GET_DATA',
        data: response.data.users,
        totalPages: response.data.total,
        params
      }) */
    }).catch(error => {
      console.log('see here', JSON.stringify(error.response))
    })
   
  }
}

// ** Get User
export const getUser = id => {
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
export const addAccount = account => {
  return (dispatch, getState) => {
    axios
      .post('accounts/', account)
      .then(response => {
        console.log('add account : ', response.data)
        dispatch({
          type: 'ADD_ACCOUNT',
          account: response.data
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
      .catch(err => console.log(err))
  }
}

// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .delete('/apps/users/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
  }
}
