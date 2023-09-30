import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'
import session from '../helpers/session'
import Updateprofile from './updateprofile'
import NodataFound from './NodataFound'

const Profile = () => {
  const { lang } = useSelector((state) => state.userReducer)
  const [isShowModal, setIsShowModal] = useState(false)

  const initialState = {
    id: '',
    userName: '',
    mobileNumber: '',
    address: '',
    password: '',
    language: '',
    incompleteOrders: [],
    ordersHistory: [],
    wishList: [],
  }

  const [user, setUser] = useState(initialState)

  useEffect(() => {
    session.getUserData().then((user) => {
      setUser(JSON.parse(user))
    })
    // eslint-disable-next-line
  }, [])

  const addOrCloseModal = () => {
    setIsShowModal(!isShowModal)
  }

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-10 col-md-12 container'>
          <div className='rounded register-parent'>
            <div className='text-center register-head py-4'>
              {translate('profileHead', lang)}
            </div>
            <div className='p-md-4 p-3'>
              {
                user && user.id && user.userName && user.mobileNumber && user.password ? (
                  <>
                    <ul className='list-unstyled d-sm-flex pro-parent'>
                      <li className='pro-label col-sm-5'>{translate('userNameLabel')}</li>
                      <li className='pro-details col-sm-6 text-capitalize'>{user.userName}</li>
                    </ul>
                    <ul className='list-unstyled d-sm-flex pro-parent'>
                      <li className='pro-label col-sm-5'>{translate('mobileLabel')} </li>
                      <li className='pro-details col-sm-6'>{user.mobileNumber}</li>
                    </ul>
                    <ul className='list-unstyled d-sm-flex pro-parent'>
                      <li className='pro-label col-sm-5'>{translate('addressLabel')} </li>
                      <li className='pro-details col-sm-6'>1233333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333</li>
                    </ul>
                    <ul className='list-unstyled d-sm-flex pro-parent'>
                      <li className='pro-label col-sm-5'>{translate('passwordLabel')} </li>
                      <li className='pro-details col-sm-6'>{user.password}</li>
                    </ul>
                    <div className='d-flex justify-content-end mt-4'>
                      <Button className='btn-common px-sm-5 px-3' onClick={() => addOrCloseModal()}>{translate('updateBtn', lang)}</Button>
                    </div>
                  </>
                ) : (
                  <div className='text-center'>
                    <NodataFound />
                  </div>
                )
              }
            </div>
          </div>
          <div>
            <Updateprofile isShowModal={isShowModal} addOrCloseModal={addOrCloseModal} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile