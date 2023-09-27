import React, { useEffect } from 'react'
import NavBar from './navBar'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import session from '../helpers/session'
import Profile from './profile'
import OrdersHistory from './ordersHistory'

const DashBoard = () => {
    // const { lang } = useSelector((state) => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if (!session.isLoginUser()) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <NavBar />
            <div className='container d-xl-flex my-5'>
                <div className='col'>
                    <Profile />
                </div>
                <div className='col mt-5 mt-xl-0'>
                    <OrdersHistory />
                </div>
            </div>
        </>
    )
}

export default DashBoard