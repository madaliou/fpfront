// ** React Import
import { useEffect, useState, Fragment } from 'react'
import Select from 'react-select'
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Third Party Components
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Col, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addAccount } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast, Slide } from 'react-toastify'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import NumberInput from '@components/number-input'


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
  const [parentAccount, setParentAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [accounts, setAccounts] = useState([])
  const store = useSelector(state => state.accounts)

  // ** Store Vars
  const dispatch = useDispatch()

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
        balance: values.balance,
        accountForm,
        accountType,
        parentAccount,
        currency
      }) 
      toggleSidebar()
      try {
          dispatch(
          addAccount({          
            wording: values.wording,
            balance: values.balance,
            accountForm,
            accountType,
            parentAccount,
            currency
          })
        ) 
       /*  toast.success(
          <ToastContent message={'Compte créé avec succès!!'} />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        ) */
      } catch (error) {    
          console.log('create account error : ', error)
         
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

      <FormGroup className='mb-2'>
        <Label>Parent</Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={store.allAccounts}
              isClearable={false}
              onChange={item => {
                setParentAccount(item.id)
              }}
            />
            </FormGroup>

            <Label>Devise<span className='text-danger'>*</span></Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={currencies[0]}
              options={currencies}
              isClearable={false}
              onChange={item => {
                setCurrency(item.id)
              }}
            />

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
        <FormGroup>
          <Label for='balance'>
            Solde 
          </Label>
            {/* <NumberInput id='basic-number-input' value={balance} onChange={balance => setBalance(balance)} /> */}
          <Input
            name='balance'
            id='balance'
            placeholder=''
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['balance'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='accountForm'>Forme de Compte</Label>
          <Input type='select' id='accountForm' name='accountForm' value={accountForm} onChange={e => {
            console.log('restoaa : ', e.target.value)
            setAccountForm(e.target.value)
          } }>
            <option value='physicalAccount'>Compte physique</option>
            <option value='logicalAccount'>Compte logique</option>
           
          </Input>
        </FormGroup>
        <FormGroup className='mb-2' value={accountType} onChange={e => setAccountType(e.target.value)}>
          <Label for='accountType'>Type de Compte</Label>
          <Input type='select' id='accountType' name='accountType'>
            <option value='standardAccount'>Compte standard</option>
            <option value='cashAccount'>Compte de trésorerie</option>
            
          </Input>
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
