import React from 'react'
import { useForm } from 'react-hook-form'
import Title from '../Title/Title'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { useAuth } from '../../Hooks/useAuth'

export default function ChangePassword() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: {errors},
    } = useForm()

    const { changePassword } = useAuth()

    const submit = passwords =>{
        //submit PAsswords
        changePassword(passwords)
    }
    
  return (
    <div>
      <Title title="Change Passoword" />
      <form onSubmit={handleSubmit(submit)} >
      <Input 
            type="password"
            label="Current Password"
            {...register('currentPassword', {
                required:true,
            })}
            error={errors.currentPassword}
        />
      <Input 
            type="password"
            label="New Password"
            {...register('newPassword', {
                required:true,
                minLength: 5,
            })}
            error={errors.newPassword}
        />
        <Input 
            type="password"
            label="Confirm Password"
            {...register('confirmNewPassword', {
                required:true,
                validate: value =>
                    value !== getValues('newPassword') ? 'Passwords Do Not Match' 
                : true
            })}
            error={errors.confirmNewPassword}
        />
      <Button text="Change" type="submit"/>
      </form>
    </div>
  )
}
