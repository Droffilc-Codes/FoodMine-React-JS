import React, {children} from 'react'
import { useAuth } from '../../Hooks/useAuth'
import NotFound from '../NotFound/NotFound'
import AuthRoute from '../AuthRoute/AuthRoute'

function AdminRoute({ children }) {
    const { user } = useAuth()
    

    return user.isAdmin ? ( children ) :
    ( <NotFound 
        linkRoute= "/dashboard"
        linkText= "Go To Dashboard"
        message="You do not have access to this page!"
    />
    )
}


const AdminAuthExport = ({ children }) => 
    <AuthRoute>
        <AdminRoute>{children}</AdminRoute>
    </AuthRoute>

export default AdminAuthExport