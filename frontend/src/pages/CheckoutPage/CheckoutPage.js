import React, { useState }from 'react'
import { useCart } from '../../Hooks/useCart'
import { useAuth } from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createOrder } from '../../Services/orderService'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import classes from './CheckoutPage.module.css'
import OrderItemsList from '../../Components/OrderItemsList/OrderItemsList'
import Map from '../../Components/Map/Map'
// import latLng  from 'leaflet'

export default function CheckoutPage() {
  const { cart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [order, setOrder] = useState({...cart})

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm()


  const submit = async data => {
    if(!order.addressLatLng){
      toast.warning('Please select your location on the map!')
    }
    await createOrder({...order, name: data.name, address:data.address})
    console.log(order.date)
    navigate('/payment')
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem"/>
       

          <div className={classes.inputs}>
            <Input 
              defaultValue={user.name}
              label="Name"
              {...register('name')}
              error={errors.name}
            />
            <Input 
              defaultValue={user.address}
              label="Address"
              {...register('address')}
              error={errors.address}
            />
          </div>
          <OrderItemsList order={order} />
        </div>
        <div>
            <Title title="Choose your Location" fontSize="1.6rem" />
            <Map 
              location={order.addressLatLng}
              onChange={latLng => {
                setOrder({...order, addressLatLng: latLng})
                console.log(latLng)
              }}
            />
        </div>
        <div className={classes.buttons_container}>
          <div className={classes.button}>
            <Button 
              type="submit"
              text="Go to payment"
              height="3rem"
              width="100%"
            />
          </div>
        </div>
      </form>
    </>
  )
}
