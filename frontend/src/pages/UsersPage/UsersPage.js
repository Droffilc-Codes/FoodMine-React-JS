import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAll, toggleBlock } from '../../Services/userService'
import classes from './usersPage.module.css'
import Title from '../../Components/Title/Title'
import { useAuth } from '../../Hooks/useAuth'
import Search from '../../Components/Search/Search'

export default function UsersPage() {
    const [users, setUsers] = useState()
    const { searchTerm } = useParams()
    const auth = useAuth()

    useEffect(()=>{
        loadUsers()

    }, [searchTerm])

  
    const loadUsers = async () =>{
        const users = await getAll(searchTerm)
        setUsers(users)
    }

    const handleToggleBlock = async (userId) => {

        const IsBlocked = await toggleBlock(userId)

        setUsers(oldUsers => oldUsers.map(user => user.id === userId ? {...user, IsBlocked} : user))

    }

  return <div className={classes.container}>
        <div className={classes.list}>
            <Title title="Manage Users" />

            <Search
                searchRoue='/admin/users/'
                defaultRoute="/admin/users"
                margin="1rem 0"
                placeholder="Search Users"
            />
            <div className={classes.list_item}>
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>Address</h3>
                <h3>Admin</h3>
            </div>

            {
                users &&

                    users.map(user => 
                        <div key={user.id} className={classes.list_item}>
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                            <span>{user.address}</span>
                            <span>{user.isAdmin ? '✅' : '❌'}</span>
                            <span className={classes.actions}>
                                <Link to={`/admin/editUser/`+ user.id}>Edit</Link>
                                {
                                    auth.user.id !== user.id &&(

                                    <Link onClick={()=> handleToggleBlock(user.id)}>
                                        { 
                                               
                                            user.IsBlocked ? 'Unblock' : 'Block'
                                        }
                                    </Link>
                                    )

                                }
                            </span>
                        </div>
                    )
            }

        </div>
    </div>
  
}
