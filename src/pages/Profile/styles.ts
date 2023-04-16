import styled from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
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

export const Block = styled.div`
    width: 80%;
    padding: 20px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: #ee0979;
`

export const Text = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: bold;
`