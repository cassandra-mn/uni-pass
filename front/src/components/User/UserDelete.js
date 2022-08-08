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
        try {
            await axios.post(`${URL}/user/delete/${userId}`, {confirmPassword: password}, headers);
            localStorage.clear();
            alert('Usuário deletado!');
            navigate('/');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Form onSubmit={exclude}>
                <Label>Digite sua senha</Label>
                <Input type='password' required value={password} onChange={e => setPassword(e.target.value)}/>
                <Button type='submit'>Excluir conta</Button>
            </Form>
        </Container>
    );
}

const Container = styled.div`

`;

const Form = styled.form`

`;

const Label = styled.label`

`;

const Input = styled.input`

`;

const Button = styled.button`

`;