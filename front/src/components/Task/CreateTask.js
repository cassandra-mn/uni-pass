import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Loading from '../Loading.js';
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
                <Button className='submit' type='submit'>Cadastrar Tarefa</Button>
            </Form>
        </Container>
    ) : <Loading />;
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

    .submit {
        margin-top: 50px;
        color: #FFFFFF;
        background: #1877F2;
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
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: transparent;
    font-family: var(--font-osvald);

    :hover {
        cursor: pointer;
    }
`;

const Select = styled.select`
    height: 70px;
    font-size: 27px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 2px solid black;
    background-color: transparent;
    font-family: var(--font-osvald);
`;

const Option = styled.option`
    border-radius: 50%;
    font-family: var(--font-osvald);
`;