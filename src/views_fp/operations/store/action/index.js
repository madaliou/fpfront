import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import useJwt from '@src/auth/jwt/useJwt'
import { useSelector } from 'react-redux'
import Avatar from '@components/avatar'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import { toast, Slide } from 'react-toastify'

//const operations = useSelector(state => state.operations)

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
    await axios.get('operations').then(response => {
      //console.log('operations ! ', response)
      dispatch({
        type: 'GET_ALL_OPERATIONS',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
 
  return async dispatch => {

    console.log('operation parameters : ', params)  
    
    //console.log('store op : ', operations)

    await axios.post('/operations-filter/', params
     /* {
      params: {
        page: params.page,
        perPage: params.perPage
      }
    } */
    ).then(response => {
      console.log('filter operations : ', response.data)
       dispatch({
        type: 'GET_OPERATIONS',
        data: response.data,
        //totalPages: response.data.count,
        params
      }) 
    }).catch(error => {
      console.log('get operations error : ', JSON.stringify(error.response))
    })
   
  }
}

// ** Get User
export const getOperation = id => {
 
  return async dispatch => {
    await axios
      .get(`operations/${id}/`)
      .then(response => {   
        console.log('response.data : ', response.data)
          dispatch({
            type: 'GET_OPERATION',
            selectedOperation: response.data
          })          
        
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
export const addOperation = operation => {
  return (dispatch, getState) => {
    axios
      .post('operations/', operation)
      .then(response => {
        //console.log('add operation : ', response.data)
        dispatch({
          type: 'ADD_OPERATION',
          operation: response.data
        })

        toast.success(
          <ToastContent message={'Operation créé avec succès!!'} header={'Succès'} color={'success'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .then(() => {
        dispatch(getData(getState().operations.params))
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

//edit operation 
export const editOperation = (id, operation) => {
  console.log('where is id : ', operation)
  return (dispatch, getState) => {
    axios
      .put(`operations/${id}/`, operation)
      .then(response => {
        console.log('update operation : ', response.data)
        dispatch({
          type: 'UPDATE_OPERATION',
          operation: response.data
        })
        toast.error(
          <ToastContent color={'success'} message={'Operation modifié avec succès!!'} header={'Operation'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )
      })
      .then(() => {
         dispatch(getData(getState().operations.params))
        dispatch(getAllData()) 
      })
      .catch(error => {
        console.log('update operation error : ', error)
        toast.error(
          <ToastContent color={'danger'} message={JSON.stringify(error)} header={'Attention'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 4000 }
        )
      })
  }
}

// ** Delete user
export const deleteOperation = id => {
  return (dispatch, getState) => {
    axios
      .delete(`operations/${id}/`)
      .then(response => {
        console.log('deleted')
        dispatch({
          type: 'DELETE_OPERATION'
        })
      })
      .then(() => {
        dispatch(getData(getState().operations.params))
        dispatch(getAllData())
      })
  }
}

// ** Filter Events
export const updateFilter = filter => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      filter
    })
    dispatch(fetchEvents(getState().calendar.selectedCalendars))
  }
}

// ** Add/Remove All Filters
export const updateAllFilters = value => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_ALL_FILTERS',
      value
    })
    dispatch(fetchEvents(getState().calendar.selectedCalendars))
  }
}

// ** Select Event (get event data on click)
export const selectOperation = event => {
  return dispatch => {
    dispatch({
      type: 'SELECT_OPERATION',
      event
    })
  }
}