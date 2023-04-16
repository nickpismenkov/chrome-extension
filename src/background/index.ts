import {Secret} from '../shared/Secret'
import {Storage} from '../shared/Storage'
import {MESSAGES} from '../shared/MessageTypes'
import {Background} from './Background'
import {Encryption} from '../shared/Encryption'

const storage = new Storage()
const secret = new Secret()
const encryption = new Encryption()
const background = new Background(storage, secret, encryption)

background.init()

chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({url: 'index.html'})
})

chrome.runtime.onMessage.addListener(function(message) {
    switch(message.type) {
        case MESSAGES.SET_INITIAL_STATE:
            background.setInitialState()
            break
        case MESSAGES.SIGN_UP:
            background.signUp(message.payload)
            break
        case MESSAGES.LOG_IN:
            background.logIn()
            break
        case MESSAGES.LOG_OUT:
            background.logOut()
            break
        case MESSAGES.GENERATE_NEW_SECRET:
            background.generateNewSecret()
            break
    }
})

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === 'index') {
        port.onDisconnect.addListener(function() {
            background.logOut()
        })
    }
})
