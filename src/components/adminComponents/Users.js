import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import session from '../../helpers/session'
import { getUsers } from '../../redux/userReducer'
import translate from '../../languages/translater'
import { Button, FormControl, Row, Table } from 'react-bootstrap'
import NodataFound from '../NodataFound'

const Users = () => {
  const { lang, users } = useSelector((state) => state.userReducer)
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
      session.getUserData().then((user) => {
        setUser(JSON.parse(user))
        if (user.isAdmin) {
          navigate('/admin/login')
        } else {
          navigate('/')
        }
      })
    } else {
      dispatch(getUsers())
    }
    // eslint-disable-next-line
  }, [dispatch])

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-10 col-md-12 container'>
          <div className='rounded register-parent'>
            <div className='text-center register-head py-4'>
              {translate('stocksHead')}
            </div>
            <div className='p-md-4 p-3'>
              {
                users && users.length > 0 ? (
                  <>
                    <div className='mb-sm-4 mb-3'>
                      <Row>
                        <div className='col-sm'>
                          <FormControl type="text" id='search' className='search' placeholder="Search Users" />
                        </div>
                        {/* <div className='text-sm-end text-center col-sm mt-sm-0 mt-3'>
                          <Button className='btn-common col'>{translate('addProductBtn', lang)}</Button>
                        </div> */}
                      </Row>
                    </div>
                    <div className='table-parent table-responsive'>
                      <Table className='text-center p-4 table-child'>
                        <thead className=''>
                          <tr className=''>
                            <th>S.no</th>
                            <th>Name</th>
                            {/* <th>Stock</th>
                            <th>Actions</th> */}
                          </tr>
                        </thead>
                        <tbody className='table-body'>
                          {
                            users.map((item, i) => {
                              return (
                                <tr className=''>
                                  <td>{i + 1}</td>
                                  <td>{item.name}</td>
                                  {/* <td>{item.stock}</td>
                                  <td className='container d-flex justify-content-around'>
                                    <Button className='btn-common'><i class="bi bi-pencil-square"></i></Button>
                                    <Button className='btn-common'><i class="bi bi-trash3-fill"></i></Button>
                                  </td> */}
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
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

export default Users