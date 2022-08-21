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
            navigate(-1);
        } catch(e) {
            console.log(e.response)
            alert(e.response.data);
        }
    }

    return (
        <Container>
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
    width: 100vw;
    height: 100vh;
    padding: 40px;
    margin-top: 40px;

    .block {
        display: flex;
        justify-content: space-around;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    height: 70px;
    padding: 15px;
    margin-bottom: 12px;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 10px; 
    color: #333333;
    background: #FFFFFF;
    font-family: var(--font-osvald);

    ::placeholder {
        color: #9F9F9F;
    }
`;

const Button = styled.button`
    height: 70px;
    font-size: 27px;
    margin-top: 50px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-family: var(--font-osvald);
    color: #FFFFFF;
    background: #1877F2;

    :hover {
        cursor: pointer;
    }
`;