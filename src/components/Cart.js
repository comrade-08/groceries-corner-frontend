import React from 'react'
import translate from '../languages/translater'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Cart = () => {
    const { lang } = useSelector((state) => state.userReducer)
    return (
        <>
            <div className='container products-grand-parent'>
                <div className='my-5 rounded orders-parent'>
                    <div className='p-4 orders-head text-center text-md-start'>
                        {translate('cartHead')}
                    </div>
                    <div className='p-4'>
                        <div className='table-parent'>
                            <Table className='table-striped text-center p-4 table-child col'>
                                <thead className=''>
                                    <tr className=''>
                                        <th className='th-td'>S.no</th>
                                        <th className='th-td'>Product</th>
                                        <th className='th-td'>Amount</th>
                                        <th className='th-td'>Quantity</th>
                                        <th className='th-td'>Paid Status</th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    <tr className=''>
                                        <td className='tb-td'>01</td>
                                        <td className='tb-td'>80-09-2001</td>
                                        <td className='tb-td'>Rs: 2000/-</td>
                                        <td className='tb-td'>Not Paid</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className='d-flex justify-content-end mt-4'>
                            <Button className='btn-common col-lg-3'>{translate('orderBtn', lang)}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart