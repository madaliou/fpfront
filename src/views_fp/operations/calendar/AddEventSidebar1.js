// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { toast } from 'react-toastify'
import Flatpickr from 'react-flatpickr'
import { X, Check, Trash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label,
  Col, FormText,
   Form, Input, Card, CardHeader, CardTitle, CardBody, CustomInput } from 'reactstrap'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Avatar Images
import img1 from '@src/assets/images/avatars/1-small.png'
import img2 from '@src/assets/images/avatars/3-small.png'
import img3 from '@src/assets/images/avatars/5-small.png'
import img4 from '@src/assets/images/avatars/7-small.png'
import img5 from '@src/assets/images/avatars/9-small.png'
import img6 from '@src/assets/images/avatars/11-small.png'

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addOperation } from '../store/action'

// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className='toastify-header pb-0'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={icon} />
        <h6 className='toast-title'>{title}</h6>
      </div>
    </div>
  </Fragment>
)

const AddEventSidebar = props => {
  // ** Props
  const {
    store,
    dispatch,
    open,
    handleAddEventSidebar,
    calendarsColor,
    calendarApi,
    refetchEvents,
    addEvent,
    selectEvent,
    updateEvent,
    removeEvent
  } = props

  // ** Vars
  const selectedEvent = store.selectedEvent
  const { register, errors, handleSubmit } = useForm()

  // ** States
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [guests, setGuests] = useState({})
  const [allDay, setAllDay] = useState(false)
  const [location, setLocation] = useState('')
  const [endPicker, setEndPicker] = useState(new Date())
  const [startPicker, setStartPicker] = useState(new Date())
  const [value, setValue] = useState([{ value: 'Business', label: 'Business', color: 'primary' }])

  // ** Select Options
  const options = [
    { value: 'Business', label: 'Business', color: 'primary' },
    { value: 'Personal', label: 'Personal', color: 'danger' },
    { value: 'Family', label: 'Family', color: 'warning' },
    { value: 'Holiday', label: 'Holiday', color: 'success' },
    { value: 'ETC', label: 'ETC', color: 'info' }
  ]

  const guestsOptions = [
    { value: 'Donna Frank', label: 'Donna Frank', avatar: img1 },
    { value: 'Jane Foster', label: 'Jane Foster', avatar: img2 },
    { value: 'Gabrielle Robertson', label: 'Gabrielle Robertson', avatar: img3 },
    { value: 'Lori Spears', label: 'Lori Spears', avatar: img4 },
    { value: 'Sandy Vega', label: 'Sandy Vega', avatar: img5 },
    { value: 'Cheryl May', label: 'Cheryl May', avatar: img6 }
  ]

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm mr-50`}></span>
        {data.label}
      </components.Option>
    )
  }

  const GuestsComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className='d-flex flex-wrap align-items-center'>
          <Avatar className='my-0 mr-1' size='sm' img={data.avatar} />
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }

  // ** Adds New Event
  const handleAddEvent = () => {
    const obj = {
      title,
      start: startPicker,
      end: endPicker,
      allDay,
      display: 'block',
      extendedProps: {
        calendar: value[0].label,
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        location: location.length ? location : undefined,
        desc: desc.length ? desc : undefined
      }
    }
    dispatch(addEvent(obj))
    refetchEvents()
    handleAddEventSidebar()
    toast.success(<ToastComponent title='Event Added' color='success' icon={<Check />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}))
    setTitle('')
    setAllDay(false)
    setUrl('')
    setLocation('')
    setDesc('')
    setGuests({})
    setValue([{ value: 'Business', label: 'Business', color: 'primary' }])
    setStartPicker(new Date())
    setEndPicker(new Date())
  }

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      const calendar = selectedEvent.extendedProps.calendar

      const resolveLabel = () => {
       /*  if (calendar.length) {
          return { label: calendar, value: calendar, color: calendarsColor[calendar] }
        } else  */{
          return { value: 'Business', label: 'Business', color: 'primary' }
        //}
      }
      setTitle(selectedEvent.title || title)
      setAllDay(selectedEvent.allDay || allDay)
      setUrl(selectedEvent.url || url)
      setLocation(selectedEvent.extendedProps.location || location)
      setDesc(selectedEvent.extendedProps.description || desc)
      setGuests(selectedEvent.extendedProps.guests || guests)
      setStartPicker(new Date(selectedEvent.start))
      setEndPicker(selectedEvent.allDay ? new Date(selectedEvent.start) : new Date(selectedEvent.end))
      setValue([resolveLabel()])
    }
  }

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id)

    // ** Set event properties except date related
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // ** dateRelatedProps => ['start', 'end', 'allDay']
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // ** Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(updatedEventData.start, updatedEventData.end, { allDay: updatedEventData.allDay })

    // ** Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }

  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    const eventToUpdate = {
      id: selectedEvent.id,
      title,
      allDay,
      start: startPicker,
      end: endPicker,
      url,
      extendedProps: {
        location,
        description: desc,
        guests,
        calendar: value[0].label
      }
    }

    const propsToUpdate = ['id', 'title', 'url']
    const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']

    dispatch(updateEvent(eventToUpdate))
    updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)
    handleAddEventSidebar()
    toast.success(<ToastComponent title='Event Updated' color='success' icon={<Check />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = eventId => {
    calendarApi.getEventById(eventId).remove()
  }
  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedEvent.id))
    removeEventInCalendar(selectedEvent.id)
    handleAddEventSidebar()
    toast.error(<ToastComponent title='Event Removed' color='danger' icon={<Trash />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }

  // ** Event Action buttons
  const EventActions = () => {
    if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button.Ripple className='mr-1' type='submit' color='primary'>
            Add
          </Button.Ripple>
          <Button.Ripple color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
            Cancel
          </Button.Ripple>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button.Ripple
            className='mr-1'
            color='primary'
            // onClick={handleUpdateEvent}
          >
            Update
          </Button.Ripple>
          <Button.Ripple color='danger' onClick={handleDeleteEvent} outline>
            Delete
          </Button.Ripple>
        </Fragment>
      )
    }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

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
   //const store = useSelector(state => state.budgets)
   const accountStore = useSelector(state => state.accounts)
 
   // ** Vars
   //const { register, errors, handleSubmit } = useForm()
 
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
       //toggleSidebar()
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

   const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src} alt='avatar' />)
    } else {
      return null
    }
  }

  return (
    <Modal
      isOpen={open}
      toggle={handleAddEventSidebar}
      className='sidebar-lg'
      contentClassName='p-0'
      onOpened={handleSelectedEvent}
      onClosed={handleResetInputValues}
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedEvent && selectedEvent.title && selectedEvent.title.length ? 'Update' : 'Add'} Event
        </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>

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
  {/* <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
    Cancel
  </Button> */}
</Form>
         {/*<Form
          onSubmit={handleSubmit(data => {
            if (isObjEmpty(errors)) {
              if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
                handleAddEvent()
              } else {
                handleUpdateEvent()
              }
              handleAddEventSidebar()
            }
          })}
        >
          <FormGroup>
            <Label for='title'>
              Title <span className='text-danger'>*</span>
            </Label>
            <Input
              id='title'
              name='title'
              placeholder='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              innerRef={register({ register: true, validate: value => value !== '' })}
              className={classnames({
                'is-invalid': errors.title
              })}
            />
          </FormGroup>

          <FormGroup>
            <Label for='label'>Label</Label>
            <Select
              id='label'
              value={value}
              options={options}
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              onChange={data => setValue([data])}
              components={{
                Option: OptionComponent
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for='startDate'>Start Date</Label>
            <Flatpickr
              required
              id='startDate'
              // tag={Flatpickr}
              name='startDate'
              className='form-control'
              onChange={date => setStartPicker(date[0])}
              value={startPicker}
              options={{
                enableTime: allDay === false,
                dateFormat: 'Y-m-d H:i'
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for='endDate'>End Date</Label>
            <Flatpickr
              required
              id='endDate'
              // tag={Flatpickr}
              name='endDate'
              className='form-control'
              onChange={date => setEndPicker(date[0])}
              value={endPicker}
              options={{
                enableTime: allDay === false,
                dateFormat: 'Y-m-d H:i'
              }}
            />
          </FormGroup>

          <FormGroup>
            <CustomInput
              type='switch'
              id='allDay'
              name='customSwitch'
              label='All Day'
              checked={allDay}
              onChange={e => setAllDay(e.target.checked)}
              inline
            />
          </FormGroup>

          <FormGroup>
            <Label for='eventURL'>Event URL</Label>
            <Input
              type='url'
              id='eventURL'
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder='https://www.google.com'
            />
          </FormGroup>

          <FormGroup>
            <Label for='guests'>Guests</Label>
            <Select
              isMulti
              id='guests'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={guestsOptions}
              theme={selectThemeColors}
              value={guests.length ? [...guests] : null}
              onChange={data => setGuests([...data])}
              components={{
                Option: GuestsComponent
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for='location'>Location</Label>
            <Input id='location' value={location} onChange={e => setLocation(e.target.value)} placeholder='Office' />
          </FormGroup>

          <FormGroup>
            <Label for='description'>Description</Label>
            <Input
              type='textarea'
              name='text'
              id='description'
              rows='3'
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder='Description'
            />
          </FormGroup>
          <FormGroup className='d-flex'>
            <EventActions />
          </FormGroup> 
        </Form>*/}
      </ModalBody>
    </Modal>
  )
}
}

export default AddEventSidebar
