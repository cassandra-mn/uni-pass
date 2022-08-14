import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function UserUpdate({changeState}) {
    const {userId, headers, URL} = useContext(StorageContext);
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [refresh, setRefresh] = useState([]);
    changeState();

    useEffect(() => {
        async function getUser() {
            try {
                const {data} = await axios.get(`${URL}/user/${userId}`, headers);
                setUser(data);
            } catch(e) {
                console.log(e);
                alert('Ocorreu um erro, tente novamente mais tarde!');
            }
        }

        getUser();
    }, [URL, userId, headers]);

    async function update(e) {
        e.preventDefault();
        try {
            await axios.put(`${URL}/user/update/${userId}`, user, headers);
            alert('Alterações salvas com sucesso!');
            setRefresh([]);
        } catch(e) {
            console.log(e.response.data);
        }
    }

    return user ? (
        <Container>
            <Text>Olá, {user.name}</Text>
            <Form onSubmit={update}>
                <Label>Alterar nome</Label>
                <Input placeholder={user.name} type='text' required value={user.name} onChange={e => setUser({...user, name: e.target.value})}/>
                <Button type='submit'>Salvar alterações</Button>
            </Form>
            <Button className='delete' onClick={() => navigate('/user/delete')}>Excluir conta</Button>
        </Container>
    ) : 
    <>Loading</>;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .delete {
        bottom: 50px;
        width: 150px;
        height: 50px;
        font-size: 20px;
        position: absolute;
        color: var(--color-delete);
        border: 2px solid var(--color-delete);
        background-color: transparent;
    }
`;

const Text = styled.h1`
    top: 20px;
    margin-top: 20px;
    font-size: 30px;
    position: absolute;
    font-family: var(--font-passion);
`;

const Form = styled.form`
    height: 450px;
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
    height: 100px;
    height: 80px;
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
    max-width: 500px;
    height: 80px;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 6px; 
    border: none;
    color: #FFFFFF;
    background: #1877F2;
    font-family: var(--font-osvald);

    :hover {
        cursor: pointer;
    }  
`;