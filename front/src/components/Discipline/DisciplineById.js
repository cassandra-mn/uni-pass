import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import StorageContext from '../../contexts/StorageContext.js';

export default function DisciplineById() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {URL, headers} = useContext(StorageContext); 
    const [discipline, setDiscipline] = useState();
    const [list, setList] = useState({
        infos: false,
        tests: false,
        tasks: false,
        timetables: false
    });

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
            <Title>{discipline.discipline}</Title>
            <div className='icons'>
                <Link to={`/discipline/update/${id}`} state={discipline}>
                    <EditIcon color='primary' className='edit' />
                </Link>
                <DeleteIcon color='error' className='delete' onClick={exclude} />
            </div>
            <Discipline>
                <div className='box'>
                    <h1 onClick={() => setList({...list, infos: !list.infos})}>
                        Informações gerais 
                        <small>
                            {list.infos ? <ExpandLess /> : <ExpandMore />}
                        </small>
                    </h1>
                    {list.infos ? (<>
                        <p>Nome: {discipline.discipline}</p>
                        <p>Professor: {discipline.teacher}</p>
                        <p>Sala: {discipline.clasroom}</p>
                    </>) : ''}
                </div>
                <div className='box'>
                    <h1 onClick={() => setList({...list, tests: !list.tests})}>
                        Provas
                        <small>
                            {list.tests ? <ExpandLess /> : <ExpandMore />}
                        </small>
                    </h1>
                    {list.tests ? (
                        discipline.tests.map(test => {
                            return <p key={test.id}>{test.test} - {dayjs(test.date).format('DD/MM')}</p>
                        })
                    ) : ''}
                </div>
                <div className='box'>
                    <h1 onClick={() => setList({...list, tasks: !list.tasks})}>
                        Tarefas
                        <small>
                            {list.tasks ? <ExpandLess /> : <ExpandMore />}
                        </small>
                    </h1>
                    {list.tasks ? (
                        discipline.tasks.map(task => {
                            return <p key={task.id}>{task.task} - {dayjs(task.finalDate).format('DD/MM')}</p>
                        })
                    ) : ''}
                </div>
                <div className='box'>
                    <h1 onClick={() => setList({...list, timetables: !list.timetables})}>
                        Horário
                        <small>
                            {list.timetables ? <ExpandLess /> : <ExpandMore />}
                        </small>  
                    </h1>
                    {list.timetables ? (
                        discipline.timetables.map(timetable => {
                            const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
                            return <p key={timetable.id}>{days[dayjs(timetable.start).day()]}: {dayjs(timetable.start).format('HH:mm')} - {dayjs(timetable.end).format('HH:mm')}</p>
                        })
                    ) : ''}
                </div>
            </Discipline>
        </Container>
    ) : <>Loading</>;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 30px;

    .icons {
        position: absolute;
        top: 30px;
        right: 30px;
    }

    .edit {
        width: 30px;
        height: 30px;
        margin: 0  5px;
    }

    .delete {
        width: 30px;
        height: 30px;

        :hover {
            cursor: pointer;
        }
    }
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
    font-family: var(--font-passion);
`;

const Discipline = styled.div`
    margin-top: 40px;
    font-family: var(--font-osvald);
    
    .box {
        padding: 15px;
        margin: 20px 0;
        border-radius: 10px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: center;

        :hover {
            cursor: pointer;
        }
    }
    
    h1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    p {
        margin: 5px 0;
    }
`;