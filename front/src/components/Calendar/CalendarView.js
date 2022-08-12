import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {AiFillCalendar} from 'react-icons/ai';
import {Calendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import StorageContext from '../../contexts/StorageContext';

export default function CalendarView({changeState}) {
    const {headers, URL} = useContext(StorageContext);
    const [tests, setTests] = useState();
    const [tasks, setTasks] = useState();
    const [visible, setVisible] = useState(false);
    const [events, setEvents] = useState([]);
    changeState();

    useEffect(() => {
        async function getTests() {
            try {
                const {data} = await axios.get(`${URL}/tests`, headers);
                setTests(data);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        async function getTasks() {
            try {
                const {data} = await axios.get(`${URL}/tasks`, headers);
                setTasks(data);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getTests();
        getTasks();
    }, [URL, headers]);

    function print(day) {
        const dayFormated = dayjs(day).format('DD/MM/YYYY');
        let events = [];
        setVisible(true);
        
        const test = tests.filter(test => dayjs(test.date).add(1, 'day').format('DD/MM/YYYY') === dayFormated);
        const task = tasks.filter(task => dayjs(task.finalDate).add(1, 'day').format('DD/MM/YYYY') === dayFormated);

        if (test.length > 0) {
            test.forEach(t => {
                events = [...events, t];
            });
        }

        if (task.length > 0) {   
            task.forEach(t => {
                events = [...events, t];
            });
        }

        setEvents({dayFormated, events});
    }

    function setContent({date}) {
        const day = dayjs(date).format('DD/MM/YYYY');
        
        const test = tests.filter(test => dayjs(test.date).add(1, 'day').format('DD/MM/YYYY') === day);
        const task = tasks.filter(task => dayjs(task.finalDate).add(1, 'day').format('DD/MM/YYYY') === day);

        if (test.length !== 0 && task.length !== 0) {
            return (
                <div className='flex'>
                    {test.map(t => <p key={t.id} className={t.color}>.</p>)}
                    {task.map(t => <p key={t.id} className={task[0].color}>.</p>)}
                </div>
            );
        }
        if (test.length !== 0) {
            return (
                <div className='flex'>
                    {test.map(t => <p key={t.id} className={t.color}>.</p>)}
                </div>
            );
        }
        if (task.length !== 0) {
            return (
                <div className='flex'>
                    {task.map(t => <p key={t.id} className={task[0].color}>.</p>)}
                </div>
            );
        }
    }

    return tests && tasks ? (
        <Container>
            <Calendar 
                calendarType='US' 
                className='calendar'
                tileContent={setContent} 
                onClickDay={print}
            />
            {visible ? 
                <div>
                    <div className='infos'>
                        <h1>Seus eventos </h1>
                        <p><AiFillCalendar /> {events.dayFormated}</p>
                    </div>
                    {events.events.map(event => {
                        if (event.test) {
                            return (
                                <div key={event.id} className='event'>
                                    <p>{event.test}</p>
                                    <p>{event.discipline}</p>
                                </div>
                            ); 
                        } else {
                            return (
                                <div key={event.id} className='event'>
                                    <p>{event.task}</p>
                                    <p>{event.discipline}</p>
                                </div>
                            );
                        }
                    })}
                </div>
            : ''
            }
        </Container>
    ) : <>Loading</>;
}

const Container = styled.div`

    .calendar {
        
    }

    .blue {
        font-size: 25px;
        font-weight: 900;
        color: blue;
    }

    .white {
        font-size: 25px;
        font-weight: 900;
        color: black; //FIXME:
    }

    .flex {
        display: flex;
        justify-content: center;
    }

    .infos {
        display: flex;
        justify-content: space-between;
    }

    .event {
        margin: 5px;
    }
`;