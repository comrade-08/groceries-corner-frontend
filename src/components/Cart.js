import React, { useEffect, useState } from 'react'
import translate from '../languages/translater'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../redux/userReducer'
import session from '../helpers/session'
import commonHelpers from '../helpers/CommonHelper'

const Cart = () => {
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
                    {
                      user.incompleteOrders.map((item, i) => {
                        return (
                          <tr className=''>
                            <td>{i + 1}</td>
                            <td>{item.product}</td>
                            <td>{item.rate}</td>
                            <td>{item.quantity}</td>
                            <td>{commonHelpers.multiply([item.rate, item.quantity])}</td>
                          </tr>
                        )
                      })
                    }
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