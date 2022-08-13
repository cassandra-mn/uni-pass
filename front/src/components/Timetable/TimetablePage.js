import {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import dayjs from 'dayjs';
import axios from 'axios';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';

import StorageContext from '../../contexts/StorageContext.js';

export default function Timetable({changeState}) {
    const {headers, URL} = useContext(StorageContext);
    const [events, setEvents] = useState();
    const [event, setEvent] = useState({
        value: '',
        disciplineId: ''
    });
    const [disciplines, setDisciplines] = useState([
        {discipline: 'Selecione uma disciplina'},
    ]);
    changeState();
    
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
    
    function postEvents(start, end) {
        try {
            axios.post(`${URL}/timetable/create/${event.disciplineId}`, {value: event.value, startTime: start._d, finalTime: end._d}, headers);
            alert('ok');
            window.location.reload();
        } catch(e) {
            alert(e.response.data);
        }
    }

    function Modal({start, end}) {
        return (
            <div>
                <div>
                    <span>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>
                </div>
                <input placeholder="Descrição" type='text' required value={event.value} onChange={e => setEvent({...event, value: e.target.value})}/>
                <select required value={event.disciplineId} onChange={e => setEvent({...event, disciplineId: e.target.value})}>
                    {disciplines.map((discipline, id) => {
                        return <option key={id} value={discipline.id}>{discipline.discipline}</option>
                    })} 
                </select>
              <button onClick={() => window.location.reload()}>Voltar</button>
              <button onClick={() => postEvents(start, end)}>Salvar</button>
            </div>
        );
    }

    return (
        <Container>
            <WeekCalendar  
                scaleUnit={60}
                cellHeight={50}
                firstDay={moment().day(0)}
                headerCellComponent={HeaderCell}
                selectedIntervals = {events}
                onIntervalSelect={postEvents}
                modalComponent={Modal}
            />
        </Container>
    );
}

function HeaderCell({date}) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return <span className="title">{days[dayjs(date).day()]}</span>;
}

const Container = styled.div`

    .event {
        background: #2e78d6 ;
        color: #fff ;
        border-radius: 5px ;
        font-size: 10pt ;
        opacity: 0,8 ;
    }
`;