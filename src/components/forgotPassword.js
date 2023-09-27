import React, { useState } from 'react'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap'
import translate from '../languages/translater'
import { useNavigate } from 'react-router-dom'
import Loader from './loader'
import { useDispatch, useSelector } from 'react-redux'
import { forgotUser } from '../redux/userReducer'
import commonHelpers from '../helpers/CommonHelper'
import { NumericFormat } from 'react-number-format'

const ForgotPassword = (props) => {
    const {lang, forgotLoader} = useSelector((state) => state.userReducer)
    const loginMobileNumber = useSelector((state) => state.userReducer.loginDetails.mobileNumber)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState = {
        mobileNumber: loginMobileNumber,
        sendSMS: false
    }

    const [forgotDetails, setforgotDetails] = useState(initialState)

    const navigatePage = (path) => {
        return navigate(path)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setforgotDetails((values => ({ ...values, [name]: value })))
    }

    const isValidInput = () => {
        const { mobileNumber } = forgotDetails
        if (!commonHelpers.checkEmptyInput(mobileNumber)) {
            commonHelpers.showMsg(translate('mobileNumberReq'), 'error')
            return false
        } else if (mobileNumber.length < 13) {
            commonHelpers.showMsg(translate('mobileNumberMin'), 'error')
            return false
        }
        return true
    }

    const handleSend = (e) => {
        e.preventDefault()
        if (isValidInput()) {
            setforgotDetails((values => ({ ...values, sendSMS: false })))
            dispatch(forgotUser(forgotDetails))
        }
    }

    return (
        <div className='container margin-above'>
            <div className='row'>
                <div className='col-lg-6 col-md-8 container'>
                    <div className='rounded register-parent'>
                        <div className='text-center register-head py-4'>
                            {translate('userForgotPasswordHead', lang)}
                        </div>
                        {
                            forgotLoader !== true ? (
                                <div className='mt-2 mt-lg-2 p-md-5 p-3 pt-4'>
                                    <Form>
                                        <FormGroup className='mb-4'>
                                            <FormLabel className='input-label' htmlFor='mobileNumber'>{translate('mobileLabel', lang)}</FormLabel>
                                            <NumericFormat
                                                className='mt-1 input-text form-control'
                                                id='mobileNumber'
                                                name='mobileNumber'
                                                value={forgotDetails.mobileNumber}
                                                onChange={(e) => handleChange(e)}
                                                maxLength={13}
                                                prefix={'+91'}
                                            />
                                        </FormGroup>
                                        <FormGroup className='d-flex justify-content-between mt-5'>
                                            <Button className='btn-common rounded px-lg-4 px-3' onClick={() => navigatePage('/')}>{translate('cancelBtn', lang)}</Button>
                                            <Button className='btn-common rounded px-lg-4 px-3' disabled={forgotDetails.sendSMS} onClick={(e) => handleSend(e)}>{translate('sendBtn', lang)}</Button>
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

export default ForgotPassword