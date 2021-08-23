// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedUser: null
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ACCOUNT':
      return { ...state, selectedUser: action.selectedUser }
    case 'ADD_ACCOUNT':
      return { ...state }
    case 'DELETE_ACCOUNT':
      return { ...state }
    default:
      return { ...state }
  }
}
export default users
