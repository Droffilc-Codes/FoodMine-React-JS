import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import { useLoading } from '../../Hooks/useLoading'
import { createOrder, pay } from '../../Services/orderService'
import { useCart } from '../../Hooks/useCart'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// export default function PayPalButtons({ order }) {
export default function PaypalButtons({ order }) {
  return (
    <div>
      <PayPalScriptProvider
        options={{
            clientId: 'ARqjev2tPFMUDt3h4hB8cgwSL-TtgW_WLNQKqRZjyikzNIgsK2KkA7_HNjHA4UzvyiKZQ6WBI3KbrZc3'
        }}
        >
            <Buttons order={order} />
        </PayPalScriptProvider>
    </div>
  )
}


function Buttons ({ order }){
    const { clearCart } = useCart()
    const navigate  = useNavigate()
    const [{ isPending }] = usePayPalScriptReducer()
    const {showLoading, hideLoading} = useLoading()
    useEffect(()=>{
        isPending ? showLoading() : hideLoading()
    },[isPending])

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units:[
                {
                    amount: {
                        currency_code: 'USD',
                        value: order.totalPrice
                    }
                }
            ]
        })
    }

    const onApprove = async (data, actions) =>{
        try{
            const payment = await actions.order.capture()
            const orderId = await pay(payment.id)
            clearCart()
            toast.success('Payment saved successfully', 'Success')
            navigate('/track/' + orderId)
        }catch (error) {
            toast.error("Payment Save Failed", 'Error')
        }
    }

    const onError = err => {
        toast.error("Payment Failed", 'Error')
    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}        
        />
    )
}