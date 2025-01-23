import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Content/Dashboard Comp/Dashboard'
import Leaves from '../Content/Leaves'
import UserDetailTable from '../Content/Dashboard Comp/UserDetailPanel'
import UserDetailPanel from '../Content/Dashboard Comp/UserDetailPanel'

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/leaves' element={<Leaves />} />
                <Route path='/userDetailPanel' element={<UserDetailPanel />} />
            </Routes>
        </>
    )
}

export default AppRoutes