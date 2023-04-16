import React, {HTMLAttributes} from 'react'
import {StyledButton} from './styles'

type ButtonProps = {
    black?: boolean
    children: string
}

export const Button: React.FC<ButtonProps & HTMLAttributes<HTMLButtonElement>> = ({children, black, ...props}) => {
    return <StyledButton black={black} {...props}>{children}</StyledButton>
}