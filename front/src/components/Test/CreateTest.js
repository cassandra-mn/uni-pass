import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import StorageContext from '../../contexts/StorageContext.js';

export default function CreateTest() {
    const navigate = useNavigate();
    const {headers, URL} = useContext(StorageContext);
    const [disciplines, setDisciplines] = useState([
        {discipline: 'Selecione uma disciplina'},
    ]);
    const [test, setTest] = useState({
        test: '',
        date: '',
        disciplineId: ''
    });
    
    useEffect(() => {
        async function getDisciplines() {
            try {
                const {data} = await axios.get(`${URL}/disciplines`, headers);
                setDisciplines([...disciplines, ...data]);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getDisciplines();
    }, [URL, headers]);

    async function register(e) {
        e.preventDefault();
        try {
            await axios.post(`${URL}/test/create/${test.disciplineId}`, {test: test.test, date: test.date}, headers);
            alert('Prova cadastrada!');
            navigate('/test');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return disciplines ? (
        <Container>
            <Form onSubmit={register}>
                <Input placeholder='Descrição' type='text' required value={test.test} onChange={e => setTest({...test, test: e.target.value})}/>
                <Input placeholder='Data da prova' type='date' required value={test.date} onChange={e => setTest({...test, date: e.target.value})}/>
                <Select required value={test.disciplineId} onChange={e => setTest({...test, disciplineId: e.target.value})}>
                    {disciplines.map((discipline, id) => {
                        return <Option key={id} value={discipline.id}>{discipline.discipline}</Option>
                    })} 
                </Select>
                <Button type='submit'>Cadastrar Disciplina</Button>
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