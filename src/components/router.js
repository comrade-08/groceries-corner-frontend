import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './login'
import Register from './register'
import ForgotPassword from './forgotPassword'
import DashBoard from './dashBoard'
import Products from './products'
import ProductsDashboard from './ProductsDashboard'
import Profile from './profile'
import Cart from './Cart'
import OrdersHistory from './ordersHistory'
import Page404 from './Page404'
import AdminLogin from './adminComponents/AdminLogin'
import Stocks from './adminComponents/Stocks'
import Users from './adminComponents/Users'

const Router = (props) => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Login setIsLoginUser={props.setIsLoginUser} />} />
      <Route path='/register' element={<Register setIsLoginUser={props.setIsLoginUser} />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/products' element={<Products />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orders-history' element={<OrdersHistory />} />
      <Route path='/forgot' element={<ForgotPassword />} />
      <Route path='/dashboard/profile' element={<DashBoard />} />
      <Route path='/dashboard/products' element={<ProductsDashboard />} />
      <Route path='/admin/login' element={<AdminLogin setIsLoginUser={props.setIsLoginUser} />} />
      <Route path='/admin/stocks' element={<Stocks />} />
      <Route path='/admin/users' element={<Users />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
    // </BrowserRouter>
  )
}

export default Router