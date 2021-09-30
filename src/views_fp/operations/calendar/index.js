// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'
//import AddEventSidebar from './Sidebar'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
/* import {
  fetchEvents,
  selectEvent,
  updateEvent,
  updateFilter,
  updateAllFilters,
  addEvent,
  removeEvent
} from './store/actions/index' */

import {
  getAllData,
  selectOperation,
  editOperation,
  updateFilter,
  updateAllFilters,
  addOperation,
  deleteOperation
} from '../store/action/index'

// ** Styles
import '@styles/react/apps/app-calendar.scss'

// ** CalendarColors
/* const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
} */

const calendarsColor = {
  transfer: 'primary',
  entrance: 'success',
  output: 'danger'
}

const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.operations)

  // ** states
  const [addSidebarOpen, setAddSidebarOpen] = useState(false),
    [leftSidebarOpen, setLeftSidebarOpen] = useState(false),
    [calendarApi, setCalendarApi] = useState(null)

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)

  // ** Blank Event Object
  const blankOperation = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  }

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents()
    }
  }

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(getAllData(store.selectedCalendars))
    console.log('store.data.length index: ', store.data)
  }, [])

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row noGutters>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft
              store={store}
              dispatch={dispatch}
              updateFilter={updateFilter}
              toggleSidebar={toggleSidebar}
              updateAllFilters={updateAllFilters}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              blankEvent={blankOperation}
              calendarApi={calendarApi}
              selectEvent={selectOperation}
              updateEvent={editOperation}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        store={store}
        dispatch={dispatch}
        addEvent={addOperation}
        open={addSidebarOpen}
        selectEvent={selectOperation}
        updateEvent={editOperation}
        removeEvent={deleteOperation}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  )
}

export default CalendarComponent
