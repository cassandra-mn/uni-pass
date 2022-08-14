import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';

import StorageContext from '../../contexts/StorageContext.js';

export default function DisciplineById() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {URL, headers} = useContext(StorageContext); 
    const [discipline, setDiscipline] = useState();

    useEffect(() => {
        async function getDiscipline() {
            const discipline = await axios.get(`${URL}/discipline/${id}`, headers);
            setDiscipline(discipline.data);
        }

        getDiscipline();
    }, [URL, headers, id]);

    async function exclude() {
        const confirm = window.confirm('Tem certeza que deseja deletar a disciplina?');
        if (confirm) {
            try {
                await axios.delete(`${URL}/discipline/delete/${id}`, headers);
                navigate('/discipline');
            } catch(e) {
                alert(e.response.data);
            }
        }
    }

    return discipline ? (
        <Container>
            <Link to={`/discipline/update/${id}`} state={discipline}>Editar</Link>
            <Button onClick={exclude}>Excluir disciplina</Button>
            <Discipline>
                <Infos>
                    <h1>Informações gerais</h1>
                    <p>Nome: {discipline.discipline}</p>
                    <p>Professor: {discipline.teacher}</p>
                    <p>Sala: {discipline.clasroom}</p>
                </Infos>
                <Tests>
                    <h1>Provas</h1>
                    {discipline.tests.map(test => {
                        return <p key={test.id}>{test.test} - {dayjs(test.date).format('DD/MM')}</p>
                    })}
                </Tests>
                <Tasks>
                    <h1>Tarefas</h1>
                    {discipline.tasks.map(task => {
                        return <p key={task.id}>{task.task} - {dayjs(task.finalDate).format('DD/MM')}</p>
                    })}
                </Tasks>
                <Timetable>
                    <h1>Horário</h1>
                    {discipline.timetables.map(timetable => {
                        return <p key={timetable.id}>{dayjs(timetable.start).format('HH:mm')} - {dayjs(timetable.end).format('HH:mm')}</p>
                    })}
                </Timetable>
            </Discipline>
        </Container>
    ) : <>Loading</>;
}

const Container = styled.div`

`;

const Button = styled.button`

`;

const Discipline = styled.div`
`;

const Infos = styled.div`

`;

const Tests = styled.div`

`;

const Tasks = styled.div`

`;

const Timetable = styled.div`

`;