import { useEffect, useState } from 'react'
import classes from './FoodsAdmin.module.css'
import { Link, useParams } from 'react-router-dom'
import { deleteFoodById, getAll, searh } from '../../Services/foodService'
import NotFound from '../../Components/NotFound/NotFound'
import Title from '../../Components/Title/Title'
import Search from '../../Components/Search/Search'
import Price from '../../Components/Price/Price'
import { toast } from 'react-toastify'

export default function FoodsAdmin() {
    const [foods, setFoods] = useState()
    const {searchTerm} = useParams()

    useEffect(()=>{
        loadFoods()
    }, [searchTerm])


    const loadFoods = async () => { 
       const foods = searchTerm ? await searh(searchTerm) : await getAll()
       setFoods(foods)
    }

    const FoodsNotFound = () => {
        if (foods && foods.length > 0) return

        return searchTerm ? 
        (
            <NotFound linkRoute="/admin/foods" linkText="Show All Foods"/>
        )
        :
        (
            <NotFound linkRoute= "/dashboard" linkText="Back to Dashboard" />
        )
    }

    const deleteFood = async food =>{
        const confirm = window.confirm(`Do you want to delete ${food.name}`)

        if (!confirm) return
        console.log(food.id)
        await deleteFoodById(food.id)
        toast.success(`"${food.name}" Has been removed successfully`)
        setFoods(foods.filter(allFoods => allFoods.id !== food.id))
    }

  return (
    <div className={classes.container}>
        <div className={classes.list}>
            <Title title="Manage Foods" fontSize="1.9rem" />
            <Search 
                searchRoue='/admin/foods/'
                defaultRoute='/admin/foods'
                margin="1rem 0"
                placeholder="Search Food"
            />
            <Link to='/admin/addFood' className={classes.add_food}>
                Add Foods +
            </Link>
            <FoodsNotFound />
            {
                foods && 
                    foods.map(food => (
                        <div key={food.id} className={classes.list_item}>
                            <img src={food.imageUrl} alt={food.name} />
                            <Link to={`/food/`+ food.id}>{food.name}</Link>
                            <Price price={food.price} />
                            <div className={classes.actions}>
                                <Link to={'/admin/editFood/' + food.id}>Edit</Link>
                                <Link onClick={()=> deleteFood(food)}>Delete</Link>
                            </div>
                        </div>
                    ))
                
            }
        </div>
    </div>
  )
}
