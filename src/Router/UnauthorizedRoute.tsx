import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {UserState} from '../redux/reducer'
import {ROUTES} from './constants'

type UnauthorizedRouteProps = {
    children: React.ReactElement
}

export const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = ({children}) => {
    const isLogged = useSelector((state: UserState) => state.isLogged)
    if (isLogged) {
        return <Navigate to={ROUTES.PROFILE} />
    }

    return children
}