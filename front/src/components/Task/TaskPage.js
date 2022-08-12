import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiFillCalendar} from 'react-icons/ai';
import axios from 'axios';
import dayjs from 'dayjs';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function TaskPage({changeState}) {
    const navigate = useNavigate();
    const {headers, URL} = useContext(StorageContext);
    const [tasks, setTasks] = useState();
    const [task, setTask] = useState({});
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    changeState();

    const Update = ({task}) => (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <Modal>
                <Close onClick={() => setOpen(false)}>x</Close>
                <Form onSubmit={update}>
                    <Input placeholder={task.task} type='text' required value={task.task} onChange={e => setTask({...task, task: e.target.value})}/>
                    <Input placeholder={task.finalDate} type='date' required value={task.finalDate} onChange={e => setTask({...task, finalDate: e.target.value})}/>
                    <Button type='submit'>Salvar alterações</Button>
                </Form>
                <Button onClick={() => {}}>Deletar</Button>
            </Modal>
        </Popup>
    );

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

    async function update(e) {
        e.preventDefault();
        try {
            await axios.put(`${URL}/task/update/${task.id}`, {task: task.task, finalDate: task.finalDate}, headers);
            alert('Alterações salvas com sucesso!');
            window.location.reload();
        } catch(e) {
            alert(e.response.data);
        }
    }
    
    return tasks ? (
        <Container>
            <Button onClick={() => navigate('/task/create')}>Adicionar tarefa</Button>
            <Tasks>
                {tasks.length === 0 ? 
                    <p>Não há provas a serem exibidas!</p>
                    : (tasks.map(task => {
                        return (
                            <Task key={task.id} onClick={() => setOpen(true) & setTask(task)}>
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
                <Update task={task} />
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

const Modal = styled.div`

`;

const Close = styled.a`

`;

const Form = styled.form`

`;

const Input = styled.input`

`;