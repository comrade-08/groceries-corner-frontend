import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import translate from '../languages/translater'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import session from '../helpers/session'
import NodataFound from './NodataFound'

const OrdersHistory = () => {
  const { lang } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState = {
    id: '',
    userName: '',
    mobileNumber: '',
    address: '',
    password: '',
    language: '',
    incompleteOrders: [],
    ordersHistory: [],
    wishList: [],
  }

  const [user, setUser] = useState(initialState)

  useEffect(() => {
    if (!session.isLoginUser()) {
      navigate('/')
    } else {
      session.getUserData().then((user) => {
        setUser(JSON.parse(user))
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-10 col-md-12 container'>
          <div className='rounded register-parent'>
            <div className='text-center register-head py-4'>
              {translate('orderHistoryHead')}
            </div>
            <div className='p-md-4 p-3'>
              {
                user.ordersHistory && user.ordersHistory.length > 0 ? (
                  <>
                    <div className='table-parent table-responsive'>
                      <Table className='text-center p-4 table-child'>
                        <thead className=''>
                          <tr className=''>
                            <th>S.no</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Paid Status</th>
                          </tr>
                        </thead>
                        <tbody className='table-body'>
                          {
                            user.ordersHistory.map((item, i) => {
                              return (
                                <tr className=''>
                                  <td>{i + 1}</td>
                                  <td>{item.date}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.paidStatus}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                      <Button className='btn-common px-sm-5 px-3'>{translate('printBtn', lang)}</Button>
                    </div>
                  </>
                ) : (
                  <div className='text-center'>
                    <NodataFound />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersHistory