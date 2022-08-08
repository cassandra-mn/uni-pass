import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function UserUpdate() {
    const {userId, headers, URL} = useContext(StorageContext);
    const [user, setUser] = useState();
    const [refresh, setRefresh] = useState([]);

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
            <Form onSubmit={update}>
                <Input placeholder={user.name} type='text' required value={user.name} onChange={e => setUser({...user, name: e.target.value})}/>
                <Button type='submit'>Salvar alterações</Button>
            </Form>
        </Container>
    ) : 
    <>Loading</>;
}

const Container = styled.div`

`;

const Form = styled.form`

`;

const Input = styled.input`

`;

const Button = styled.button`

`;