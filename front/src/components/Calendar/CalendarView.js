import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {AiFillCalendar} from 'react-icons/ai';
import {Calendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Loading from '../Loading';
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
                <Flex>
                    {test.map(t => <P color={t.color} key={t.id}>.</P>)}
                    {task.map(t => <P color={t.color} key={t.id}>.</P>)}
                </Flex>
            );
        }
        if (test.length !== 0) {
            return (
                <Flex>{test.map(t => <P color={t.color} key={t.id}>.</P>)}</Flex>
            );
        }
        if (task.length !== 0) {
            return (
                <Flex>{task.map(t => <P color={t.color} key={t.id}>.</P>)}</Flex>
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
                    <Timeline position="alternate">
                    {events.events.map(event => {
                        if (event.test) {
                            console.log(event.color)
                            return (
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        <p>{event.discipline}</p>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <p>{event.test}</p>
                                    </TimelineContent>
                                </TimelineItem>
                            ); 
                        } else {
                            return (
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        <p>{event.discipline}</p>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <p>{event.task}</p>
                                    </TimelineContent>
                                </TimelineItem>
                            );
                        }
                    })}
                    </Timeline>
                </div>
            : ''
            }
        </Container>
    ) : <Loading />;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 50px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font-osvald);

    .infos {
        width: 70vw;
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        color: #313131;

        h1 {
            font-size: 20px;
        }
    }
`;

const Flex = styled.div`
    display: flex;
    justify-content: center;
`;

const P = styled.p`
    font-size: 25px;
    font-weight: 900;
    color: ${props => props.color};
`;