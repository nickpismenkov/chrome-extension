import Reducer from '../redux/reducer'
import {configureStore} from '@reduxjs/toolkit'
import {Storage} from './Storage'
import {Store} from './Store'

type ConnectToStateProps = {
    createStore: typeof configureStore
}

export function connectToState({createStore}: ConnectToStateProps) {
    const storage = new Storage()
    return (reducer: typeof Reducer) => {
        const store = new Store({
            createStore,
            storage,
            reducer
        })
        return store.init()
    }
}