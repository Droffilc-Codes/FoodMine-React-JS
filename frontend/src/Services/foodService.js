import axios from 'axios'


export const getAll = async () => {
    const { data } = await axios.get('/api/foods')
    return data 
}

export const searh = async searchTerm => {
    const { data } = await axios.get('api/foods/search/' + searchTerm)
    return data
}

export const getTags = async () => {
    const { data } = await axios.get('api/foods/tags')
    return data
}

export const getAllByTag = async tag => {
    if(tag === 'All') return getAll()
   const { data } = await axios.get('api/foods/tag/' + tag)
    return data
}

export const getById = async foodId => {
    const { data } = await axios.get('api/foods/' + foodId)
    return data
}


export const deleteFoodById = async foodId =>{
    await axios.delete('api/foods/' + foodId)
}

export const updateFood = async food =>{
    await axios.put('api/foods/', food)
}

export const addFood = async food =>{
    const { data } = await axios.post('api/foods/', food)
    return data
}