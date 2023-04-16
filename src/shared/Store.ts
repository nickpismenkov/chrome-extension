import {isEqual, cloneDeep, mergeWith} from 'lodash'
import {UserState} from '../redux/reducer'
import {IStorage} from '../shared/Storage'
import {configureStore, Dispatch, Reducer} from '@reduxjs/toolkit'
import {initialState, Action} from '../redux/reducer'

interface IStore {
	init: () => Promise<unknown>
	setState: (data: UserState) => void
	getState: () => UserState
	subscribe: (listener: () => void) => void
	dispatch: (action: Action) => Dispatch
}

export class Store implements IStore {
	private createStore
	private storage
	private reducer
	private listeners: Array<() => void>
	private buffStore: any
	private state: UserState
	private lastState: UserState|null

	constructor({
		createStore, 
		storage, 
		reducer
	}: {
		createStore: typeof configureStore
		storage: IStorage
		reducer: Reducer
	}) {
		this.state = initialState
		this.lastState = initialState
		this.createStore = createStore
		this.storage = storage
		this.reducer = reducer
		this.listeners = []
		this.dispatch = this.dispatch.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.getState = this.getState.bind(this)
	}

	init() {
		const initialState = this.createStore({reducer: this.reducer}).getState()
		this.storage.subscribe((data: UserState) => {
			if (isEqual(data, this.state)) {
				return
			}	
			this.setState(data)
			
			for (const listener of this.listeners) {
				listener()
			}
		})

		return new Promise((resolve) => {
			this.storage.load((state: UserState) => {
				const mergedState = mergeWith({}, initialState, state)
				this.setState(mergedState)
				
				if (!isEqual(mergedState, state)) {
					this.storage.store(mergedState)
				}

				resolve(this)
			})
		})
	}

	setState(data: UserState) {
		if (!data) {
			return
		}
			
		this.state = cloneDeep(data)
	}

	getState() {
		return this.state
	}

	subscribe(listener: () => void) {
		this.listeners.push(listener)
		return () => {
			this.listeners = this.listeners.filter((v: () => void) => v !== listener)
		}
	}

	dispatch(action: Action) {
		if (!this.buffStore) {
			this.buffStore = this.createStore({reducer: this.reducer, preloadedState: this.state})
			this.lastState = this.buffStore.getState()
			setTimeout(() => {
				this.buffStore = null
			}, 100)
		}

		let lastStore = this.buffStore

		const unsubscribe = lastStore.subscribe(() => {
			const state = (this.buffStore || lastStore).getState()
			if (isEqual(state, this.lastState)) {
				return
			}

			this.storage.store(state)
			this.lastState = state
			unsubscribe()
			lastStore = null
		})

		return lastStore.dispatch(action)
	}
}