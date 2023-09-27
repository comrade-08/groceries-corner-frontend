import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import translate from '../languages/translater'
import { useNavigate } from 'react-router-dom'
import Loader from './loader'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, loginUser, setisLogin } from '../redux/userReducer'
import { NumericFormat } from 'react-number-format'
import commonHelpers from '../helpers/CommonHelper'
import session from '../helpers/session'

const Login = (props) => {
    const { lang, users, loginLoader } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialState = {
        mobileNumber: '',
        password: ''
    }

    useEffect(() => {
        dispatch(getUsers())
        if (session.isLoginUser()) {
            navigate('/dashboard/products')
        }
        // eslint-disable-next-line
    }, [dispatch])

    const [loginDetails, setloginDetails] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setloginDetails((values => ({ ...values, [name]: value })))
    }

    const isValidInput = () => {
        const { mobileNumber, password } = loginDetails
        if (!commonHelpers.checkEmptyInput(mobileNumber)) {
            commonHelpers.showMsg(translate('mobileNumberReq'), 'error')
            return false
        } else if (mobileNumber.length < 13) {
            commonHelpers.showMsg(translate('mobileNumberMin'), 'error')
            return false
        } else if (!commonHelpers.checkEmptyInput(password)) {
            commonHelpers.showMsg(translate('passwordReq'), 'error')
            return false
        } else if (password.length < 6) {
            commonHelpers.showMsg(translate('passwordMin'), 'error')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isValidInput()) {
            dispatch(loginUser(loginDetails)).then(() => {
                const isHaveAccount = users.filter((user, idx) => {
                    return user.mobileNumber === loginDetails.mobileNumber && user.password === loginDetails.password
                })
                if (isHaveAccount.length > 0) {
                    dispatch(setisLogin(isHaveAccount[0]))
                    commonHelpers.showMsg(translate('isLoginUser'), 'success')
                    session.setisLoginUser(isHaveAccount[0]).then(() => {
                        setTimeout(() => {
                            navigate('/dashboard/products')
                        }, 1000)
                    }).catch(() => {
                        session.clearUnneccessaryData()
                        commonHelpers.showMsg(translate('somethingWrong'), 'error')
                    })
                } else {
                    session.clearUnneccessaryData()
                    commonHelpers.showMsg(translate('isNotLoginUser'), 'error')
                }
            })
        }
    }

    return (
        <div className='container margin-above'>
            <div className='row'>
                <div className='col-lg-6 col-md-8 container'>
                    <div className='rounded register-parent'>
                        <div className='text-center register-head py-4'>
                            {translate('userLoginHead', lang)}
                        </div>
                        {
                            loginLoader !== true ? (
                                <div className='mt-2 mt-lg-4 p-md-5 p-3 pt-4'>
                                    <Form>
                                        <FormGroup className='mb-4'>
                                            <FormLabel className='input-label' htmlFor='mobileNumber'>{translate('mobileLabel', lang)}</FormLabel>
                                            <NumericFormat
                                                className='mt-1 input-text form-control'
                                                id='mobileNumber'
                                                name='mobileNumber'
                                                value={loginDetails.mobileNumber}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={13}
                                                prefix={'+91'}
                                            />
                                        </FormGroup>
                                        <FormGroup className='mb-4'>
                                            <FormLabel className='input-label' htmlFor='password'>{translate('passwordLabel', lang)}</FormLabel>
                                            <FormControl className='mt-1 input-text' id='password' name='password' type='text' value={loginDetails.password} onChange={(e) => handleChange(e)} maxLength={8} />
                                            <div className='text-end mt-3'>
                                                <Button className='forgot-btn px-lg-4 px-2 rounded py-1' onClick={() => navigate('/forgot')}>{translate('forgotBtn', lang)}</Button>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className='d-flex justify-content-between'>
                                            <Button className='btn-common rounded px-lg-4 px-3' onClick={() => navigate('/register')}>{translate('registerBtn', lang)}</Button>
                                            <Button className='btn-common rounded px-lg-4 px-3' onClick={(e) => handleSubmit(e)}>{translate('loginBtn', lang)}</Button>
                                        </FormGroup>
                                    </Form>
                                </div>
                            ) : (<Loader />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login