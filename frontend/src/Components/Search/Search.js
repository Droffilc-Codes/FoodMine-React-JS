import React, { useEffect, useState } from 'react'
import classes from './Search.module.css'
import { useNavigate, useParams } from 'react-router-dom'

export default function Search({searchRoue = '/search/', defaultRoute = '/', margin, placeholder}) {
    const [term, setTerm] = useState('')
    const navigate = useNavigate()
    const { searchTerm } = useParams()


    useEffect(() => {
      setTerm(searchTerm ?? '')
    }, [searchTerm])



    const search = async() => {
        term ? navigate(searchRoue + term) : navigate(defaultRoute)
    }


  return (
    <div className={classes.container} style={{margin}}>
        <input type='text'
        placeholder = {placeholder}
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && search()}
        value={term}
        />
        <button onClick={search}>Search</button>
    </div>
  )
}
