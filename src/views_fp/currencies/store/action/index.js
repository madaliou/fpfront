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
    await axios.get('currencies').then(response => {
      console.log('currencies ! ', response)
      dispatch({
        type: 'GET_ALL_CURRENCIES',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
 
  return async dispatch => {

    //console.log('parameters : ', params)   

    await axios.post('/currencies-filter/', params, {
      params: {
        page: params.page,
        perPage: params.perPage
      }
    }).then(response => {
      console.log('see currencies : ', response.data)
       dispatch({
        type: 'GET_CURRENCIES',
        data: response.data.results,
        totalPages: response.data.count,
        params
      })
    }).catch(error => {
      console.log('get currencies error : ', JSON.stringify(error.response))
    })
   
  }
}

// ** Get User
export const getCurrency = id => {
 
  return async dispatch => {
    await axios
      .get(`currencies/${id}/`)
      .then(response => {   
        console.log('response.data : ', response.data)
          dispatch({
            type: 'GET_CURRENCY',
            selectedCurrency: response.data
          })          
        
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
export const addCurrency = exploitation => {
  return (dispatch, getState) => {
    axios
      .post('currencies/', exploitation)
      .then(response => {
        //console.log('add exploitation : ', response.data)
        dispatch({
          type: 'ADD_CURRENCY',
          exploitation: response.data
        })

        toast.success(
          <ToastContent message={'Currency créé avec succès!!'} header={'Succès'} color={'success'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .then(() => {
        dispatch(getData(getState().currencies.params))
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

//edit exploitation 
export const editCurrency = exploitation => {
  return (dispatch, getState) => {
    axios
      .put(`currencies/${exploitation.id}/`, exploitation)
      .then(response => {
        console.log('update exploitation : ', response.data)
        dispatch({
          type: 'UPDATE_CURRENCY',
          exploitation: response.data
        })
        toast.error(
          <ToastContent color={'success'} message={'Currency modifié avec succès!!'} header={'Currency'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )
      })
      .then(() => {
         dispatch(getData(getState().currencies.params))
        dispatch(getAllData()) 
      })
      .catch(error => {
        console.log('update exploitation error : ', error)
        toast.error(
          <ToastContent color={'danger'} message={JSON.stringify(error)} header={'Attention'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 4000 }
        )
      })
  }
}

// ** Delete user
export const deleteCurrency = id => {
  return (dispatch, getState) => {
    axios
      .delete(`currencies/${id}/`)
      .then(response => {
        console.log('deleted')
        dispatch({
          type: 'DELETE_CURRENCY'
        })
      })
      .then(() => {
        dispatch(getData(getState().currencies.params))
        dispatch(getAllData())
      })
  }
}
