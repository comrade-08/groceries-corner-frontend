import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import session from '../../helpers/session'
import { getUsers } from '../../redux/userReducer'
import translate from '../../languages/translater'
import { Button, FormControl, Row, Table } from 'react-bootstrap'
import NodataFound from '../NodataFound'

const Users = () => {
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
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

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
      dispatch(getUsers()).then(res => {
        if (res.payload.status) {
          setUsers(res.payload.response)
        }
      })
    }
    // eslint-disable-next-line
  }, [dispatch])

  const handleUserFilter = (e) => {
    const { name, value } = e.target
    const filteredUsers = users.filter((user, i) => { return (user.userName.includes(value) || user.mobileNumber.includes(value) || user.email.includes(value) || user.address.includes(value)) })
    setFilteredUsers(filteredUsers)
    return
  }

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-10 col-md-12 container'>
          <div className='rounded register-parent'>
            <div className='text-center register-head py-4'>
              {translate('usersHead', lang)}
            </div>
            <div className='p-md-4 p-3'>
              {
                <>
                  <div className='mb-sm-4 mb-3'>
                    <Row>
                      <div className='col-sm'>
                        <FormControl type="text" id='search' className='search' placeholder="Search Users" onChange={(e) => handleUserFilter(e)} />
                      </div>
                      {/* <div className='text-sm-end text-center col-sm mt-sm-0 mt-3'>
                          <Button className='btn-common col'>{translate('addProductBtn', lang)}</Button>
                        </div> */}
                    </Row>
                  </div>
                  {
                    users && users.length > 0 ? (
                      <>
                        <div className='table-parent table-responsive'>
                          <Table className='text-center p-4 table-child'>
                            <thead className=''>
                              <tr className=''>
                                <th>S.no</th>
                                <th>Username</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                {/* <th>Stock</th>
                              <th>Actions</th> */}
                              </tr>
                            </thead>
                            <tbody className='table-body'>
                              {
                                filteredUsers.length <= 0 && users.map((item, i) => {
                                  return (
                                    <tr key={i} className=''>
                                      <td>{i + 1}</td>
                                      <td>{item.userName}</td>
                                      <td>{item.mobileNumber}</td>
                                      <td>{item.email}</td>
                                      <td>{item.address}</td>
                                      {/* <td>{item.stock}</td>
                                    <td className='container d-flex justify-content-around'>
                                      <Button className='btn-common'><i class="bi bi-pencil-square"></i></Button>
                                      <Button className='btn-common'><i class="bi bi-trash3-fill"></i></Button>
                                    </td> */}
                                    </tr>
                                  )
                                })
                              }
                              {
                                filteredUsers.map((item, i) => {
                                  return (
                                    <tr key={i} className=''>
                                      <td>{i + 1}</td>
                                      <td>{item.userName}</td>
                                      <td>{item.mobileNumber}</td>
                                      <td>{item.email}</td>
                                      <td>{item.address}</td>
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
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users