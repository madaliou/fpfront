// ** Initial State
const initialState = {
  allBudgets: [],
  data: [],
  total: 1,
  params: {},
  selectedBudget: null
}

const budgets = (state = initialState, action) => {
 
  switch (action.type) {
    case 'GET_ALL_BUDGETS':
      return { ...state, allBudgets: action.data }
    case 'GET_BUDGETS':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_BUDGET':      
      return { ...state, selectedBudget: action.selectedBudget }
    case 'ADD_BUDGET':
      return { ...state }
    case 'UPDATE_BUDGET':
      return { ...state }
    case 'DELETE_BUDGET':
      return { ...state }
    default:
      return { ...state }
  }
}
export default budgets
