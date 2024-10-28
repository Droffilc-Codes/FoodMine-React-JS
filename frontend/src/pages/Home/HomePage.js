import React, { useEffect, useReducer } from 'react'
import { getAll, getAllByTag, getTags, searh } from '../../Services/foodService'
import Thumbnails from '../../Components/Thumbnails/Thumbnails'
import { useParams } from 'react-router-dom'
import Search from '../../Components/Search/Search'
import Tags from '../../Components/Tags/Tags'
import NotFound from '../../Components/NotFound/NotFound'


const initialState = { foods: [], tags: []}

const reducer = (state, action) => {
  switch(action.type){
    case 'FOODS_LOADED':
      return {
        ...state,
        foods: action.payload
      }
    case 'TAGS_LOADED':
      return {
        ...state,
        tags: action.payload
      }
    default:
      return state
  }
}
export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {foods, tags} = state
  const {searchTerm, tag} = useParams()


  
  useEffect( ()=> {
    getTags().then(tags => dispatch({type: 'TAGS_LOADED', payload: tags}))

    const loadFoods = tag? getAllByTag(tag) : searchTerm ? searh(searchTerm) : getAll()

    loadFoods.then(foods => dispatch({type: 'FOODS_LOADED', payload: foods}, [searchTerm]))
  }, [searchTerm, tag])
  
  return (
    <>
      <Search  placeholder='Search Food Mine'/>
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText={"Reset Search"}/>}
      <Thumbnails foods={foods} />
    </>
  )
}
