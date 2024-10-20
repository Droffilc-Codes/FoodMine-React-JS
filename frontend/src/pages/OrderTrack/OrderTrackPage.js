import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { trackOrderById } from '../../Services/orderService'
import NotFound from '../../Components/NotFound/NotFound'
import classes from './OrderTrackPage.module.css'
import DateTime from '../../Components/DateTime/DateTime'
import OrderItemsList from '../../Components/OrderItemsList/OrderItemsList'
import Title from '../../Components/Title/Title'
import Map from '../../Components/Map/Map'

export default function OrderTrackPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState()


    useEffect(()=>{
        orderId &&
      trackOrderById(orderId).then(order => {
        setOrder(order);
      });
    }, [orderId])

    if(!order) return <NotFound message="Order Not Found" linkText="Go to Home Page"/>

  return order && 
    <div className={classes.container}>
        <div className={classes.content}>
            <h1>Order #{order.id}</h1>
            <div className={classes.header}>
                <div>
                    <strong>Date</strong>
                    <DateTime date={order.createdAt} />
                </div>
                <div>
                    <strong>Name</strong>
                    {order.name}
                </div>
                <div>
                    <strong>Address</strong>
                    {order.address}
                </div>
                <div>
                    <strong>State</strong>
                    {order.status}
                </div>
                <div>
                    {order.paymentId && (
                        <div>
                            <strong>Payment Id</strong>
                            {order.paymentId}
                        </div>
                    )}
                </div>

                <OrderItemsList order={order} />
            </div>
        </div>
        <div>
            <Title title="Your Location" fontSize="1.6rem"/>
            <Map readonly={true} location={order.addressLatLng} />
        </div>
        {order.status === 'NEW' && (
            <div className={classes.payment}>
                <Link to="/payment">Go To Payment</Link>
            </div>
        )}

    </div>
}
