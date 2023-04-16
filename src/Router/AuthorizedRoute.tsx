import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {UserState} from '../redux/reducer'

type AuthorizedRouteProps = {
    children: React.ReactElement
}

export const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({children}) => {
    const isLogged = useSelector((state: UserState) => state.isLogged)
    if (!isLogged) {
        return <Navigate to='/' />
    }

    return children
}