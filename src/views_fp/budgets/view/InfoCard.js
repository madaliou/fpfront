// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'
import { DollarSign, TrendingUp, User, Check, Star, Flag, Phone, Calendar } from 'react-feather'
import moment from 'moment'

const UserInfoCard = ({ selectedBudget }) => {
  // ** render user img
  const renderUserImg = () => {
    if (selectedBudget !== null && selectedBudget.avatar.length) {
      return <img src={selectedBudget.avatar} alt='user-avatar' className='img-fluid rounded' height='104' width='104' />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded'
          content={selectedBudget.fullName}
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
                    <h4 className='mb-0'>{selectedBudget !== null ? selectedBudget.fullName : 'Eleanor Aguilar'}</h4>
                    <CardText tag='span'>
                      {selectedBudget !== null ? selectedBudget.email : 'eleanor.aguilar@gmail.com'}
                    </CardText>
                  </div>
                  <div className='d-flex flex-wrap align-items-center'>
                   {/*  <Button.Ripple tag={Link} to={`/apps/user/edit/${selectedBudget.id}`} color='primary'>
                      Edit
                    </Button.Ripple>
                    <Button.Ripple className='ml-1' color='danger' outline>
                      Delete
                    </Button.Ripple> */}
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
                  <h5 className='mb-0'>{selectedBudget.provisionalAmount} </h5>
                  <small>Montant prévisionnel</small>
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
                  {selectedBudget !== null ? selectedBudget.wording : 'eleanor.aguilar'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                {/* <div className='user-info-title'>
                  <Check className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                   
                  </CardText>
                </div> */}
                <CardText className='text-capitalize mb-0'>
                  {selectedBudget !== null ? selectedBudget.accountType : 'Active'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Star className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Date debut
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0'> {'   '}
                  {selectedBudget !== null ? selectedBudget.startDate : 'Admin'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  <Flag className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Date fin
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedBudget !== null ? selectedBudget.endDate : 'Date de fin'}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Phone className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Compte
                  </CardText>
                </div>
                <CardText className='mb-2'>{selectedBudget.account !== null ? selectedBudget.account.wording : '(123) 456-7890'}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Calendar className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Création
                  </CardText>
                </div>
                <CardText className='mb-0'>{ moment(new Date(selectedBudget.created_at)).format(
                          'DD/MM/YYYY à H:m:s')}
              </CardText>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard
