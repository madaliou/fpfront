// ** React Imports
import { Link, useHistory } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col, Label } from 'reactstrap'
import { DollarSign, TrendingUp, User, Check, Star, Flag, Phone, Calendar } from 'react-feather'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { dele, deleteOperationteOperation } from '../store/action'
import { store } from '@store/storeConfig/store'


const UserInfoCard = ({ selectedOperation }) => {
  const history = useHistory()
  const MySwal = withReactContent(Swal) 

  const handleConfirmDelete = (id) => {
    return MySwal.fire({
      title: 'Are you sure  ?',
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
        store.dispatch(deleteOperation(id))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        history.push('/operations/list')
        
      }
    })
  }

  const renderOldImages = () => {
    const file_url = 'http://188.165.235.13/myfpbackend'
    if (selectedOperation.operationPictures.length) {     
      return selectedOperation.operationPictures.map((src, index) => <img key={index} className='rounded mt-2 mr-1' 
      src={`${file_url}${src.url}`} alt='avatar' width="500"/>)
    } else {
      return null
    }
  }
  // ** render user img
  const renderUserImg = () => {
    if (selectedOperation !== null && selectedOperation.avatar.length) {
      return <img src={selectedOperation.avatar} alt='user-avatar' className='img-fluid rounded' height='104' width='104' />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded'
          content={selectedOperation.fullName}
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
    }
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xl='4' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
            <div className='user-avatar-section'>
              <div className='d-flex justify-content-start'>
                {/*renderUserImg() */}
                <div className='d-flex flex-column ml-1'>
                  <div className='user-info mb-1'>
                    <h4 className='mb-0'>{selectedOperation !== null ? selectedOperation.fullName : 'Eleanor Aguilar'}</h4>
                    <CardText tag='span'>
                      {selectedOperation !== null ? selectedOperation.email : 'eleanor.aguilar@gmail.com'}
                    </CardText>
                  </div>
                  <div className='d-flex flex-wrap align-items-center'>
                    <Button.Ripple tag={Link} to={`/operation/edit/${selectedOperation.id}`} color='primary'>
                      Edit
                    </Button.Ripple>
                    <Button.Ripple className='ml-1' color='danger'    onClick={() => {
                        handleConfirmDelete(selectedOperation.id)
                        }}>
                      Delete
                    </Button.Ripple>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center user-total-numbers'>
              <div className='d-flex align-items-center mr-2'>
                <div className='color-box bg-light-primary'>
                  <DollarSign className='text-primary' />
                </div>
                 <div className='ml-1'>
                  <h5 className='mb-0'>{selectedOperation.amount} </h5>
                  <small>Montant </small>
                </div>
              </div>
              <div className='d-flex align-items-center'>
                {/*<div className='color-box bg-light-success'>
                  <TrendingUp className='text-success' />
                </div>
                <div className='ml-1'>
                   <h5 className='mb-0'>$99.87K</h5>
                  <small>Annual Profit</small> 
                </div>*/}
              </div>
            </div>

            <div className='d-flex align-items-center user-total-numbers'>
              <div className='d-flex align-items-center mr-2'>
                <div className='color-box bg-light-primary'>
                  {/* <DollarSign className='text-primary' /> */}
                </div>
                 <div className='ml-1'>
                  <h5 className='mb-0'>{selectedOperation.totalCashOutflow} </h5>
                 {/*  <small>Total Sorties </small> */}
                </div>
              </div>
              <div className='d-flex align-items-center'>
                {/*<div className='color-box bg-light-success'>
                  <TrendingUp className='text-success' />
                </div>
                <div className='ml-1'>
                   <h5 className='mb-0'>$99.87K</h5>
                  <small>Annual Profit</small> 
                </div>*/}
              </div>
            </div>
          </Col>
          <Col xl='8' lg='12' className='mt-2 mt-xl-0'>
            <div className='user-info-wrapper'>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <User className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Libellé
                  </CardText>
                </div>
                <CardText className='mb-0'>
                  {selectedOperation !== null ? selectedOperation.title : 'eleanor.aguilar'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                {/* <div className='user-info-title'>
                  <Check className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                   
                  </CardText>
                </div> */}
              {/*   <CardText className='text-capitalize mb-0'>
                  {selectedOperation.sourceAccount !== null ? selectedOperation.sourceAccount.wording : 'Néant'}
                </CardText> */}
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Star className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Description
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0'> {'   '}
                  {selectedOperation !== null ? selectedOperation.description : 'Admin'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Flag className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Date
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedOperation !== null ? selectedOperation.start : 'Date de fin'}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Flag className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Heure
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedOperation !== null ? selectedOperation.operationTime : 'Date de fin'}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Flag className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Compte source
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedOperation.sourceAccount !== null ? selectedOperation.sourceAccount.wording : 'Néant'}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Flag className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Compte destination
                  </CardText>
                </div>
                <CardText className='mb-0'>{ selectedOperation.destinationAccount !== null ? selectedOperation.destinationAccount.wording : 'Néant'}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Phone className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Budget
                  </CardText>
                </div>
                <CardText className='mb-2'>{selectedOperation.budget !== null ? selectedOperation.budget.wording : 'Néant'}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Phone className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Exploitation
                  </CardText>
                </div>
                <CardText className='mb-2'>{selectedOperation.exploitation !== null ? selectedOperation.exploitation.wording : 'Néant'}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Calendar className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Création
                  </CardText>
                </div>                
                <CardText className='mb-0'>{ moment(new Date(selectedOperation.created_at)).format(
                          'DD/MM/YYYY à H:m:s')}
              </CardText>
              </div>
            </div>
            {renderOldImages()}
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard
