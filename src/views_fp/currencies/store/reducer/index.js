// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedCurrency: null
}

const currencies = (state = initialState, action) => {
 
  switch (action.type) {
    case 'GET_ALL_CURRENCIES':
      return { ...state, allData: action.data }
    case 'GET_CURRENCIES':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_CURRENCY':      
      return { ...state, selectedCurrency: action.selectedCurrency }
    case 'ADD_CURRENCY':
      return { ...state }
    case 'UPDATE_CURRENCY': {
      const user = action.currency

      console.log('oiuoioo', user)

      //clone the current state
      const clone = JSON.parse(JSON.stringify(state.currencies))

      //check if user already exist
      const index = clone.findIndex(obj => obj.id === user.id)

      //if the user is in the array, replace the user
      if (index !== -1) {
        clone[index] = user
      }

      return {...state, currencies: clone, fullData: clone}
    }
    case 'DELETE_CURRENCY':
      return { ...state }
    default:
      return { ...state }
  }
}
export default currencies
