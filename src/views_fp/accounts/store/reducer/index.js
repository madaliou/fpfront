// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedUser: null,
  selectedAccount: 'test2'
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
    case 'UPDATE_ACCOUNT': {
      const user = action.account

      console.log('oiuoioo', user)

      //clone the current state
      const clone = JSON.parse(JSON.stringify(state.users))

      //check if user already exist
      const index = clone.findIndex(obj => obj.id === user.id)

      //if the user is in the array, replace the user
      if (index !== -1) {
        clone[index] = user
      }

      return {...state, users: clone, fullData: clone}
    }
    case 'DELETE_ACCOUNT':
      return { ...state }
    default:
      return { ...state }
  }
}
export default users
