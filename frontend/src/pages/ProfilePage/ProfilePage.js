import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../Hooks/useAuth'
import classes from './ProfilePage.module.css'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import ChangePassword from '../../Components/ChangePassword/ChangePassword'

export default function ProfilePage() {

    const {
        handleSubmit,
        register,
        formState: { errors },
        } = useForm()

    const { user, updateProfile } = useAuth()

    const submit = user =>{
        //Updates Profile
        console.log(user)

        updateProfile(user)
    }

  return <div className={classes.container}>
        <div className={classes.details}>
            <Title title="Update Profile" fontSize="1.6rem"/>
            <form onSubmit={handleSubmit(submit)}>
            <Input
            defaultValue={user.name}
            type="text"
            label="Name"
            {...register('name', {
              required: true,
              minLength: 5,
              },
            )}
            error={errors.name}
          />
            <Input
            defaultValue={user.address}
            type="text"
            label="Address"
            {...register('address', {
              required: true,
              minLength: 10,
              },
            )}
            error={errors.address}
          />
          <Button type="submit" text="Update" backgroundColor="#009e84"/>
            </form>
            <ChangePassword />
        </div>
  </div>
  
}
