import React from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import {UnauthorizedRoute} from './UnauthorizedRoute'
import {AuthorizedRoute} from './AuthorizedRoute'
import {Main} from '../pages/Main'
import {ROUTES} from './constants'
import {SignUp} from '../pages/SignUp'
import {Profile} from '../pages/Profile'
import {LogIn} from '../pages/LogIn'

export const Router: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route index element={
                    <UnauthorizedRoute>
                        <Main />
                    </UnauthorizedRoute>
                } />
                <Route path={ROUTES.SIGN_UP} element={
                    <UnauthorizedRoute>
                        <SignUp />
                    </UnauthorizedRoute>
                } />
                <Route path={ROUTES.LOG_IN} element={
                    <UnauthorizedRoute>
                        <LogIn />
                    </UnauthorizedRoute>
                } />
                <Route path={ROUTES.PROFILE} element={
                    <AuthorizedRoute>
                        <Profile />
                    </AuthorizedRoute>
                } />
            </Routes>
        </HashRouter>
    )
}