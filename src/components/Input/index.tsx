import React, {HTMLAttributes} from 'react'
import {StyledInput} from './styles'

type InputProps = {
    value: string
    type?: 'password'
}

export const Input: React.FC<InputProps & HTMLAttributes<HTMLInputElement>> = ({value, type, ...props}) => {
    return <StyledInput type={type} value={value} {...props} />
}