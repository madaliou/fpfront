// ** React Import
import { useEffect, useState, Fragment } from 'react'
import Select from 'react-select'
import { selectThemeColors, isObjEmpty } from '@utils'
import moment from 'moment'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Third Party Components
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Col, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addBudget } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast, Slide } from 'react-toastify'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import NumberInput from '@components/number-input'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const ToastContent = ({ message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Succès</h6>
      </div>
    </div>
    <div className='toastify-body' style={{background: '#gray'}}>
      <span>{message}</span>
    </div>
  </Fragment>
)

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [accountType, setAccountType] = useState('standardAccount')
  const [accountForm, setAccountForm] = useState('logicalAccount')
  const [currencies, setCurrencies] = useState([])
  const [currency, setCurrency] = useState(2)
  const [account, setAccount] = useState('')
  const [provisionalAmount, setBalance] = useState(0)
  const [accounts, setAccounts] = useState([])
  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.budgets)
  const accountStore = useSelector(state => state.accounts)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

    //** ComponentDidMount
  useEffect(() => {
    axios.get('currencies').then(response => {
      setCurrencies(response.data)
    })

    axios.get('accounts').then(response => {
      setAccounts(response.data)
    })
    
  }, [])

  /* useEffect(() => {
  (async () => {
    const getCurrenciesPromise = axios.get('currencies')
    const getAccountsPromise = axios.get('accounts')

    const [getCurrencies, getAccounts] = await Promise.all([getCurrenciesPromise, getAccountsPromise])

    setCurrencies(getCurrencies.data)
    setAccounts(getAccounts.data)
  })()
}, [])  */
  

  const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
  ]

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
       console.log('values : ', {          
        wording: values.wording,
        provisionalAmount: values.provisionalAmount,
        account,
        startDate,
        endDate
      }) 
      toggleSidebar()
      try {
          dispatch(
          addBudget({          
            wording: values.wording,
            provisionalAmount: values.provisionalAmount,
            account,
            startDate,
            endDate

          })
        ) 
      } catch (error) {    
          console.log('create budget error : ', error)
         
      }      
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New Account'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>

      <FormGroup className='mt-1'>
          <Label for='wording'>
            Libellé <span className='text-danger'>*</span>
          </Label>
          <Input
            name='wording'
            id='wording'
            placeholder=''
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['wording'] })}
          />
        </FormGroup>

      <FormGroup className='mb-2'>
      
        <Label>Date début </Label>
        <Flatpickr className='form-control' value={startDate} 
        onChange={date => {
          //console.log('selected date : ', moment(new Date(date)).format('YYYY-MM-DD'))
          setStartDate(moment(new Date(date)).format('YYYY-MM-DD'))
          }} id='default-picker' />
        </FormGroup>

        <FormGroup className='mb-2'>
        <Label>Date fin </Label>
        <Flatpickr className='form-control' value={endDate} 
        onChange={date => setEndDate(moment(new Date(date)).format('YYYY-MM-DD'))} id='default-picker' />
        </FormGroup>
      
        <FormGroup>
          <Label for='provisionalAmount'>
            Montant prévisionnel 
          </Label>
            {/* <NumberInput id='basic-number-input' value={provisionalAmount} onChange={provisionalAmount => setBalance(provisionalAmount)} /> */}
          <Input
            name='provisionalAmount'
            id='provisionalAmount'
            placeholder=''
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['provisionalAmount'] })}
          />
        </FormGroup>

        <FormGroup className='mb-2'>
        <Label>Compte </Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={accounts}
              isClearable={false}
              onChange={item => {
                setAccount(item.id)
              }}
            />
          </FormGroup>

        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
