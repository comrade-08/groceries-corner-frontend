import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import commonHelpers from '../helpers/CommonHelper'
import Loader from './loader'
import session from '../helpers/session'

const Updateprofile = (props) => {
    const { lang, registerLoader } = useSelector((state) => state.userReducer)
    const initialState = {
        id: '',
        userName: '',
        mobileNumber: '',
        address: '',
        password: '',
        oldPassword: '',
        newPassword: '',
        isChangePassword: false
    }

    const [updateDetails, setupdateDetails] = useState(initialState)

    useEffect(() => {
        session.getUserData().then((user) => {
            setupdateDetails(JSON.parse(user))
        })
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'mobileNumber' || name === 'password') {
            commonHelpers.showMsg(translate('onlyReadable', lang), 'error')
        } else {
            setupdateDetails((values => ({ ...values, [name]: value })))
        }
    }

    const isValidInput = () => {
        const { userName, address, isChangePassword, oldPassword, newPassword, password } = updateDetails
        if (!commonHelpers.checkEmptyInput(userName)) {
            commonHelpers.showMsg(translate('userNameReq'), 'error')
            return false
        } else if (userName.length < 4 || userName.length > 10) {
            commonHelpers.showMsg(translate('userNameErr'), 'error')
            return false
        } else if (!commonHelpers.checkIsAlphabet(userName)) {
            commonHelpers.showMsg(translate('userNameLetterErr'), 'error')
            return false
        } else if (!commonHelpers.checkEmptyInput(address)) {
            commonHelpers.showMsg(translate('addressReq'), 'error')
            return false
        } else if (isChangePassword === true) {
            if (!commonHelpers.checkEmptyInput(oldPassword)) {
                commonHelpers.showMsg(translate('oldPasswordReq'), 'error')
                return false
            } else if (!commonHelpers.checkEmptyInput(newPassword)) {
                commonHelpers.showMsg(translate('newPasswordReq'), 'error')
                return false
            } else if (oldPassword !== password) {
                commonHelpers.showMsg(translate('updatePasswordNotSame'), 'error')
                return false
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        const { userName, mobileNumber, address, password, isChangePassword, newPassword, id } = updateDetails
        e.preventDefault()
        if (isValidInput()) {
            // const salt = 10
            // const encryptPassword = await bcrypt.hash(password, salt)
            const data = {
                id: id,
                userName: userName,
                mobileNumber: mobileNumber,
                address: address,
                password: isChangePassword ? newPassword : password,
            }
            console.log(data, 'data')
            setupdateDetails({
                id: '',
                userName: '',
                mobileNumber: '',
                address: '',
                password: '',
                oldPassword: '',
                newPassword: '',
                isChangePassword: false
            })
            addOrCloseModal()
        }
    }

    const addOrCloseModal = () => {
        props.addOrCloseModal()
        session.getUserData().then((user) => {
            setupdateDetails(JSON.parse(user))
        })
    }

    const setIsChangePassword = () => {
        const { isChangePassword } = updateDetails
        setupdateDetails((values => ({ ...values, isChangePassword: !isChangePassword })))
    }
    return (
        <>
            <Modal size='lg' centered className='' show={props.isShowModal} animation onHide={() => addOrCloseModal()}>
                <ModalHeader className='py-4 d-flex justify-content-center register-head'>
                    {translate('updateHead', lang)}
                </ModalHeader>
                <ModalBody className='update-pro-modal'>
                    <div className='container'>
                        <Form className=''>
                            <div className='row'>
                                <FormGroup className='mb-4 col-lg-6 p-lg-2'>
                                    <FormLabel className='input-label' htmlFor='userName'>{translate('userNameLabel', lang)}</FormLabel>
                                    <FormControl className='mt-1 input-text text-capitalize' id='userName' name='userName' type='text' value={updateDetails.userName} onChange={(e) => handleChange(e)} maxLength={10} autoComplete='false' />
                                </FormGroup>
                                <FormGroup className='mb-4 col-lg-6 p-lg-2'>
                                    <FormLabel className='input-label' htmlFor='mobileNumber'>{translate('mobileLabel', lang)}</FormLabel>
                                    <NumericFormat
                                        className='mt-1 input-text form-control disable-cursor'
                                        id='mobileNumber'
                                        name='mobileNumber'
                                        value={updateDetails.mobileNumber}
                                        onChange={(e) => handleChange(e)}
                                        maxLength={13}
                                        prefix={'+91'}
                                        readOnly
                                        disabled
                                    />
                                </FormGroup>
                            </div>
                            <div className='row'>
                                <FormGroup className='mb-4 col-lg-6 p-lg-2'>
                                    <FormLabel className='input-label' htmlFor='address'>{translate('addressLabel', lang)}</FormLabel>
                                    <FormControl className='mt-1 input-text' id='address' name='address' type='text' value={updateDetails.address} onChange={(e) => handleChange(e)} autoComplete='false' />
                                </FormGroup>
                                <FormGroup className='col-lg-6 p-lg-2'>
                                    <FormLabel className='input-label' htmlFor='password'>{translate('passwordLabel', lang)}</FormLabel>
                                    <FormControl className='mt-1 input-text disable-cursor' id='password' name='password' type='password' value={updateDetails.password} onChange={(e) => handleChange(e)} maxLength={8} readOnly />
                                    <div className='row my-3'>
                                        <Button className='forgot-btn text-end' onClick={() => setIsChangePassword()}>{translate('changePasswordBtn', lang)}</Button>
                                    </div>
                                </FormGroup>
                            </div>
                            {
                                updateDetails.isChangePassword && (
                                    <div className='row change-password'>
                                        <FormGroup className='col-lg-6 p-lg-2 mb-4 mb-lg-0'>
                                            <FormLabel className='input-label' htmlFor='oldPassword'>{translate('oldPasswordLabel', lang)}</FormLabel>
                                            <FormControl className='mt-1 input-text' id='oldPassword' name='oldPassword' type='text' value={updateDetails.oldPassword} onChange={(e) => handleChange(e)} maxLength={8} />
                                        </FormGroup>
                                        <FormGroup className='col-lg-6 p-lg-2 mb-2'>
                                            <FormLabel className='input-label' htmlFor='newPassword'>{translate('newPasswordLabel', lang)}</FormLabel>
                                            <FormControl className='mt-1 input-text' id='newPassword' name='newPassword' type='text' value={updateDetails.newPassword} onChange={(e) => handleChange(e)} maxLength={8} />
                                        </FormGroup>
                                    </div>
                                )
                            }
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter className='d-flex justify-content-between update-pro-modal'>
                    {/* <FormGroup className='col justify-content-between'> */}
                    <Button className='btn-common rounded px-lg-4 px-3' onClick={() => addOrCloseModal()}>{translate('cancelBtn', lang)}</Button>
                    <Button className='btn-common rounded px-lg-4 px-3' disabled={registerLoader} onClick={(e) => handleSubmit(e)}>{!registerLoader ? translate('updateBtn', lang) : <Loader size={'small'} />}</Button>
                    {/* </FormGroup> */}
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Updateprofile