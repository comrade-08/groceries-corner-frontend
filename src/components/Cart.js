import React from 'react'
import translate from '../languages/translater'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Cart = () => {
    const { lang } = useSelector((state) => state.userReducer)
    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-lg-10 col-md-12 container'>
                    <div className='rounded register-parent'>
                        <div className='text-center register-head py-4'>
                            {translate('cartHead')}
                        </div>
                        <div className='p-md-4 p-3'>
                            <div className='table-parent table-responsive'>
                                <Table className='text-center p-4 table-child'>
                                    <thead className=''>
                                        <tr className=''>
                                            <th>S.no</th>
                                            <th>Product</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body'>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>Soap</td>
                                            <td>20/-</td>
                                            <td>01</td>
                                            <td>20/-</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className='d-flex justify-content-end mt-4'>
                                <Button className='btn-common px-sm-5 px-3'>{translate('placeOrderBtn', lang)}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart