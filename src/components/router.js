import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './login'
import Register from './register'
import ForgotPassword from './forgotPassword'
import DashBoard from './dashBoard'
import Products from './products'
import ProductsDashboard from './ProductsDashboard'

const Router = (props) => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgot' element={<ForgotPassword />} />
                    <Route path='/dashboard/profile' element={<DashBoard />} />
                    <Route path='/dashboard/products' element={<ProductsDashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router