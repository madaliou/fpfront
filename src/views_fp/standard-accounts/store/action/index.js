import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import useJwt from '@src/auth/jwt/useJwt'
import { useSelector } from 'react-redux'
import Avatar from '@components/avatar'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import { toast, Slide } from 'react-toastify'


//console.log('useJwt22 : ', useJwt)

const ToastContent = ({ message, header, color }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>{header}</h6>
      </div>
    </div>
    <div className='toastify-body' style={{background: '#gray'}}>
      <span>{message}</span>
    </div>
  </Fragment>
)
// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get('accounts').then(response => {
      console.log('standard accounts ! ', response)
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
}

/* export const getAllData = () => {
  return async dispatch => {
    await axios.get('/api/accounts/list/all-data').then(response => {

      console.log('accounts ! ', response)
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
} */

/* export const getData = params => {
  return async dispatch => {
    await axios.get('/api/accounts/list/data', params).then(response => {
      console.log('not all : ', response.data)
      dispatch({
        type: 'GET_DATA',
        data: response.data.accounts,
        totalPages: response.data.total,
        params
      })
    })
  }
} */

// ** Get data on page or row change
export const getData = params => {
 
  return async dispatch => {

    //console.log('parameters : ', params)   

    await axios.post('/accounts-filter/', params, {
      params: {
        page: params.page,
        perPage: params.perPage
      }
    }).then(response => {
     
      if (response.data.results) {
        dispatch({
          type: 'GET_DATA',
          data: response.data.results,
          totalPages: response.data.count,
          params
        })
      } else {
        console.log('====================================')
        console.log("ggg")
        console.log('====================================')
        dispatch({
          type: 'GET_DATA',
          data: [],
          totalPages: 0,
          params
        })
      }
      
    }).catch(error => {
      console.log('see here', JSON.stringify(error.response))
    })
   
  }
}

// ** Get User
export const getAccount = id => {
 console.log('yo')
  return async dispatch => {
    await axios
      .get(`accounts/${id}/`)
      .then(response => {   
        
          dispatch({
            type: 'GET_ACCOUNT',
            selectedAccount: response.data
          })          
          console.log('selected acc : ', response.data)
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
/* export const addAccount = account => {
  return (dispatch, getState) => {
    axios
      .post('accounts/', account)
      .then(response => {
        dispatch({
          type: 'ADD_ACCOUNT',
          account: response.data
        })
      })
  }
} */


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

        toast.success(
          <ToastContent message={'Compte créé avec succès!!'} header={'Succès'} color={'success'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .then(() => {
        dispatch(getData(getState().accounts.params))
        dispatch(getAllData())
      })
      .catch(error => {
        //console.log(err)
        toast.error(
          <ToastContent color={'danger'} header={'Attention !'} message={JSON.stringify(error.response.data)} />,
          { transition: Slide, hideProgressBar: true, autoClose: 4000 }
        )
      
      })
  }
} 

//edit account 
export const editAccount = account => {
  return (dispatch, getState) => {
    axios
      .put(`accounts/${account.id}/`, account)
      .then(response => {
        //console.log('oooooooooooooooooupdate account : ', response.data)
         dispatch({
          type: 'UPDATE_ACCOUNT',
          account: response.data
        })
        toast.success(
          <ToastContent message={'Compte modifié avec succès!!'} header={'Succès'} color={'success'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .then(() => {
       dispatch(getData(getState().accounts.params))
        dispatch(getAllData()) 
      })
      .catch(error => {
        //console.log('ooooooooooooooupdate account error : ', error)
        toast.error(
          <ToastContent message={'JSON.stringify(error.response.data)'} header={'Attention'} color={'danger'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
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
        dispatch(getData(getState().accounts.params))
        dispatch(getAllData())
      })
  }
}
