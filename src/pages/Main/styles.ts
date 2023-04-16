import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Divider = styled.hr`
    width: 90%;
    border-top: 1px dotted #2C3E50;
`

export const Title = styled.span`
    color: #000;
    font-size: 20px;
    font-weight: bold;
`

export const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;  
    width: 70%;
    background-color: #2C3E50;
    color: #fff;
    padding: 10%;
`

export const StyledLink = styled(Link)`
    background: #ee0979;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    border: 0 none;
    border-radius: 25px;
    cursor: pointer;
    padding: 10px 20px;
    margin: 10px 5px;
    text-decoration: none;

    &:hover {
        box-shadow: 0 0 0 2px #fff, 0 0 0 3px #ee0979;
    }

    &:active {
        margin: 12px 6px;
        padding: 8px 16px;
        box-shadow: none;
        background: #ba055d;
        box-shadow: 0 0 0 2px #fff, 0 0 0 3px #ee0979;
    }
`