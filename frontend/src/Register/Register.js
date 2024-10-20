import React, { useEffect} from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import Title from '../Components/Title/Title'
import classes from './registerPage.module.css'
import Button from '../Components/Button/Button'
import { Link } from 'react-router-dom'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'

export default function Register() {
    const auth = useAuth()
    const {user} = auth
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const returnUrl = params.get('returnurl')

    useEffect(()=>{
        if(!user) return
        returnUrl ? navigate(returnUrl) : navigate('/')
    }, [user])



    const {
        handleSubmit,
        register,
        getValues,
        formState: {errors},
    } = useForm()

    const submit = async data => {
        await auth.register(data)
        console.log(data)
    }
  return (
    <div className={classes.container}>
        <div className={classes.details}>
            <Title title="Register" />
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input type="text" label='Name' {...register('name', {required: true, minLength: 0,})}  error={errors.name}/>

                <Input type="email" label="Email"  {...register('email', { required: true, pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i, message: 'Email is Not Valid'}})} error={errors.email}/>
                
                <Input 
                    type="password"
                    label="Password"
                    {...register('password', {
                        required:true,
                        minLength: 5,
                    })}
                    error={errors.password}
                />

                <Input 
                    type="password"
                    label="Confirm Password"
                    {...register('confirmpassword', {
                        required:true,
                        validate: value =>
                            value !== getValues('password') ? 'Passwords Do Not Match' 
                        : true
                    })}
                    error={errors.confirmpassword}
                />

                <Input 
                    type="text"
                    label="Address"
                    {...register('address', {
                        required:true,
                        minLength: 10,
                    })}
                    error={errors.address}
                />

            <Button type="submit" text="Register" />

            <div className={classes.login}>
                Already a user? &nbsp;
                <Link to={`/login?${returnUrl ? 'returnUrl=' + returnUrl: ''}`}>
                    Login here
                </Link>

            </div>
            </form>
        </div>
    </div>
  )
}
