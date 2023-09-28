import React, { useState } from 'react'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap'
import translate from '../languages/translater'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotUser } from '../redux/userReducer'
import commonHelpers from '../helpers/CommonHelper'
import { NumericFormat } from 'react-number-format'

const ForgotPassword = (props) => {
    const { lang } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState = {
        mobileNumber: '',
        sendSMS: false
    }

    const [forgotDetails, setforgotDetails] = useState(initialState)

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
        <div className='container my-5'>
            <div className='row'>
                <div className='col-lg-6 col-md-8 container'>
                    <div className='rounded register-parent'>
                        <div className='text-center register-head py-4'>
                            {translate('userForgotPasswordHead', lang)}
                        </div>
                        <div className='p-md-4 p-3'>
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
                                    <Button className='btn-common rounded px-lg-4 px-3' onClick={() => navigate('/')}>{translate('cancelBtn', lang)}</Button>
                                    <Button className='btn-common rounded px-lg-4 px-3' disabled={forgotDetails.sendSMS} onClick={(e) => handleSend(e)}>{translate('sendBtn', lang)}</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword