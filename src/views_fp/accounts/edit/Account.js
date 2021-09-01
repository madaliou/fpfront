// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
// ** Custom Components
import Avatar from '@components/avatar'
import { selectThemeColors, isObjEmpty } from '@utils'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { editAccount } from '../store/action'
import { useParams, Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { toast, Slide } from 'react-toastify'

// ** Third Party Components
import { Lock, Edit, Trash2, Coffee} from 'react-feather'
import { Media, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput } from 'reactstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)
 
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

const UserAccountTab = ({ selectedAccount }) => {
  // ** States
  const [img, setImg] = useState(null)
  const [userData, setUserData] = useState(null)
  const [currencies, setCurrencies] = useState([])
  const [currency, setCurrency] = useState({})
  const [parentAccount, setParentAccount] = useState({})
  const [accountType, setAccountType] = useState(selectedAccount.accountType)
  const [accountForm, setAccountForm] = useState(selectedAccount.accountForm)

  const store = useSelector(state => state.accounts)

  const dispatch = useDispatch()

  const history = useHistory()

  // ** Function to change user image
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  // ** Update user image on mount or change
  useEffect(() => {
       if (selectedAccount.parentAccount !== null) {
        setParentAccount({label:  selectedAccount.parentAccount.wording, value: selectedAccount.parentAccount.id, id:  selectedAccount.parentAccount.id})
      }    
      setCurrency({label:  selectedAccount.currency.wording, value: selectedAccount.currency.id, id: selectedAccount.currency.id})

    if (selectedAccount !== null || (selectedAccount !== null && userData !== null && selectedAccount.id !== userData.id)) {
      setUserData(selectedAccount)     
    
      console.log('currency : ', currency)
    
    }
    axios.get('currencies').then(response => {
      setCurrencies(response.data)
    })

  }, [selectedAccount])

  // ** Vars
 const { register, errors, handleSubmit } = useForm()
 // ** Function to handle form submit
 const onSubmit = values => {
   console.log('eric : ', values)
   if (isObjEmpty(errors)) {
      console.log('values : ', {
        id: selectedAccount.id,          
        wording: values.wording,
        balance: values.balance,
        accountForm,
        accountType,
        parentAccount: parentAccount.id,
        currency: currency.id
      }) 
     
     dispatch(
       editAccount({   
          id: selectedAccount.id,        
         wording: values.wording,
         balance: values.balance,
         accountForm,
         accountType,
         parentAccount: parentAccount.id,
         currency: currency.id
       })
     ) 

     /* MySwal.fire({
      title: 'Succès',
      text: "Le compte a été modifié avec succès",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        return (<Link to="/apps/accounts/list" className="btn btn-primary"></Link>)
      }
    }) */
     
     /* toast.error(
       <ToastContent message={'Compte modifié avec succès!!'} />,
       { transition: Slide, hideProgressBar: true, autoClose: 2000 }
     ) */
     history.push('/accounts/list')

   }
 }

  // ** Renders User
  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mr-2 my-25'
          content={selectedAccount.fullName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    } else {
      return (
        <img
          className='user-avatar rounded mr-2 my-25 cursor-pointer'
          src={img}
          alt='user profile avatar'
          height='90'
          width='90'
        />
      )
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Media className='mb-2'>
         {/*  {renderUserAvatar()} */}
          <Media className='mt-50' body>
            <h4>{selectedAccount.fullName} </h4>
            <div className='d-flex flex-wrap mt-1 px-0'>
              {/* <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                <span className='d-none d-sm-block'>Change</span>
                <span className='d-block d-sm-none'>
                  <Edit size={14} />
                </span>
                <input type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
              </Button.Ripple>
              <Button.Ripple color='secondary' outline>
                <span className='d-none d-sm-block'>Remove</span>
                <span className='d-block d-sm-none'>
                  <Trash2 size={14} />
                </span>
              </Button.Ripple> */}
            </div>
          </Media>
        </Media>
      </Col>
      <Col sm='12'>
        {/* <Form onSubmit={e => e.preventDefault()}> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='username'>Parent</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  value={parentAccount}
                  options={store.allAccounts}
                  isClearable={false}
                  onChange={item => {
                    setParentAccount(item)
                  }}
                />
              </FormGroup>
            </Col>

           
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='wording'>Libellé</Label>
                <Input innerRef={register({ required: true })} id='wording' name='wording' placeholder='Libellé' defaultValue={userData && userData.wording} />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='balance'>Solde</Label>
                <Input innerRef={register({ required: true })} id='balance' name='balance' placeholder='Solde' defaultValue={userData && userData.balance} />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='accountType'>Type de Compte</Label>
                <Input type='select' name='accountType' id='accountType'
                 defaultValue={userData && userData.accountType}
                 onChange={e => {
                  console.log('restoaa : ', e.target.value)
                  setAccountType(e.target.value)
                } }>
                <option value='standardAccount'>Compte standard</option>
                <option value='cashAccount'>Compte de trésorerie</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
            <FormGroup>
                <Label for='accountForm'>Forme de Compte</Label>
                <Input type='select' name='accountForm' id='accountForm' defaultValue={userData && userData.accountForm}
                  onChange={e => {
                  console.log('restoaa : ', e.target.value)
                  setAccountForm(e.target.value)
                } }>
                <option value='physicalAccount'>Compte physique</option>
            <option value='logicalAccount'>Compte logique</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='company'>Devise</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  value={currency}
                  options={currencies}
                  isClearable={false}
                  onChange={item => {
                    setCurrency(item)
                  }}
                />
              </FormGroup>
            </Col>
            {/* <Col sm='12'>
              <div className='permissions border mt-1'>
                <h6 className='py-1 mx-1 mb-0 font-medium-2'>
                  <Lock size={18} className='mr-25' />
                  <span className='align-middle'>Permissions</span>
                </h6>
                <Table borderless striped responsive>
                  <thead className='thead-light'>
                    <tr>
                      <th>Module</th>
                      <th>Read</th>
                      <th>Write</th>
                      <th>Create</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Admin</td>
                      <td>
                        <CustomInput type='checkbox' id='admin-1' label='' defaultChecked />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='admin-2' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='admin-3' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='admin-4' label='' />
                      </td>
                    </tr>
                    <tr>
                      <td>Staff</td>
                      <td>
                        <CustomInput type='checkbox' id='staff-1' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='staff-2' label='' defaultChecked />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='staff-3' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='staff-4' label='' />
                      </td>
                    </tr>
                    <tr>
                      <td>Author</td>
                      <td>
                        <CustomInput type='checkbox' id='author-1' label='' defaultChecked />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='author-2' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='author-3' label='' defaultChecked />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='author-4' label='' />
                      </td>
                    </tr>
                    <tr>
                      <td>Contributor</td>
                      <td>
                        <CustomInput type='checkbox' id='contributor-1' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='contributor-2' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='contributor-3' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='contributor-4' label='' />
                      </td>
                    </tr>
                    <tr>
                      <td>User</td>
                      <td>
                        <CustomInput type='checkbox' id='user-1' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='user-2' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='user-3' label='' />
                      </td>
                      <td>
                        <CustomInput type='checkbox' id='user-4' label='' defaultChecked />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col> */}
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                Valider
              </Button.Ripple>
              {/* <Button.Ripple color='secondary' outline>
                Reset
              </Button.Ripple> */}
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
export default UserAccountTab
