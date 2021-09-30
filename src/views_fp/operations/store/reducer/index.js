// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedOperation: null,
  selectedEvent: {},
  selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
}

const operations = (state = initialState, action) => {
 
  switch (action.type) {
    case 'GET_ALL_OPERATIONS':
      return { ...state, allData: action.data, data: action.data }
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
    case 'UPDATE_FILTERS':
      // ** Updates Filters based on action filter
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.filter)
      if (state.selectedCalendars.includes(action.filter)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.filter)
      }
      if (state.selectedCalendars.length === 0) {
        state.allData.length = 0
      }
      return { ...state }
    case 'UPDATE_ALL_FILTERS':
      // ** Updates All Filters based on action value
      const value = action.value
      let selected = []
      if (value === true) {
        selected = ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
      } else {
        selected = []
      }
      return { ...state, selectedCalendars: selected }
    case 'SELECT_OPERATION':
      return { ...state, selectedEvent: action.event }
    default:
      return { ...state }
  }
}
export default operations
