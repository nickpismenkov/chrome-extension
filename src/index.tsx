import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reducer from './redux/reducer'
import {Provider} from 'react-redux'
import {connectToState} from './shared/State'
import {Store, configureStore} from '@reduxjs/toolkit'
import './index.css'

const rootElement = document.createElement('div')
rootElement.setAttribute('id', 'root')
document.body.appendChild(rootElement)
if (!rootElement) {
  throw new Error('Can`t find root element')
}
const root = ReactDOM.createRoot(rootElement)

async function init() {
  chrome.runtime.connect({name: 'index'})
  const store = (await connectToState({createStore: configureStore})(reducer)) as Store

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}
init()
