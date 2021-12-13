// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
// ** Custom Components
import Avatar from '@components/avatar'
import { selectThemeColors, isObjEmpty } from '@utils'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { editOperation } from '../store/action'
import { useParams, Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { toast, Slide } from 'react-toastify'

// ** Third Party Components
import { Lock, Edit, Trash2, Coffee} from 'react-feather'
import { Media, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
// ** Custom Components
import Sidebar from '@components/sidebar'

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

const UserAccountTab = ({ selectedOperation }) => {
  
  // ** States
  const [img, setImg] = useState(null)
  const [operationData, setUserData] = useState(null)
  const [budgets, setBudgets] = useState([])
  const [budget, setBudget] = useState({id:''})
  const [start, setStart] = useState('')
  const [postingDate, setPostingDate] = useState('')
  const [operationTime, setOperationTime] = useState('')
  const [operationType, setOperationType] = useState('')
  const [exploitation, setExploitation] = useState({id:''})
  const [exploitations, setExploitations] = useState([])
  const [accounts, setAccounts] = useState([])
  const [sourceAccount, setSourceAccount] = useState({label:  selectedOperation.sourceAccount.wording, value: selectedOperation.sourceAccount.id, id:  selectedOperation.sourceAccount.id})
  const [destinationAccount, setDestinationAccount] = useState({label:  selectedOperation.destinationAccount.wording, value: selectedOperation.destinationAccount.id, id:  selectedOperation.destinationAccount.id})
  const [previewArr, setPreviewArr] = useState([])
  const [proofs, setProofs] = useState(selectedOperation.operationPictures)

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

        setOperationTime(selectedOperation.operationTime)
        setOperationType(selectedOperation.operationType)
        setStart(selectedOperation.start)
        setPostingDate(selectedOperation.postingDate)
            
       if (selectedOperation.budget !== null) {
        setBudget({label:  selectedOperation.budget.wording, value: selectedOperation.budget.id, id:  selectedOperation.budget.id})
      }  
      
      if (selectedOperation.exploitation !== null) {
        setExploitation({label:  selectedOperation.exploitation.wording, value: selectedOperation.exploitation.id, id:  selectedOperation.exploitation.id})
      } 
      //setCurrency({label:  selectedOperation.currency.wording, value: selectedOperation.currency.id, id: selectedOperation.currency.id})

    if (selectedOperation !== null || (selectedOperation !== null && operationData !== null && selectedOperation.id !== operationData.id)) {
      setUserData(selectedOperation)    
    }    

    axios.get('budgets').then(response => {
      setBudgets(response.data)
    })
    axios.get('exploitations').then(response => {
      setExploitations(response.data)
    })
    axios.get('accounts').then(response => {
      setAccounts(response.data)
    })
    console.log('selected opé : ', selectedOperation)
  }, [selectedOperation])

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    
    //console.log('one file : ', file)
    const arr = previewArr    
    arr.push(preview)
    setPreviewArr([...arr])

    const arr2 = proofs
    arr2.push(file.data)    
    setProofs([...arr2])
    //console.log('operationProofs : ', proofs)
  })

  const renderOldImages = () => {
    //const file_url = 'http://188.165.235.13/myfpbackend'
    const file_url = 'https://file.assurtrans.com/myfpbackend'
    if (selectedOperation.operationPictures.length) {
      return selectedOperation.operationPictures.map((src, index) => <img key={index} className='rounded mt-2 mr-1' 
      src={`${file_url}${src.url}`} alt='avatar' width="200"/>)
    } else {
      return null
    }
  }

  const renderPreview = () => {
    
    if (previewArr.length) {
      return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src} alt='avatar' />)
    } else {
      return null
    }
  }

  const createFormData = (proofs, body) => {
    //console.log('formData proofs : ', proofs)
    const data = new FormData()
    //data.append('proofs', proofs)

    proofs.forEach(photo => {
      //console.log('a picture : ', photo)
        
      data.append('proofs', photo)
    }) 

    Object.keys(body).forEach(key => {
      data.append(key, body[key])
    })
    return data 
  }


  // ** Vars
 const { register, errors, handleSubmit } = useForm()
 // ** Function to handle form submit
 const onSubmit = values => {
   //console.log('eric : ', values)
   if (isObjEmpty(errors)) {

     const modifiedOperation = {
        id: selectedOperation.id,          
        title: values.title,
        amount: values.amount,
        description: values.description,
        budget: budget.id,
        exploitation: exploitation.id,
        sourceAccount: sourceAccount.id,
        destinationAccount: destinationAccount.id,
        start,
        postingDate,
        operationTime,
        operationType        
      }     
      //setProofs([])
      console.log('modified operation : ', modifiedOperation)
     
      const payload = createFormData(proofs, modifiedOperation)
           dispatch(
          editOperation(selectedOperation.id, payload)
        )  
     history.push('/operations/list')

   }
 }

  return (
    <Row>
      <Col sm='12'>
        <Media className='mb-2'>
         {/*  {renderUserAvatar()} */}
          <Media className='mt-50' body>
            <h4>{selectedOperation.fullName} </h4>
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
                <Label for='title'>Type d'opération</Label>
                <Input type='select' id='operationType' name='operationType' value={operationType} onChange={e => {
            
            setOperationType(e.target.value)
          } }>
            <option value='output'>Sortie</option>
            <option value='entrance'>Entrée</option>
            <option value='transfer'>Virement</option>
            </Input>
              </FormGroup>
            </Col>

          <Col md='4' sm='12'>
              <FormGroup>
                <Label for='title'>Libellé</Label>
                <Input innerRef={register({ required: true })} id='title' name='title' placeholder='Libellé' defaultValue={operationData && operationData.title} />
              </FormGroup>
            </Col>

            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='description'>Description</Label>
                <Input  type='textarea' innerRef={register({ required: true })} id='description' name='description' placeholder='Description' defaultValue={operationData && operationData.description} />
              </FormGroup>
            </Col>

            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='amount'>Montant</Label>
                <Input innerRef={register({ required: true })} id='amount' name='amount' placeholder='Montant' defaultValue={operationData && operationData.amount} />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='username'>Budget</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  value={budget}
                  options={budgets}
                  isClearable={false}
                  onChange={item => {
                    setBudget(item)
                  }}
                />
              </FormGroup>
            </Col>

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
                <Label for='username'>Compte source</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  value={sourceAccount}
                  options={accounts}
                  isClearable={false}
                  onChange={item => {
                    setSourceAccount(item)
                  }}
                />
              </FormGroup>
            </Col>

            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='username'>Compte destination</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  value={destinationAccount}
                  options={accounts}
                  isClearable={false}
                  onChange={item => {
                    setDestinationAccount(item)
                  }}
                />
              </FormGroup>
            </Col>

            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='start'>Date </Label>
                <Flatpickr className='form-control' value={start} 
                  onChange={date => {
                    setStart(moment(new Date(date)).format('YYYY-MM-DD'))
                    }} id='default-picker' />
               
              </FormGroup>
              </Col>

              <Col md='4' sm='12'>
              <FormGroup>
                <Label for='start'>Date de comptabilisation </Label>
                <Flatpickr className='form-control' value={postingDate} 
                  onChange={date => {
                    setPostingDate(moment(new Date(date)).format('YYYY-MM-DD'))
                    }} id='default-picker' />
               
              </FormGroup>
              </Col>
              <Col md='4' sm='12'>
              <FormGroup>
                <Label for='operationTime'>Heure</Label>

<Flatpickr
        className='form-control'
        value={operationTime}
        id='timepicker'
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true
        }}
        onChange={date => {
          //console.log('selected date : ', moment(new Date(date)).format('H:m:s'))
          setOperationTime(moment(new Date(date)).format('H:m'))
        }}
      />
               
              </FormGroup>


            </Col>
            <Col md='4' sm='12'>
            <Card>
            <CardHeader>
              <CardTitle tag='h4'> Preuve(s)</CardTitle>
            </CardHeader>
            <CardBody>
              <DragDrop uppy={uppy} />
              {renderPreview()}
              {renderOldImages()}
            </CardBody>
          </Card>
            
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
