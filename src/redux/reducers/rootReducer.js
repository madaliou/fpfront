// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
import users from '@src/views/apps/user/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'

import accounts from '@src/views_fp/accounts/store/reducer'
import budgets from '@src/views_fp/budgets/store/reducer'
import exploitations from '@src/views_fp/exploitations/store/reducer'
import currencies from '@src/views_fp/currencies/store/reducer'
import operations from '@src/views_fp/operations/store/reducer'

const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  accounts,
  budgets,
  exploitations,
  currencies,
  operations
})

export default rootReducer
