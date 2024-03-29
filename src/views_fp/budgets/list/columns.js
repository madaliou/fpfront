// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getBudget, deleteBudget } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { isObjEmpty } from '@utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'

const MySwal = withReactContent(Swal)

const handleConfirmDelete = (id) => {
  return MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
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
      store.dispatch(deleteBudget(id))
      MySwal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  })
}

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.avatar) {
    return <Avatar className='mr-1' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='mr-1' content={row.fullName || 'John Doe'} initials />
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} mr-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  /* {
    name: 'User',
    minWidth: '297px',
    selector: 'fullName',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user-name text-truncate mb-0'
            onClick={() => store.dispatch(getAccount(row.id))}
          >
            <span className='font-weight-bold'>{row.fullName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>@{row.username}</small>
        </div>
      </div>
    )
  }, */
  /* {
    name: 'Nom',
    minWidth: '297px',
    selector: 'fullName',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/budget/${row.id}`}
            className='user-name text-truncate mb-0'
            onClick={() => store.dispatch(getBudget(row.id))}
          >
            <span className='font-weight-bold'>{row.wording}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>@{row.wording}</small>
        </div>
      </div>
    )
  }, */
 {
    name: 'Libellé',
    minWidth: '130px',
    selector: 'wording',
    sortable: true,
    cell: row => row.wording
  },
  {
    name: 'Exploitation',
    minWidth: '138px',
    selector: 'exploitation',
    sortable: true,
    cell: row => (row.exploitation !== null ? row.exploitation.wording : "Pas d'exploitation")
  },
  {
    name: 'Date début',
    minWidth: '138px',
    selector: 'code',
    sortable: true,
    cell: row => <span className='text-capitalize'>{row.startDate}</span>
  },
  
  {
    name: 'Date fin',
    minWidth: '138px',
    selector: 'endDate',
    sortable: true,
    cell: row => <span className='text-capitalize'>{row.endDate} </span>
  },
 /*  {
    name: 'Compte',
    minWidth: '138px',
    selector: 'account',
    sortable: true,
    cell: row => <span className='text-capitalize'>{row.account !== null ? row.account.wording : 'Pas de parent' }</span>
  }, */
  
  {
    name: 'Créé le',
    minWidth: '138px',
    selector: 'created_at',
    sortable: true,
    cell: row => <span className='text-capitalize'>{ moment(new Date(row.created_at)).format(
      'DD/MM/YYYY à H:m:s')}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/budget/view/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getBudget(row.id)) }
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>Details</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/budget/edit/${row.id}`}
            className='w-100'
            onClick={() =>  store.dispatch(getBudget(row.id)) }
          >
            <Archive size={14} className='mr-50' />
            <span className='align-middle'>Edit</span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => handleConfirmDelete(row.id)}>
            <Trash2 size={14} className='mr-50' />
            <span className='align-middle'>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
