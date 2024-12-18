import React, { useEffect } from 'react'
import classes from './LoginPage.module.css'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { Link } from 'react-router-dom'
import { EMAIL } from '../../constants/Patterns'

export default function LoginPage() {
    
    const {
        handleSubmit,
        register,
        formState: { errors },
        } = useForm()
    
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [params] = useSearchParams()
  const returnurl = params.get('returnurl')

useEffect(()=>{
    if(!user) return
    returnurl ? navigate(returnurl) : navigate('/')
},[user])

const submit = async ({ email, password }) => {
    await login(email, password)
}

  return  <div className={classes.container}> 
        <div className={classes.details}>
            <Title title='Login' />
            <form onSubmit={handleSubmit(submit)} noValidate>
            <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: EMAIL,
            })}
            error={errors.email}
          />
           <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />
          <Button type="submit" text="Login"/>

            <div className={classes.register}>
              New user? &nbsp;
              <Link to={`/register${returnurl ? '?returnUrl=' + returnurl : ''}`}>
                Register here
              </Link>
            </div>


            </form>
        </div>
     </div>
  
}
