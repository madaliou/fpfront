// ** React Import
import { useEffect, useState, Fragment } from 'react'
import Select from 'react-select'
import { selectThemeColors, isObjEmpty } from '@utils'
import moment from 'moment'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
// ** Custom Components
import Sidebar from '@components/sidebar'
// ** Third Party Components
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Col, FormText,
   Form, Input, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Store & Actions
import { addOperation } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast, Slide } from 'react-toastify'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import NumberInput from '@components/number-input'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
 
  const [budgets, setBudgets] = useState([])
  const [budget, setBudget] = useState('')
  const [accounts, setAccounts] = useState([])
  const [sourceAccount, setSourceAccount] = useState('')
  const [destinationAccount, setDestinationAccount] = useState('')
  const [exploitations, setExploitations] = useState([])
  const [exploitation, setExploitation] = useState('')
  const [operationType, setOperationType] = useState('output')
  const [operationTime, setOperationTime] = useState(moment(new Date()).format('H:m'))
  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [previewArr, setPreviewArr] = useState([])
  const [proofs, setProofs] = useState([])

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.budgets)
  const accountStore = useSelector(state => state.accounts)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

    //** ComponentDidMount
  useEffect(() => {

    axios.get('budgets').then(response => {
      setBudgets(response.data)
    })
    axios.get('accounts').then(response => {
      setAccounts(response.data)
    })
    axios.get('exploitations').then(response => {
      setExploitations(response.data)
    })   
  }, [])

  const createFormData = (proofs, body) => {
    console.log('formData proofs : ', proofs)
    const data = new FormData()
    //data.append('proofs', proofs)

    proofs.forEach(photo => {
      console.log('a picture : ', photo)
        
      data.append('proofs', photo)
    }) 

    Object.keys(body).forEach(key => {
      data.append(key, body[key])
    })
    return data 
  }

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      try {
        const newOperation = {
          title: values.title,
          amount: values.amount,
          description: values.description,
          sourceAccount,
          destinationAccount,
          budget,
          exploitation,
          start: startDate,
          operationTime,
          operationType
        }
       //console.log('newOperation : ', newOperation) 
      toggleSidebar()
      setProofs([])
     
      const payload = createFormData(proofs, newOperation)
           dispatch(
          addOperation(payload)
        )  
      } catch (error) {    
          console.log('create budget error : ', error)
      }      
    }
  }


  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    
    console.log('one file : ', file)
    const arr = previewArr    
    arr.push(preview)
    setPreviewArr([...arr])
    const arr2 = proofs
    arr2.push(file.data)    
    setProofs([...arr2])
    console.log('operationProofs : ', proofs)
  })

  const updateCurrImg1 = (input) => {
    if (input.target.files && input.target.files[0]) {
      const length = input.srcElement.files.length
      for (let i = 0; i < length; i++) {
        const reader = new FileReader()
        reader.onload = e => {
          // unshift
          /* this.dataImg1.unshift(e.target.result)
          this.dataImg1_file.unshift(this.$refs.updateImgInput1.files[i]) */

        }
        reader.readAsDataURL(input.target.files[i])
      }
    }
  }

  const handleChange = (event) => {
    
    const arr2 = proofs
        
    arr2.push(event.target.files[0])  

    setProofs([...arr2])
    console.log('proofs after pushes : ', proofs)
      
  }

  const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src} alt='avatar' />)
    } else {
      return null
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Nouvelle Opération'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>

      <FormGroup>
          <Label for='accountForm'>Type d'operation</Label>
          <Input type='select' id='accountForm' name='accountForm' value={operationType} onChange={e => {
            console.log('restoaa : ', e.target.value)
            setOperationType(e.target.value)
          } }>
            <option value='output'>Sortie</option>
            <option value='entrance'>Entrée</option>
            <option value='transfer'>Virement</option>
            </Input>
        </FormGroup>

      <FormGroup className='mt-1'>
          <Label for='title'>
            Libellé <span className='text-danger'>*</span>
          </Label>
          <Input
            name='title'
            id='title'
            placeholder=''
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['title'] })}
          />
        </FormGroup>
        <FormGroup className='mt-1'>
          <Label for='description'>
            Description <span className='text-danger'>*</span>
          </Label>
          <Input
            name='description'
            id='description'
            placeholder=''
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['description'] })}
          />
        </FormGroup>

        <FormGroup className='mt-1'>
          <Label for='amount'>
            Montant <span className='text-danger'>*</span>
          </Label>
          <Input
            name='amount'
            id='amount'
            placeholder=''
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['amount'] })}
          />
        </FormGroup>

      <FormGroup className='mb-2'>
      
        <Label>Date </Label>
        <Flatpickr className='form-control' value={startDate} 
        onChange={date => {
          //console.log('selected date : ', moment(new Date(date)).format('YYYY-MM-DD'))
          setStartDate(moment(new Date(date)).format('YYYY-MM-DD'))
          }} id='default-picker' />
        </FormGroup>

        <FormGroup className='mb-2'>
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

        <FormGroup className='mb-2'>
        <Label>Budget </Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={budgets}
              isClearable={false}
              onChange={item => {
                setBudget(item.id)
              }}
            />
          </FormGroup>

          <FormGroup className='mb-2'>
        <Label>Exploitation </Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={exploitations}
              isClearable={false}
              onChange={item => {
                setExploitation(item.id)
              }}
            />
          </FormGroup>

          <FormGroup className='mb-2'>
        <Label>Compte source </Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={accounts}
              isClearable={false}
              onChange={item => {
                setSourceAccount(item.id)
              }}
            />
          </FormGroup>

          <FormGroup className='mb-2'>
        <Label>Compte destination </Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={accounts}
              isClearable={false}
              onChange={item => {
                setDestinationAccount(item.id)
              }}
            />
          </FormGroup>

          <FormGroup className='mb-2'>
          {/* <input type="file" id="file" multiple name="file" onChange={handleChange} /> */}
          <Card>
            <CardHeader>
              <CardTitle tag='h4'> Preuve(s)</CardTitle>
            </CardHeader>
            <CardBody>
              <DragDrop uppy={uppy} />
              {renderPreview()}
            </CardBody>
          </Card>
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
