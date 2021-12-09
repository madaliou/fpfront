// ** React Imports
import { Fragment, useState, useEffect} from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { toast } from 'react-toastify'
import Flatpickr from 'react-flatpickr'
import { X, Check, Trash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Card, CardHeader, CardTitle, CardBody,
   CustomInput, Input, Form } from 'reactstrap'

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
import axios from 'axios'
import { getOperation } from '../store/action'

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

  dispatch(getOperation(selectedEvent.id))

  const selectedOperation = store.selectedOperation

  console.log('selected operation : ', selectedOperation)

  console.log('selected event : ', selectedEvent)
  const { register, errors, handleSubmit } = useForm()

  // ** States
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [operationType, setOperationType] = useState('')
  const [operationTime, setOperationTime] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [exploitation, setExploitation] = useState('')
  const [amount, setAmount] = useState('')
  const [sourceAccount, setSourceAccount] = useState('')
  const [destinationAccount, setDestinationAccount] = useState('')
  const [budgets, setBudgets] = useState([])
  const [exploitations, setExploitations] = useState([])
  const [accounts, setAccounts] = useState([])

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
        } else { */
          return { value: 'Business', label: 'Business', color: 'primary' }
        //}
      }
      setTitle(selectedEvent.title || title)
      setOperationType(selectedOperation.operationType || operationType)
      setOperationTime(selectedOperation.operationTime || operationTime)
      setDescription(selectedOperation.description || description)
      setAmount(selectedOperation.amount || amount)
      setBudget(selectedOperation.budget || budget)
      setExploitation(selectedOperation.exploitation || budget)
      setSourceAccount(selectedOperation.sourceAccount || sourceAccount)
      setDestinationAccount(selectedOperation.destinationAccount || destinationAccount)

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

  useEffect(() => {
   
    axios.get('budgets').then(response => {
      setBudgets(response.data)
    })

    axios.get('exploitations').then(response => {
      setExploitations(response.data)
    })

  }, [])

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
          {/* <Button.Ripple className='mr-1' type='submit' color='primary'>
            Add
          </Button.Ripple>
          <Button.Ripple color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
            Cancel
          </Button.Ripple> */}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
         {/*  <Button.Ripple
            className='mr-1'
            color='primary'
            // onClick={handleUpdateEvent}
          >
            Update
          </Button.Ripple> */}
          <Button.Ripple color='danger' onClick={handleDeleteEvent} 
          outline>
            Delete
          </Button.Ripple>
        </Fragment>
      )
    }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

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
          {selectedEvent && selectedEvent.title && selectedEvent.title.length ? '' : ''} Operation
        </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
        <Form
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

  <FormGroup>
            <Label for='description'>
              Description <span className='text-danger'>*</span>
            </Label>
            <Input
              id='description'
              name='description'
              placeholder='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              innerRef={register({ register: true, validate: value => value !== '' })}
              className={classnames({
                'is-invalid': errors.description
              })}
            />
          </FormGroup>

  <FormGroup>
                <Label for='amount'>Montant</Label>
                <Input innerRef={register({ required: true })} id='amount' name='amount' placeholder='Montant' defaultValue={amount} />
              </FormGroup>


<FormGroup className='mb-2'>

  <Label>Date </Label>
  <Flatpickr className='form-control' value={startPicker} 
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

    <FormGroup className='mb-2'>
    {/* <input type="file" id="file" multiple name="file" onChange={handleChange} /> */}
    <Card>
      <CardHeader>
       {/*  <CardTitle tag='h4'> Preuve(s)</CardTitle> */}
      </CardHeader>
      <CardBody>
        {/* <DragDrop uppy={uppy} /> */}
        {//renderPreview()
        }
      </CardBody>
    </Card>
</FormGroup>

        
          <FormGroup className='d-flex'>
            <EventActions />
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddEventSidebar
