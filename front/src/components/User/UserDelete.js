import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const URL = 'http://localhost:5000';

export default function UserDelete() {
    const navigate = useNavigate();
    const data = localStorage.getItem("data");
    const {userId, token} = JSON.parse(data);
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    const [password, setPassword] = useState();

    async function exclude() {
        try {
            await axios.post(`${URL}/user/delete/${userId}`, {confirmPassword: password}, headers);
            Storage.clear();
            alert('Usuário deletado!');
            navigate('/sign-in');
        } catch(e) {
            console.log(e.response);
            alert('Não foi possível deletar o usuário, tente novamente mais tarde!');
        }
    }

    return (
        <Container>
            <Button onClick={() => navigate('/user')}>Voltar</Button>
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