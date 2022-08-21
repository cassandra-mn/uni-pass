import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Loading from '../Loading.js';
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
                <Button className='submit' type='submit'>Cadastrar Prova</Button>
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