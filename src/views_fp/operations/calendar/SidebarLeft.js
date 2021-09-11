// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import classnames from 'classnames'
import { CardBody, Button, CustomInput, Label } from 'reactstrap'

// ** illustration import
import illustration from '@src/assets/images/pages/calendar-illustration.png'
import Select from 'react-select'
import { selectThemeColors, isObjEmpty } from '@utils'
import axios from 'axios'
import {
  getData,
  selectOperation,
  editOperation,
  updateFilter,
  updateAllFilters,
  addOperation,
  deleteOperation
} from '../store/action/index'
import { useSelector, useDispatch } from 'react-redux'


// ** Filters Checkbox Array
const filters = [
  { label: 'Personal', color: 'danger', className: 'custom-control-danger mb-1' },
  { label: 'Business', color: 'primary', className: 'custom-control-primary mb-1' },
  { label: 'Family', color: 'warning', className: 'custom-control-warning mb-1' },
  { label: 'Holiday', color: 'success', className: 'custom-control-success mb-1' },
  { label: 'ETC', color: 'info', className: 'custom-control-info' }
]

const SidebarLeft = props => {
  const [accounts, setAccounts] = useState([])
  const [cashAccounts, setCashAccounts] = useState([])
  const [exploitations, setExploitations] = useState([])
  const [exploitation, setExploitation] = useState('')
  const [operations, setOperations] = useState(props.store.allData)

  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

  useEffect(() => {
   
    axios.get('cash-account').then(response => {
      setAccounts(response.data)
    })

    axios.get('exploitations').then(response => {
      setExploitations(response.data)
    })
  }, [])

  const selectedAccounts = []

  return (
    <Fragment>
      <div className='sidebar-wrapper'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
         {/*  <Button.Ripple color='primary' block onClick={handleAddEventClick}>
            <span className='align-middle'>Ajouter</span>
          </Button.Ripple> */}
        </CardBody>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Filtres</span>
          </h5>
        {/*   <CustomInput
            type='checkbox'
            className='mb-1'
            label='View All'
            id='view-all'
            checked={store.selectedCalendars.length === filters.length}
            onChange={e => dispatch(updateAllFilters(e.target.checked))}
          /> 
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <CustomInput
                    type='checkbox'
                    key={filter.label}
                    id={filter.label}
                    label={filter.label}
                    checked={store.selectedCalendars.includes(filter.label)}
                    className={classnames({
                      [filter.className]: filter.className
                    })}
                    onChange={e => dispatch(updateFilter(filter.label))}
                  />
                )
              })}
          </div>*/}

          <Label>Compte de trésorerie </Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={accounts}
              isClearable={false}
              isMulti
              onChange={ items =>  {
                console.log('hiii : ', items)
                //const result = 
                //setCashAccounts(items.map(a => a.id))       
                console.log('all op : ', operations)
                console.log('props.store.allData : ', props.store.allData)
                let filterOps = props.store.allData
                items.forEach(element => {
                  console.log('test micro')
                  filterOps = operations.filter(operation => operation.sourceAccount.id === element.id 
                    || operation.destinationAccount.id === element.id) 
                })           
                console.log(' Operations filtered : ', filterOps)
                setOperations(filterOps)
                //console.log('selected Accounts : ', cashAccounts)                
                //dispatch(getData({accounts: cashAccounts, exploitation}))  
                dispatch({
                  type: 'GET_OPERATIONS',
                  data: filterOps
                })               
              }}
            />
          </CardBody>
        <CardBody>
          <Label>Exploitation </Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={exploitations}
              isClearable={false}
              onChange={item => {
                console.log('set exploitation : ', item.id)
                setExploitation(item.id)

                const filter2Ops = operations.filter(operation => operation.exploitation.id === item.id) 
                //dispatch(getData({accounts: cashAccounts, exploitation}))*
                console.log(' Operations filtered : ', filter2Ops)
                
                dispatch({
                  type: 'GET_OPERATIONS',
                  data: filter2Ops
                })
              }}
            />
        </CardBody>
      </div>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
