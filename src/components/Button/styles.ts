import styled from 'styled-components'

export const StyledButton = styled.button<{black?: boolean}>`
    background: ${props => !props.black ? '#ee0979' : 'black'};
    font-weight: bold;
    color: #fff;
    border: 0 none;
    border-radius: 25px;
    cursor: pointer;
    padding: 10px 20px;
    margin: 10px 5px;

    &:hover {
        box-shadow: 0 0 0 2px #fff, 0 0 0 3px ${props => !props.black ? '#ee0979' : 'black'};
    }

    &:active {
        margin: 12px 6px;
        padding: 8px 16px;
        box-shadow: none;
        background: ${props => !props.black ? '#ba055d' : 'black'};
        box-shadow: 0 0 0 2px #fff, 0 0 0 3px ${props => !props.black ? '#ee0979' : 'black'};
    }
`