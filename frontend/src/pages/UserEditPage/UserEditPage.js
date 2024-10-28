import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import classes from './userEditPage.module.css'
import { getById, updateUser } from '../../Services/userService'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import { EMAIL } from '../../constants/Patterns'
import Button from '../../Components/Button/Button'
import Search from '../../Components/Search/Search'

export default function UserEditPage() {
    const {  register, handleSubmit, reset, formState: { errors } } = useForm()
    
    const { userId } = useParams()

    const isEditMode = userId

    useEffect(()=>{
      if(isEditMode)  loadUser()

    }, [userId])

    const loadUser = async ()=>{
        const user = await getById(userId)
        reset(user)
    }

    const submit = async userData =>{
        await updateUser(userData)
    }

  return <div className={classes.container}>
        <div className={classes.content}>
            <Title title={isEditMode ? 'Edit User' : 'Add User'} />
            
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input
                    label="Name"
                    {...register('name', { required: true, minLength: 3 })}
                    error={errors.name}
                />

                <Input
                    label="Email"
                    {...register('email', { required: true, pattern: EMAIL})}
                    error={errors.email}
                />

                <Input
                    label="Address"
                    {...register('address', { required: true, minLength: 5 })}
                    error={errors.address}
                />

                <Input label="Is Admin" type="checkbox"  {...register('isAdmin')} />

                <Button type="submit" />
            </form>
        </div>
    </div>
  
}
