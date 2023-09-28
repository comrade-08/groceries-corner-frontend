import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'
import session from '../helpers/session'
import Updateprofile from './updateprofile'

const Profile = () => {
    const { activeUser, lang } = useSelector((state) => state.userReducer)
    const [user, setUser] = useState(activeUser)
    const [isShowModal, setIsShowModal] = useState(false)

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
        <>
            <Container>
                <div className='my-5 rounded orders-parent'>
                    <div className='p-4 orders-head text-center text-md-start'>
                        {translate('profileHead')}
                    </div>
                    <div className='p-4 pro-grand-parent'>
                        <ul className='list-unstyled text-center text-lg-start d-md-flex justify-content-between pro-parent'>
                            <li className='pro-label col-md-5'>{translate('userNameLabel')}</li>
                            <li className='pro-details col-md-6 text-capitalize'>{user.userName}</li>
                        </ul>
                        <ul className='list-unstyled text-center text-lg-start d-md-flex  justify-content-between pro-parent'>
                            <li className='pro-label col-md-5'>{translate('mobileLabel')} </li>
                            <li className='pro-details col-md-6'>{user.mobileNumber}</li>
                        </ul>
                        <ul className='list-unstyled text-center text-lg-start d-md-flex  justify-content-between pro-parent'>
                            <li className='pro-label col-md-5'>{translate('addressLabel')} </li>
                            <li className='pro-details col-md-6'>1233333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333</li>
                        </ul>
                        <ul className='list-unstyled text-center text-lg-start d-md-flex  justify-content-between pro-parent'>
                            <li className='pro-label col-md-5'>{translate('passwordLabel')} </li>
                            <li className='pro-details col-md-6'>{user.password}</li>
                        </ul>
                        <div className='d-flex justify-content-end mt-4'>
                            <Button className='btn-common col-lg-3' onClick={() => addOrCloseModal()}>{translate('updateBtn', lang)}</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Updateprofile isShowModal={isShowModal} addOrCloseModal={addOrCloseModal} />
                </div>
            </Container>
        </>
    )
}

export default Profile