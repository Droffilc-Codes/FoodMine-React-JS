import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import Food from './pages/Food/Food'
import CartPage from './pages/Cart/CartPage'
import LoginPage from './pages/Login/LoginPage'
import Register from './Register/Register'
import AuthRoute from './Components/AuthRoute/AuthRoute'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import PaymentPage from './pages/Payment/PaymentPage'
import OrderTrackPage from './pages/OrderTrack/OrderTrackPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import OrdersPage from './pages/Orders/OrdersPage'

export default function AppRoutes() {
  return  (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search/:searchTerm" element={<HomePage/>} />
        <Route path="/tag/:tag" element={<HomePage/>} />
        <Route path="/food/:id" element={<Food/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/checkout" element={<AuthRoute><CheckoutPage /></AuthRoute>} />
        <Route path="/payment" element={<AuthRoute><PaymentPage /></AuthRoute>} />
        <Route path="/track/:orderId" element={<AuthRoute><OrderTrackPage /></AuthRoute>} />
        <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
        <Route path="/orders/:filter?" element={<AuthRoute><OrdersPage /></AuthRoute>} />
    </Routes>

  )
  
}
