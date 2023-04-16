import {PayloadAction, createSlice} from '@reduxjs/toolkit'

export interface UserState {
    secret: string|null
    encryptedSecret: string|null
    password: string|null
    isLogged: boolean
}

export const initialState = { 
    secret: null,
    password: null,
    encryptedSecret: null,
    isLogged: false,
} as UserState

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSecret(state, action: PayloadAction<UserState['secret']>) {
            state.secret = action.payload
        },
        setPassword(state, action: PayloadAction<UserState['password']>) {
            state.password = action.payload
        },
        setEncryptedSecret(state, action: PayloadAction<UserState['encryptedSecret']>) {
            state.encryptedSecret = action.payload   
        },
        setIsLogged(state, action: PayloadAction<UserState['isLogged']>) {
            state.isLogged = action.payload
        }
    }
})

export const {setSecret, setPassword, setEncryptedSecret, setIsLogged} = user.actions
export type Action = typeof user.actions

export default user.reducer