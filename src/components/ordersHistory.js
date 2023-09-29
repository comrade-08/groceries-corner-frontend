import React from 'react'
import { Button, Table } from 'react-bootstrap'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'

const OrdersHistory = () => {
    const { lang } = useSelector((state) => state.userReducer)

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-lg-10 col-md-12 container'>
                    <div className='rounded register-parent'>
                        <div className='text-center register-head py-4'>
                            {translate('orderHistoryHead')}
                        </div>
                        <div className='p-md-4 p-3'>
                            <div className='table-parent table-responsive'>
                                <Table className='table-striped text-center p-4 table-child'>
                                    <thead className=''>
                                        <tr className=''>
                                            <th>S.no</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Paid Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body'>
                                        <tr className=''>
                                            <td>01</td>
                                            <td>80-09-2001</td>
                                            <td>Rs: 2000/-</td>
                                            <td>Not Paid</td>
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
                                <Button className='btn-common px-sm-5 px-3'>{translate('printBtn', lang)}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersHistory