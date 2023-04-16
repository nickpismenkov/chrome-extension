import {UserState} from '../redux/reducer'

type Listener = (data: UserState) => void

export interface IStorage {
    subscribe: (listener: Listener) => void
    load: (listener: Listener) => void
    store: (data: UserState) => void
}

export class Storage implements IStorage {
    private chrome: typeof chrome
    private chromeArea: 'local'
    private dataKey: string
    private listeners: Listener[]

    constructor () {
        this.chrome = chrome
        this.chromeArea = 'local'
        this.dataKey = 'dataKey'
        this.listeners = []
    
        this.chrome.storage.onChanged.addListener((changes, area) => {
            if (area !== this.chromeArea || !(this.dataKey in changes)) {
                return
            }
            
            const {newValue} = changes[this.dataKey]
            if (!newValue) {
                return
            }

            for (const listener of this.listeners) {
                listener(newValue)
            }
        })
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener)
    }

    load(listener: Listener) {
        this.chrome.storage[this.chromeArea].get(this.dataKey, (data) => {
            if (!data) {
                return
            }
 
            listener(data[this.dataKey])
        })
    }

    store(data: UserState) {
        this.chrome.storage[this.chromeArea].set({[this.dataKey]: data})
    }
}