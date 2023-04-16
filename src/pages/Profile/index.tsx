import React from 'react'
import {Button} from '../../components/Button'
import {Container, Block, Text, Header, Body} from './styles'
import {useSecret} from '../../hooks/useSecret'
import {useSendMessage} from '../../hooks/useSendMessage'
import {MESSAGES} from '../../shared/MessageTypes'
import {useNavigate} from 'react-router-dom'
import {ROUTES} from '../../Router/constants'

export const Profile: React.FC = () => {
    const navigate = useNavigate()
    const {sendMessage} = useSendMessage()
    const {secret, generateNewSecret} = useSecret()

    const logOut = () => {
        sendMessage(MESSAGES.LOG_OUT, () => {
            navigate(ROUTES.LOG_IN)
        })
    }
    
    return (
        <Container>
            <Header>
                <Button onClick={generateNewSecret}>
                    New secret 
                </Button>
                <Button onClick={logOut} black>
                    Log out
                </Button>
            </Header>
            <Body>
                <Text>Your secret:</Text>
                <Block>
                    {secret}
                </Block>
            </Body>
        </Container>
    )
}
