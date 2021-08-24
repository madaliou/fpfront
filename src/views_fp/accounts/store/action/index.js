import axios from 'axios'
import useJwt from '@src/auth/jwt/useJwt'
import { useSelector } from 'react-redux'
//console.log('useJwt22 : ', useJwt)

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get('accounts').then(response => {

      //console.log('users ! ', response)
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

    //console.log('santri : ', token)   

    await axios.get("accounts").then(response => {
      //console.log('accounts : ', response.data)
       /* dispatch({
        type: 'GET_DATA',
        data: response.data.accounts,
        totalPages: response.data.total,
        params
      }) */
    }).catch(error => {
      console.log('see here', JSON.stringify(error.response))
    })
   
  }
}

// ** Get User
export const getAccount = id => {
 
  return async dispatch => {
    await axios
      .get(`accounts/${id}/`)
      .then(response => {   
        console.log('response.data : ', response.data)
          dispatch({
            type: 'GET_ACCOUNT',
            selectedUser: response.data
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
        //console.log('add account : ', response.data)
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

//edit account 
export const editAccount = account => {
  return (dispatch, getState) => {
    axios
      .put(`accounts/${account.id}/`, account)
      .then(response => {
        console.log('update account : ', response.data)
        dispatch({
          type: 'UPDATE_ACCOUNT',
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
export const deleteAccount = id => {
  return (dispatch, getState) => {
    axios
      .delete(`accounts/${id}/`)
      .then(response => {
        console.log('deleted')
        dispatch({
          type: 'DELETE_ACCOUNT'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
  }
}
