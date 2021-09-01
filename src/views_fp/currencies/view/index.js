// ** React Imports
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getCurrency } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import UserInfoCard from './InfoCard'
import UserTimeline from './Timeline'
//import InvoiceList from '../../invoice/list'
import PermissionsTable from './PermissionsTable'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = props => {
  // ** Vars
  const store = useSelector(state => state.exploitations),
    dispatch = useDispatch(),
    { id } = useParams()
  console.log('exploitation store : ', store)
  // ** Get suer on mount
  useEffect(() => {
    dispatch(getCurrency(parseInt(id)))
  }, [dispatch])

  return store.selectedCurrency !== null && store.selectedCurrency !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='12' lg='12' md='12'>
          <UserInfoCard selectedCurrency={store.selectedCurrency} />
        </Col>
        {/*<Col xl='3' lg='4' md='5'>
           <PlanCard selectedCurrency={store.selectedCurrency} /> 
        </Col>*/}
      </Row>
     {/*  <Row>
        <Col md='6'>
          <UserTimeline />
        </Col>
        <Col md='6'>
          <PermissionsTable />
        </Col>
      </Row> */}
      <Row>
        <Col sm='12'>
         {/*  <InvoiceList /> */}
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView
