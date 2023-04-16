import React from 'react'
import {Title, Label, Divider, StyledLink} from './styles'
import {useSelector} from 'react-redux'
import {UserState} from '../../redux/reducer'
import {ROUTES} from '../../Router/constants'
import {Navigate} from 'react-router-dom'

export const Main: React.FC = () => {
    const secret = useSelector((state: UserState) => state.secret)
    const isInitialized = useSelector((state: UserState) => state.encryptedSecret)

    if (isInitialized) {
        return <Navigate to={ROUTES.LOG_IN} />
    }

    return (
        <>
            <Title>Your secret</Title>
            <Divider />
            <Label>{secret}</Label>
            <Divider />
            <StyledLink to={ROUTES.SIGN_UP}>Sign up</StyledLink>
        </>
    )
}