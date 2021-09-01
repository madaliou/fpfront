// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedOperation: null
}

const operations = (state = initialState, action) => {
 
  switch (action.type) {
    case 'GET_ALL_OPERATIONS':
      return { ...state, allData: action.data }
    case 'GET_OPERATIONS':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_OPERATION':      
      return { ...state, selectedOperation: action.selectedOperation }
    case 'ADD_OPERATION':
      return { ...state }
    case 'UPDATE_OPERATION': 
    return { ...state }
    case 'DELETE_OPERATION':
      return { ...state }
    default:
      return { ...state }
  }
}
export default operations
