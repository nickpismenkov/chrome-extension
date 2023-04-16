import React, {useCallback, useState} from 'react'
import {useSelector} from 'react-redux'
import {Group, Label, Divider, Badge, Container, Header, Body} from './styles'
import {Input} from '../../components/Input'
import {Button} from '../../components/Button'
import {UserState} from '../../redux/reducer'
import {Encryption} from '../../shared/Encryption'
import {useNavigate} from 'react-router-dom'
import {ROUTES} from '../../Router/constants'
import {useSendMessage} from '../../hooks/useSendMessage'
import {MESSAGES} from '../../shared/MessageTypes'

export const LogIn: React.FC = () => {
    const {sendMessage} = useSendMessage()
    const navigate = useNavigate()
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const encryptedPassword = useSelector((state: UserState) => state.password)

    const logIn = useCallback(() => {
        const encryption = new Encryption()
        if (encryption.encryptSHA(password) === encryptedPassword) {
            sendMessage(MESSAGES.LOG_IN, () => {
                navigate(ROUTES.PROFILE)
            })
            return
        }
        setError(true)
    }, [password, encryptedPassword])

    const reset = () => {
        sendMessage(MESSAGES.SET_INITIAL_STATE, () => {
            navigate(ROUTES.MAIN)
        })
    }

    return (
        <Container>
            <Header>
                <Button onClick={reset} black>Reset application</Button>
            </Header>
            <Body>
                {error && (
                    <Badge>
                        Wrong password
                    </Badge>
                )}
                <Group>
                    <Label>Enter your password</Label>
                    <Divider />
                    <Input type='password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement> ) => setPassword(e.target.value)} />
                    <Button onClick={logIn}>Log in</Button>
                </Group>
            </Body>
        </Container>
    )
}