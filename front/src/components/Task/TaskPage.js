import {useContext, useEffect, useState} from 'react';
import {AiFillCalendar} from 'react-icons/ai';
import axios from 'axios';
import dayjs from 'dayjs';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function TaskPage({changeState}) {
    const {headers, URL} = useContext(StorageContext);
    const [tasks, setTasks] = useState();
    changeState();


    useEffect(() => {
        async function getTests() {
            try {
                const {data} = await axios.get(`${URL}/tasks`, headers);
                setTasks(data);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getTests();
    }, [URL, headers]);
    
    return tasks ? (
        <Container>
            <Button onClick={() => {}}>Adicionar tarefa</Button>
            <Tasks>
                {tasks.length === 0 ? 
                    <p>Não há provas a serem exibidas!</p>
                    : (tasks.map(task => {
                        return (
                            <Task key={task.id} onClick={() => {}}>
                                <p>{task.task}</p>
                                <p><AiFillCalendar /> {dayjs(task.finalDate).add(1, 'day').format('DD/MM/YYYY')}</p>
                                <p className='flex'>
                                    <Color background={task.color}></Color>
                                    <small>{task.discipline}</small>
                                </p>
                            </Task>
                        ); 
                    }))
                }
            </Tasks>
        </Container>
    ) : <>Loading</>;
}

const Container = styled.div`

`;

const Button = styled.button`

`;

const Tasks = styled.div`

`;

const Task = styled.div`
    margin: 1px;
    border: 1px  black solid;

    .flex {
        display: flex;
        align-items: center;
    }

    :hover {
        cursor: pointer;
    }
`;

const Color = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.background};
`;