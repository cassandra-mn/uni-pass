import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import StorageContext from '../../contexts/StorageContext.js';

export default function SignUp() {
    const navigate = useNavigate();
    const {URL} = useContext(StorageContext);
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    });

    async function register(e) {
        e.preventDefault();
        try {
            await axios.post(`${URL}/sign-up`, data);
            navigate('/sign-in');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Form onSubmit={register}>
                <Input placeholder='nome' type='text' required value={data.name} onChange={e => setData({...data, name: e.target.value})}/>
                <Input placeholder='e-mail' type='email' required value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
                <Input placeholder='senha' type='password' required value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <Button type='submit'>Cadastrar</Button>
                <MoreOptions>
                    Já tem uma conta?
                    <Login onClick={() => navigate('/sign-in')}>Entre</Login>
                </MoreOptions>
            </Form>
        </Container>
    );
}

const Container = styled.div`

`;

const Form = styled.form`

`;

const Input = styled.input`

`;

const Button = styled.button`

`;

const MoreOptions = styled.div`

`;

const Login = styled.button`

`;