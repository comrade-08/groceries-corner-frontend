import React from 'react'
import { Button, Table } from 'react-bootstrap'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'

const OrdersHistory = () => {
    const { lang } = useSelector((state) => state.userReducer)

    return (
        <>
            <div className='m-3 rounded orders-parent'>
                <div className='p-4 orders-head text-center text-md-start'>
                    {translate('orderHistoryHead')}
                </div>
                <div className='p-4'>
                    <div className='table-parent d-md-flex'>
                        <Table className='table-striped text-center p-4 table-child col'>
                            <thead className=''>
                                <tr className=''>
                                    <th className='th-td'>S.no</th>
                                    <th className='th-td'>Date</th>
                                    <th className='th-td'>Amount</th>
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
                                <tr>
                                    <td className='tb-td'>02</td>
                                    <td className='tb-td'>80-09-2001</td>
                                    <td className='tb-td'>Rs: 2000/-</td>
                                    <td className='tb-td'>Not Paid</td>
                                </tr>
                                <tr>
                                    <td className='tb-td'>03</td>
                                    <td className='tb-td'>80-09-2001</td>
                                    <td className='tb-td'>Rs: 2000/-</td>
                                    <td className='tb-td'>Not Paid</td>
                                </tr>
                                <tr>
                                    <td className='tb-td'>04</td>
                                    <td className='tb-td'>80-09-2001</td>
                                    <td className='tb-td'>Rs: 2000/-</td>
                                    <td className='tb-td'>Not Paid</td>
                                </tr>
                                <tr className=''>
                                    <td className='tb-td'>01</td>
                                    <td className='tb-td'>80-09-2001</td>
                                    <td className='tb-td'>Rs: 2000/-</td>
                                    <td className='tb-td'>Not Paid</td>
                                </tr>
                                <tr>
                                    <td className='tb-td'>02</td>
                                    <td className='tb-td'>80-09-2001</td>
                                    <td className='tb-td'>Rs: 2000/-</td>
                                    <td className='tb-td'>Not Paid</td>
                                </tr>
                                <tr>
                                    <td className='tb-td'>03</td>
                                    <td className='tb-td'>80-09-2001</td>
                                    <td className='tb-td'>Rs: 2000/-</td>
                                    <td className='tb-td'>Not Paid</td>
                                </tr>
                                <tr>
                                    <td className='tb-td'>04</td>
                                    <td className='tb-td'>80-09-2001</td>
                                    <td className='tb-td'>Rs: 2000/-</td>
                                    <td className='tb-td'>Not Paid</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                        <Button className='btn-common col-lg-3'>{translate('printBtn', lang)}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrdersHistory