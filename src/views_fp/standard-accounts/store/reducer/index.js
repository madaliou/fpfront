// ** Initial State
const initialState = {
  allAccounts: [],
  data: [],
  total: 1,
  params: {},
  selectedAccount: null
}

const accounts = (state = initialState, action) => {
 
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...state, allAccounts: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ACCOUNT':      
      return { ...state, selectedAccount: action.selectedAccount }
    case 'ADD_ACCOUNT':
      return { ...state }
    case 'UPDATE_ACCOUNT':
      return { ...state}
    /* case 'UPDATE_ACCOUNT': {
      const user = action.account

      console.log('oiuoioo', user)

      //clone the current state
      const clone = JSON.parse(JSON.stringify(state.allAccounts))

      //check if user already exist
      const index = clone.findIndex(obj => obj.id === user.id)

      //if the user is in the array, replace the user
      if (index !== -1) {
        clone[index] = user
      }

      return {...state, allAccounts: clone, data: clone, fullData: clone}
    } */

    case 'DELETE_ACCOUNT':
      return { ...state }
    default:
      return { ...state }
  }
}
export default accounts
