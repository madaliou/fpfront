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
    case 'DELETE_ACCOUNT':
      return { ...state }
    default:
      return { ...state }
  }
}
export default accounts
