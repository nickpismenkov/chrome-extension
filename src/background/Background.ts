import {ISecret} from '../shared/Secret'
import {UserState, initialState, setIsLogged, setSecret, setPassword, setEncryptedSecret} from '../redux/reducer'
import {IStorage} from '../shared/Storage'
import {Store} from '@reduxjs/toolkit'
import {configureStore} from '@reduxjs/toolkit'
import {connectToState} from '../shared/State'
import reducer from '../redux/reducer'
import {IEncryption} from '../shared/Encryption'

export class Background {
    private _storage: IStorage
    private _secret: ISecret
    private _encryption: IEncryption
    private _store: Store|null

    constructor(storage: IStorage, secret: ISecret, encryption: IEncryption) {
        this._storage = storage
        this._secret = secret
        this._encryption = encryption
        this._store = null
    }

    async init() {
        const store = (await connectToState({createStore: configureStore})(reducer)) as Store
        const {secret, password, encryptedSecret}: UserState = store.getState()
        if (!secret && !password && !encryptedSecret) {
            store.dispatch(setSecret(this._secret.getSecret()))
        }
        this._store = store
    }

    setInitialState() {
        this._secret.newSecret()
        this._storage.store({...initialState, secret: this._secret.getSecret()})
    }

    logOut() {
        this._store?.dispatch(setIsLogged(false))
    }

    logIn() {
        this._store?.dispatch(setIsLogged(true))
    }

    signUp(password: string) {
        const encryptedPassword = this._encryption.encryptSHA(password)
        const secret = this._store?.getState().secret
        const encryptedSecret = this._encryption.encryptAES(secret, encryptedPassword)
        this._store?.dispatch(setPassword(encryptedPassword))
        this._store?.dispatch(setEncryptedSecret(encryptedSecret))
        this._store?.dispatch(setIsLogged(true))
    }

    generateNewSecret = () => {
        this._secret.newSecret()
        const password = this._store?.getState().password
        const newEncryptedSecret = this._encryption.encryptAES(this._secret.getSecret(), password)
        this._store?.dispatch(setEncryptedSecret(newEncryptedSecret))
    }
}
