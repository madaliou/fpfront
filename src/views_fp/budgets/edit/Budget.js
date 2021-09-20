// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
// ** Custom Components
import Avatar from '@components/avatar'
import { selectThemeColors, isObjEmpty } from '@utils'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { editBudget } from '../store/action'
import { useParams, Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { toast, Slide } from 'react-toastify'

// ** Third Party Components
import { Lock, Edit, Trash2, Coffee} from 'react-feather'
import { Media, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput } from 'reactstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'

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

const UserAccountTab = ({ selectedBudget }) => {
  // ** States
  const [img, setImg] = useState(null)
  const [userData, setUserData] = useState(null)
  const [exploitations, setExploitations] = useState([])
  const [exploitation, setExploitation] = useState({})
  const [startDate, setStartDate] = useState(selectedBudget.startDate)
  const [endDate, setEndDate] = useState(selectedBudget.endDate)

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
       if (selectedBudget.exploitation !== null) {
        setExploitation({label:  selectedBudget.exploitation.wording, value: selectedBudget.exploitation.id, id:  selectedBudget.exploitation.id})
      }    
      //setCurrency({label:  selectedBudget.currency.wording, value: selectedBudget.currency.id, id: selectedBudget.currency.id})

    if (selectedBudget !== null || (selectedBudget !== null && userData !== null && selectedBudget.id !== userData.id)) {
      setUserData(selectedBudget)     
        
    }
    

    axios.get('exploitations').then(response => {
      setExploitations(response.data)
    })
  }, [selectedBudget])

  // ** Vars
 const { register, errors, handleSubmit } = useForm()
 // ** Function to handle form submit
 const onSubmit = values => {
   console.log('eric : ', values)
   if (isObjEmpty(errors)) {
      console.log('update values  : ', {
        id: selectedBudget.id,          
        wording: values.wording,
        exploitation: exploitation.id,
        startDate,
        endDate
        
      }) 
     
     dispatch(
       editBudget({   
          id: selectedBudget.id,        
         wording: values.wording,
         exploitation: exploitation.id,
         startDate,
         endDate        
       })
     )     
     
     history.push('/budgets/list')

   }
 }

  return (
    <Row>
      <Col sm='12'>
        <Media className='mb-2'>
         {/*  {renderUserAvatar()} */}
          <Media className='mt-50' body>
            <h4>{selectedBudget.fullName} </h4>
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
                <Label for='username'>Exploitation</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  value={exploitation}
                  options={exploitations}
                  isClearable={false}
                  onChange={item => {
                    setExploitation(item)
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
          {/*   <Col md='4' sm='12'>
              <FormGroup>
                <Label for='provisionalAmount'>Montant prévi.</Label>
                <Input innerRef={register({ required: true })} id='provisionalAmount' name='provisionalAmount' placeholder='Solde' defaultValue={userData && userData.provisionalAmount} />
              </FormGroup>
            </Col> */}
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='startDate'>Date début</Label>
                <Flatpickr className='form-control' value={startDate} 
                  onChange={date => {
                    setStartDate(moment(new Date(date)).format('YYYY-MM-DD'))
                    }} id='default-picker' />
               
              </FormGroup>
              </Col>
              <Col md='4' sm='12'>
              <FormGroup>
                <Label for='startDate'>Date fin</Label>
                <Flatpickr className='form-control' value={endDate} 
                  onChange={date => {
                    setEndDate(moment(new Date(date)).format('YYYY-MM-DD'))
                    }} id='default-picker' />
               
              </FormGroup>
            </Col>
            
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
