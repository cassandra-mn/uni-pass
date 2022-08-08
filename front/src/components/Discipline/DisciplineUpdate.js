import {useContext, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import StorageContext from '../../contexts/StorageContext.js';

export default function DisciplineUpdate() {
    const navigate = useNavigate();
    const location = useLocation();
    const {URL, headers} = useContext(StorageContext);
    const [discipline, setDiscipline] = useState(location.state);

    async function update(e) {
        e.preventDefault();
        try {
            await axios.put(`${URL}/discipline/update/${discipline.id}`, discipline, headers);
            alert('Alterações salvas com sucesso!');
            navigate(`/discipline/${discipline.id}`);
        } catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Button onClick={() => navigate(`/discipline/${discipline.id}`)}>Voltar</Button>
            <Form onSubmit={update}>
                <Input placeholder={discipline.discipline} type='text' required value={discipline.discipline} onChange={e => setDiscipline({...discipline, discipline: e.target.value})}/>
                <Input placeholder={discipline.teacher} type='text' required value={discipline.teacher} onChange={e => setDiscipline({...discipline, teacher: e.target.value})}/>
                <Input placeholder={discipline.clasroom} type='text' required value={discipline.clasroom} onChange={e => setDiscipline({...discipline, clasroom: e.target.value})}/>
                <Button type='submit'>Salvar alterações</Button>
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