// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'


// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import axios from 'axios'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header
const CustomHeader = ({ toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label for='rows-per-page'>Show</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
            <Label for='rows-per-page'>Entries</Label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
            <Label className='mb-0' for='search-invoice'>
              Search:
            </Label>
            <Input
              id='search-invoice'
              className='ml-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
          <Button.Ripple color='primary' onClick={toggleSidebar}>
            Ajouter
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.accounts)

  //console.log('first list : ', store)
  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  
  const [parentAccount, setParentAccount] = useState({ value: '', label: 'Selectionner un parent' })
  const [accountType, setAccountType] = useState({ value: 'standardAccount', label: 'Compte standard', number: 0 })
  const [accountForm, setAccountForm] = useState({ value: '', label: 'Select forme', number: 0 })

  const [theAccounts, setTheAccounts] = useState([])

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        parentAccount: parentAccount !== null ? parentAccount.value : "",
        accountType: accountType.value,
        accountForm: accountForm !== null ? accountForm.value : "",
        q: searchTerm
      })
    )

    axios.get('accounts').then(response => {
      setTheAccounts(response.data)
    })
  }, [dispatch, store.data.length])

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' }
  ]

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'basic', label: 'Basic' },
    { value: 'company', label: 'Company' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'team', label: 'Team' }
  ]

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ]

  const accountTypeOptions = [
    { value: '', label: 'Select type', number: 0 },
    { value: 'standardAccount', label: 'Compte standard', number: 1 },
    { value: 'cashAccount', label: 'Compte de trésorerie', number: 2 }
  ]

  const accountFormOptions = [
    { value: '', label: 'Select forme', number: 0 },
    { value: 'physicalAccount', label: 'Compte physique', number: 1 },
    { value: 'logicalAccount', label: 'Compte logique', number: 2 }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        parentAccount: parentAccount !== null ? parentAccount.value : "",
        accountForm: accountForm !== null ? accountForm.value : "",
        accountType: accountType.value,
        q: searchTerm
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        page: currentPage,
        perPage: value,
        parentAccount: parentAccount !== null ? parentAccount.value : "",
        accountForm: accountForm !== null ? accountForm.value : "",
        accountType: accountType.value,
        q: searchTerm
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        parentAccount: parentAccount !== null ? parentAccount.value : "",
        accountForm: accountForm !== null ? accountForm.value : "",
        accountType: accountType.value,
        q: val
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      parentAccount: parentAccount !== null ? parentAccount.value : "",
      accountForm: accountForm !== null ? accountForm.value : "",
      accountType: accountType.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0) {
      return []
    } else {
      return store.allAccounts.slice(0, rowsPerPage) 
    }
  }

  return (
    <Fragment>
      <Card>
       <CardHeader>
          <CardTitle tag='h4'>Filtres</CardTitle>
        </CardHeader>
          <CardBody>
          <Row>
            <Col md='4'>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                options={theAccounts}
                isClearable
                value={parentAccount}
                onChange={data => {
                  console.log('selected parent : ', data)
                  setParentAccount(data)
                  if (data !== null) {
                 
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      parentAccount: data.value,
                      accountType: accountType.value,
                      accountForm: accountForm !== null ? accountForm.value : "",
                      q: searchTerm
                    })
                  )
                  } else {
                    console.log('test')
                    dispatch(
                      getData({
                        page: currentPage,
                        perPage: rowsPerPage,
                        parentAccount: "",
                        accountType: accountType.value,
                        accountForm: accountForm !== null ? accountForm.value : "",
                        q: searchTerm
                      })
                    )
                    
                  }
                }}
              />
            </Col>
          {/*   <Col className='my-md-0 my-1' md='4'>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={accountTypeOptions}
                value={accountType}
                isClearable
                onChange={data => {
                  setAccountType(data)
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      parentAccount: parentAccount !== null ? parentAccount.value : "",
                      accountType: data.value,
                      accountForm: accountForm !== null ? accountForm.value : "",
                      q: searchTerm
                    })
                  )
                }}
              />
            </Col> */}
            <Col md='4'>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={accountFormOptions}
                value={accountForm}
                isClearable
                onChange={data => {
                  setAccountForm(data)
                  if (data !== null) {
                    dispatch(
                      getData({
                        page: currentPage,
                        perPage: rowsPerPage,
                        parentAccount: parentAccount !== null ? parentAccount.value : "",
                        accountType: accountType !== null ? accountType.value : "",
                        accountForm: data.value,
                        q: searchTerm
                      })
                    )

                  } else {
                    dispatch(
                      getData({
                        page: currentPage,
                        perPage: rowsPerPage,
                        parentAccount: parentAccount !== null ? parentAccount.value : "",
                        accountType: accountType !== null ? accountType.value : "",
                        accountForm: "",
                        q: searchTerm
                      })
                    )

                  }
                }}
              />
            </Col>
          </Row>
        </CardBody> 
      </Card>

      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className='react-dataTable'
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
            />
          }
        />
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList
