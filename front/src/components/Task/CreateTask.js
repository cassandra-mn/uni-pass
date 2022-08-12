import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function CreateTask() {
    const navigate = useNavigate();
    const {headers, URL} = useContext(StorageContext);
    const [disciplines, setDisciplines] = useState([
        {discipline: 'Selecione uma disciplina'},
    ]);
    const [task, setTask] = useState({
        task: '',
        finalDate: '',
        disciplineId: ''
    });

    useEffect(() => {
        async function getDisciplines() {
            try {
                const {data} = await axios.get(`${URL}/disciplines`, headers);
                setDisciplines(disciplines => [...disciplines, ...data]);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getDisciplines();
    }, [URL, headers]);

    async function register(e) {
        e.preventDefault();
        try {
            await axios.post(`${URL}/task/create/${task.disciplineId}`, {task: task.task, finalDate: task.finalDate}, headers);
            alert('Tarefa cadastrada!');
            navigate('/task');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return disciplines ? (
        <Container>
            <Form onSubmit={register}>
                <Input placeholder='Descrição' type='text' required value={task.task} onChange={e => setTask({...task, task: e.target.value})}/>
                <Input placeholder='Data de entrega' type='date' required value={task.date} onChange={e => setTask({...task, finalDate: e.target.value})}/>
                <Select required value={task.disciplineId} onChange={e => setTask({...task, disciplineId: e.target.value})}>
                    {disciplines.map((discipline, id) => {
                        return <Option key={id} value={discipline.id}>{discipline.discipline}</Option>
                    })} 
                </Select>
                <Button type='submit'>Cadastrar Tarefa</Button>
            </Form>
        </Container>
    ) : <>Loading</>;
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

`;

const Button = styled.button`

`;