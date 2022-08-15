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

        async function getEvents() {
            try {
                const {data} = await axios.get(`${URL}/timetables`, headers);
                const timetables = data.map(timetable => {
                    return {...timetable, start: moment(timetable.start), end: moment(timetable.end)};
                });
                setEvents(timetables);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getDisciplines();
        getEvents();
    }, [URL, headers]);
    
    function postEvents(start, end) {
        try {
            axios.post(`${URL}/timetable/create/${event.disciplineId}`, {value: event.value, start, end}, headers);
            alert('Horário cadastrado!');
            window.location.reload();
        } catch(e) {
            alert(e.response.data);
        }
    }

    async function exclude(start, end) {
        const event = events.find(e => e.start === start && e.end === end);
        try {
            await axios.delete(`${URL}/timetable/delete/${event.id}`, headers); 
            alert('Horário deletado!');
            window.location.reload();
        } catch(e) {
            alert(e.response.data);
        }
    }

    function ModalView({start, end}) {
        return (
            <Modal>
                <Close className='close' onClick={() => window.location.reload()}>X</Close>
                <div>
                    <span>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>
                </div>
                <Form>
                <Input placeholder="Descrição" type='text' required value={event.value} onChange={e => setEvent({...event, value: e.target.value})}/>
                <Select required value={event.disciplineId} onChange={e => setEvent({...event, disciplineId: e.target.value})}>
                    {disciplines.map((discipline, id) => {
                        return <option key={id} value={discipline.id}>{discipline.discipline}</option>
                    })} 
                </Select>
                <Button type='submit' onClick={() => postEvents(start, end)}>Salvar</Button>
                </Form>
              <Button className='delete' onClick={() => exclude(start, end)}>Deletar</Button>
            </Modal>
        );
    }

    function EventView(props) {
        const {start, end, value} = props;
        const event = events.find(e => start === e.start && end === e.end && value === e.value);
        
        return (
            <Event background={event.color}>
                <p>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</p><br/>
                <p>{value}</p><br/>
                <p>{event.clasroom}</p>
            </Event>
        );
    }

    return events ? (
        <Container>
            <WeekCalendar  
                scaleUnit={60}
                eventSpacing={0}
                cellHeight={100}
                firstDay={moment().day(0)}
                headerCellComponent={HeaderCell}
                selectedIntervals = {events}
                onIntervalSelect={postEvents}
                eventComponent={EventView}
                modalComponent={ModalView}
            />
        </Container>
    ) : <>Loading</>;
}

function HeaderCell({date}) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return <span className="title">{days[dayjs(date).day()]}</span>;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 50px 40px;
    margin-top: 20px;
    font-family: var(--font-osvald);
    --calendar-max-height: 100%;
    --column-min-width: 60px;
    --padding-left: 60px;


    .weekCalendar {
        overflow: hidden;
        padding-left: var(--padding-left);
    }

    .weekCalendar__header {
        padding-left: var(--padding-left);
    }

    .weekCalendar__content {
        max-height: var(--calendar-max-height);
    }

    .calendarBody__column {
        min-width: var(--column-min-width);
    }

    .weekCalendar__scaleColumn {
        width: 60px;
    }

    .weekCalendar__scaleHeader {
        width: 60px;
    }

    .delete {
        margin-top: 50px;
        color: #FFFFFF;
        background: var(--color-delete);
    }

    span {
        font-size: 20px;
    }
`;

const Event = styled.div`
    width: 100%;
    height: 100%;
    padding: 5px;
    font-size: 10pt;
    border-radius: 5px;
    overflow: hidden;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${props => props.background};
`;

const Modal = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
`;

const Button = styled.button`
    height: 50px;
    font-size: 20px;
    margin: 10px 0;
    border-radius: 10px;
    background-color: transparent;
    background: #3087fa;
    font-family: var(--font-osvald);
`;

const Close = styled.a`
    top: 20px;
    right: 50px;
    font-size: 27px;
    position: absolute;

    :hover {
        cursor: pointer;
    }
`;

const Form = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    height: 50px;
    margin: 10px 0;
    padding: 15px;
    font-size: 20px;
    line-height: 40px;
    border-radius: 10px; 
    color: #333333;
    background: #FFFFFF;
    font-family: var(--font-osvald);

    ::placeholder {
        color: #9F9F9F;
    }
`;

const Select = styled.select`
    height: 50px;
    margin: 10px 0;
    padding: 10px;
    font-size: 20px;
    line-height: 40px;
    border-radius: 10px; 
    color: #333333;
    background: #FFFFFF;
    font-family: var(--font-osvald);
`;