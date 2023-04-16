import {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {UserState} from '../redux/reducer'
import {Encryption} from '../shared/Encryption'
import {useSendMessage} from './useSendMessage'
import {MESSAGES} from '../shared/MessageTypes'

export function useSecret() {
    const {sendMessage} = useSendMessage()
    const [secret, setSecret] = useState<string>('')
    const encryption = new Encryption()
    const encryptedSecret = useSelector((state: UserState) => state.encryptedSecret)
    const password = useSelector((state: UserState) => state.password)

    useEffect(() => {
        if (encryptedSecret && password) {
            const secret = encryption.decryptAES(encryptedSecret, password)
            setSecret(secret)
        }
    }, [encryptedSecret, password])

    const generateNewSecret = useCallback(() => {
        if (password) {
            sendMessage(MESSAGES.GENERATE_NEW_SECRET)
        }
    }, [password])

    return {secret, generateNewSecret}
}