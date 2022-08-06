import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const URL = 'http://localhost:5000';

export default function SignUp() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    async function login(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${URL}/sign-in`, data);
            const serializedData = JSON.stringify(response.data);
            localStorage.setItem('data', serializedData);
            navigate('/home');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Form onSubmit={login}>
                <Input placeholder='e-mail' type='email' required value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
                <Input placeholder='senha' type='password' required value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <Button type='submit'>Entrar</Button>
                <MoreOptions>
                    Ainda não tem uma conta?
                    <Register onClick={() => navigate('/sign-up')}>Cadastre-se</Register>
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

const Register = styled.button`

`;