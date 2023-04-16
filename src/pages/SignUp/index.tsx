import React, {useState} from 'react'
import {Group, Label, Flex, Divider, Badge} from './styles'
import {Input} from '../../components/Input'
import {Button} from '../../components/Button'
import {useNavigate} from 'react-router-dom'
import {ROUTES} from '../../Router/constants'
import {useSendMessage} from '../../hooks/useSendMessage'
import {MESSAGES} from '../../shared/MessageTypes'

type Password = {
    password: string
    confirmPassword: string
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement> 

export const SignUp: React.FC = () => {
    const navigate = useNavigate()
    const {sendMessage} = useSendMessage()
    const [{password, confirmPassword}, setPassword] = useState<Password>({
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState<boolean>(false)

    const changeField = (e: InputChangeEvent, field: keyof Password) => {
        setPassword(state => ({...state, [field]: e.target.value}))
    }

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (password === confirmPassword && password.length > 1) {
            sendMessage(MESSAGES.SIGN_UP, () => {
                navigate(ROUTES.PROFILE)
            }, password)
            return
        }

        setError(true)
    }

    return (
        <>
            {error && (
                <>
                    <Badge>
                        Password validation error
                    </Badge>
                    <Divider />
                </>
            )}
            <Group>
                <Label>Password:</Label>
                <Input 
                    type='password'
                    onChange={(e: InputChangeEvent) => changeField(e, 'password')} 
                    value={password} 
                />
            </Group>
            <Group>
                <Label>Confirm password:</Label>
                <Input 
                    type='password'
                    onChange={(e: InputChangeEvent) => changeField(e, 'confirmPassword')}
                    value={confirmPassword} 
                />
            </Group>
            <Flex>
                <Button onClick={() => navigate(-1)} black>Back</Button>
                <Button onClick={submit}>Sign up</Button>
            </Flex>
        </>
    )
}