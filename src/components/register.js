import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import translate from '../languages/translater'
import { useNavigate } from 'react-router-dom'
import Loader from './loader'
import commonHelpers from '../helpers/CommonHelper'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, registerUser } from '../redux/userReducer'
import { NumericFormat } from 'react-number-format'
// import bcrypt from "bcrypt"

const Register = (props) => {
    const { lang, registerLoader, users } = useSelector((state) => state.userReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialState = {
        userName: '',
        mobileNumber: '',
        address: '',
        password: '',
        confirmPassword: ''
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const [registerDetails, setregisterDetails] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setregisterDetails((values => ({ ...values, [name]: value })))
    }

    const isValidInput = () => {
        const { userName, mobileNumber, address, password, confirmPassword } = registerDetails
        if (!commonHelpers.checkEmptyInput(userName)) {
            commonHelpers.showMsg(translate('userNameReq'), 'error')
            return false
        } else if (userName.length < 4 || userName.length > 10) {
            commonHelpers.showMsg(translate('userNameErr'), 'error')
            return false
        } else if (!commonHelpers.checkIsAlphabet(userName)) {
            commonHelpers.showMsg(translate('userNameLetterErr'), 'error')
            return false
        } else if (!commonHelpers.checkEmptyInput(mobileNumber)) {
            commonHelpers.showMsg(translate('mobileNumberReq'), 'error')
            return false
        } else if (mobileNumber.length !== 13) {
            commonHelpers.showMsg(translate('mobileNumberErr'), 'error')
            return false
        } else if (!commonHelpers.checkEmptyInput(address)) {
            commonHelpers.showMsg(translate('addressReq'), 'error')
            return false
        } else if (!commonHelpers.checkEmptyInput(password)) {
            commonHelpers.showMsg(translate('passwordReq'), 'error')
            return false
        } else if (password.length < 6 || password.length > 8) {
            commonHelpers.showMsg(translate('passwordErr'), 'error')
            return false
        } else if (!commonHelpers.checkEmptyInput(confirmPassword)) {
            commonHelpers.showMsg(translate('confirmPasswordReq'), 'error')
            return false
        } else if (confirmPassword !== password) {
            commonHelpers.showMsg(translate('passwordNotSame'), 'error')
            return false
        } else {
            const existUser = users.filter((user, i) => { return user.mobileNumber === registerDetails.mobileNumber })
            if (existUser.length > 0) {
                commonHelpers.showMsg(translate('existUser'), 'error')
                return false
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        const { userName, mobileNumber, address, password } = registerDetails
        e.preventDefault()
        if (isValidInput()) {
            // const salt = 10
            // const encryptPassword = await bcrypt.hash(password, salt)
            const data = {
                userName: userName,
                mobileNumber: mobileNumber,
                address: address,
                password: password,
            }
            dispatch(registerUser(data)).then(() => {
                setregisterDetails({
                    userName: '',
                    mobileNumber: '',
                    address: '',
                    password: '',
                    confirmPassword: ''
                })
            })
        }
    }

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-lg-6 col-md-8 container'>
                    <div className='rounded register-parent'>
                        <div className='text-center register-head py-4'>
                            {translate('userRegisterHead', lang)}
                        </div>
                        <div className='p-md-4 p-3'>
                            <Form className='register-form'>
                                <FormGroup className='mb-4'>
                                    <FormLabel className='input-label' htmlFor='userName'>{translate('userNameLabel', lang)}</FormLabel>
                                    <FormControl className='mt-1 input-text text-capitalize' id='userName' name='userName' type='text' value={registerDetails.userName} onChange={(e) => handleChange(e)} maxLength={10} autoComplete='false' />
                                </FormGroup>
                                <FormGroup className='mb-4'>
                                    <FormLabel className='input-label' htmlFor='mobileNumber'>{translate('mobileLabel', lang)}</FormLabel>
                                    <NumericFormat
                                        className='mt-1 input-text form-control'
                                        id='mobileNumber'
                                        name='mobileNumber'
                                        value={registerDetails.mobileNumber}
                                        onChange={(e) => handleChange(e)}
                                        maxLength={13}
                                        prefix={'+91'}
                                    />
                                </FormGroup>
                                <FormGroup className='mb-4'>
                                    <FormLabel className='input-label' htmlFor='address'>{translate('addressLabel', lang)}</FormLabel>
                                    <FormControl className='mt-1 input-text' id='address' name='address' type='text' value={registerDetails.address} onChange={(e) => handleChange(e)} autoComplete='false' />
                                </FormGroup>
                                <FormGroup className='mb-4'>
                                    <FormLabel className='input-label' htmlFor='password'>{translate('passwordLabel', lang)}</FormLabel>
                                    <FormControl className='mt-1 input-text' id='password' name='password' type='text' value={registerDetails.password} onChange={(e) => handleChange(e)} maxLength={8} />
                                    {/* <Link to={'/forgot-password'}></Link> */}
                                </FormGroup>
                                <FormGroup className='mb-4'>
                                    <FormLabel className='input-label' htmlFor='confirmPassword'>{translate('confirmPasswordLabel', lang)}</FormLabel>
                                    <FormControl className='mt-1 input-text' id='confirmPassword' name='confirmPassword' type='text' value={registerDetails.confirmPassword} onChange={(e) => handleChange(e)} maxLength={8} />
                                    {/* <Link to={'/forgot-password'}></Link> */}
                                </FormGroup>
                                <FormGroup className='d-flex justify-content-between mt-5'>
                                    <Button className='btn-common rounded px-sm-5 px-3' onClick={() => navigate('/')}>{translate('loginBtn', lang)}</Button>
                                    <Button className='btn-common rounded px-sm-5 px-3' disabled={registerLoader} onClick={(e) => handleSubmit(e)}>{!registerLoader ? translate('registerBtn', lang) : <Loader size={'small'} />}</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register