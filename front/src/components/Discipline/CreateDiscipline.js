import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

import StorageContext from '../../contexts/StorageContext.js';

export default function CreateDiscipline() {
    const navigate = useNavigate();
    const {URL, headers} = useContext(StorageContext);
    const [discipline, setDiscipline] = useState({
        discipline: '',
        teacher: '',
        clasroom: '',
        color: ''
    });
    const colors = [
        {name: '', background: '', display: 'Selecione uma cor'},
        {name: 'blue', background: 'blue'},
        {name: 'pink', background: 'pink'},
        {name: 'green', background: 'green'},
        {name: 'gray', background: 'gray'},
        {name: 'black', background: 'black'},
        {name: 'white', background: 'wihite'},
    ];

    async function register(e) {
        e.preventDefault();
        try {
            await axios.post(`${URL}/discipline/create`, discipline, headers);
            alert('Disciplina cadastrada!');
            navigate('/discipline');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Form onSubmit={register}>
                <Input placeholder='Nome da disciplina' type='text' required value={discipline.discipline} onChange={e => setDiscipline({...discipline, discipline: e.target.value})}/>
                <Input placeholder='Nome do(a) professor(a)' type='text' required value={discipline.teacher} onChange={e => setDiscipline({...discipline, teacher: e.target.value})}/>
                <Input placeholder='Sala de aula' type='text' required value={discipline.clasroom} onChange={e => setDiscipline({...discipline, clasroom: e.target.value})}/>
                <Select required value={discipline.color} onChange={e => setDiscipline({...discipline, color: e.target.value})}>
                    {colors.map(color => {
                        return <Option key={color.id} value={color.name} background={color.background}>{color.display ? color.display : ''}</Option>
                    })} 
                </Select>
                <Button type='submit'>Cadastrar Disciplina</Button>
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

const Select = styled.select`



`;

const Option = styled.option`
    background-color: ${props => props.background};
`;

const Button = styled.button`

`;