import styled from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;
`

export const Header = styled.div`
    display: flex;
    justify-content: center;
    width: 96%;
    height: 10%;
    padding: 2%;
    background-color: rgb(200 205 207);
`

export const Body = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content; center;
`

export const Label = styled.label`
    font-size: 15px;
    font-weight: bold;
`

export const Divider = styled.hr`
    width: 90%;
    border-top: 1px dotted #2C3E50;
`

export const Badge = styled.div`
    background: red;
    width: 80%;
    padding: 20px;
    color: #fff;
    text-align: center;
    margin-bottom: 10%;
`