import React, { useEffect, useState } from 'react'
import classes from './Food.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getById } from '../../Services/foodService'
import StarRating from '../../Components/StarRating/StarRating'
import Tags from '../../Components/Tags/Tags'
import Price from '../../Components/Price/Price'
import { useCart } from '../../Hooks/useCart'
import NotFound from '../../Components/NotFound/NotFound'

export default function Food() {
    const [food, setFood]= useState(null)
    const {id} = useParams() 
  const { addToCart } = useCart() 
  const navigate = useNavigate()   

 useEffect(()=> {
        getById(id).then(setFood)
    }, [id])

  
   const handleAddToCart = () =>{
    addToCart(food)
    navigate("/cart")
   }

  return (
    <>
      {!food ? <NotFound message={"Food Not Found"} linkText={"Go back to Home"} /> : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {food.origins?.map(origin => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map(tag => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}






      {/* {food && (

        
        <div className={classes.container}>

          <img className={classes.image} src={`/foods/${food.imageUrl}`} alt={food.name} />

          <div className={classes.details}>

              <div className={classes.header}>
                <span className={classes.name}>
                  {food.name}
                </span>
                <span className={`${classes.favorite} ${food.favorite? '' : classes.not}`}>
                ❤
                </span>
              </div>

             <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
             </div>

             <div className={classes.origins}> 
             {food.origins?.map(origin=> (
                 <span key={origin}>{origin}</span>
                    ))}
             </div>

             <div className={classes.tags}>
                    {food.tags && (
                      <Tags 
                        tags={food.tags.map(tag =>({name: tag}))}
                        forFoodPage={true}
                      />
                    )}
             </div>

             <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

             <button>Add to Cart</button>
          </div>
        </div>
      )
      
      } */}
    </>
  )
}
