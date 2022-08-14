import {useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function UserDelete() {
    const navigate = useNavigate();
    const {userId, headers, URL} = useContext(StorageContext);
    const [password, setPassword] = useState('');

    async function exclude(e) {
        e.preventDefault();
        const confirm = window.confirm('Tem certeza que deseja deletar sua conta?');
        if (confirm) {
            try {
                await axios.post(`${URL}/user/delete/${userId}`, {confirmPassword: password}, headers);
                localStorage.clear();
                alert('Usuário deletado!');
                navigate('/');
            } catch(e) {
                alert(e.response.data);
            }
        }
    }

    return (
        <Container>
            <H1 className='p'>Deletar conta</H1>
            <H1>Depois de excluir sua conta, não há como voltar atrás. Por favor, tenha certeza.</H1>
            <Form onSubmit={exclude}>
                <Label>Digite sua senha</Label>
                <Input type='password' required value={password} onChange={e => setPassword(e.target.value)}/>
                <Button type='submit'>Excluir conta</Button>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 50px;
    display: flex;
    flex-direction: column;

    .p {
        top: 85px;
        font-size: 25px;
        color: var(--color-delete);
    }
`;

const H1 = styled.h1`
    top: 125px;
    font-size: 20px;
    margin-right: 20px;
    position: absolute;
    font-family: var(--font-osvald);
`;

const Form = styled.form`
    margin-top: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Label = styled.label`
    font-size: 20px;
    margin-bottom: 5px;
    font-family: var(--font-osvald);
`;

const Input = styled.input`
    max-width: 500px;
    height: 50px;
    padding: 15px;
    margin-bottom: 12px;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 6px; 
    color: #333333;
    background: #FFFFFF;
    font-family: var(--font-osvald);

    ::placeholder {
        color: #9F9F9F;
    }
`;

const Button = styled.button`
    bottom: 50px;
    width: 120px;
    height: 50px;
    font-size: 20px;
    border-radius: 6px;
    color: var(--color-delete);
    border: 2px solid var(--color-delete);
    font-family: var(--font-osvald);
    background-color: transparent;

    :hover {
        cursor: pointer;
    }
`;