import { useParams } from 'react-router-dom'
import classes from './foodEditPage.module.css'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { addFood, getById, updateFood } from '../../Services/foodService'
import Title from '../../Components/Title/Title'
import InputContainer from '../../Components/InputContainer/InputContainer'
import { upload } from '@testing-library/user-event/dist/upload'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { uploadImage } from '../../Services/uploadService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



export default function FoodEditPage() {
    const { foodId } = useParams()
    const [imageUrl, setImageUrl] = useState()
    const isEditMode = !!foodId
    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm()

    useEffect(()=>{
        if(!isEditMode) return

         getById(foodId).then(food => {
            if(!food) return
            reset(food)
            setImageUrl(food.imageUrl)
            }
         )
    }, [foodId])

    const submit = async foodData =>{
        const food = {...foodData, imageUrl}

        if(isEditMode){
            await updateFood(food)
            toast.success(`"Food "${food.name}" updated successfully`)
            return
        }
    
        const newFood = await addFood(food)
        toast.success(`${food.name} was successfully added!`)
        navigate('/admin/editFood/' + newFood.id, { replace: true})
    }

    const upload = async event => {
        setImageUrl(null)
        const imageUrl = await uploadImage(event)
        setImageUrl(imageUrl)
    }

  return  <div className={classes.container}>
        <div className={classes.content}>
            <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />

            <form className={classes.form} onSubmit={handleSubmit(submit)} noValidate>
                <InputContainer label="Select Image">
                    <input type="file" onChange={upload} accept='image/jpeg, image/png'/>
                </InputContainer>
                
                { imageUrl && <a href={imageUrl} className={classes.image_link} target='blank'>
                        <img src={imageUrl} alt='Uploaded' />
                    </a>
                
                }
                <Input type="text" 
                    label="Name" 
                    {...register('name', {required: true, minLength: 5})} 
                    error={errors.name}    
                />

                <Input type="number" 
                    label="Price" 
                    {...register('price', {required: true})} 
                    error={errors.price}    
                />
                
                <Input type="text" 
                    label="Tags" 
                    {...register('tags')} 
                    error={errors.tags}    
                />
                
                <Input type="text" 
                    label="Origins" 
                    {...register('origins', {required: true})} 
                    error={errors.origins}    
                />

                <Input type="text" 
                    label="Cook Time" 
                    {...register('cookTime', {required: true})} 
                    error={errors.cookTime}    
                />
                <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
            </form>
        </div>
    </div>
  
}

