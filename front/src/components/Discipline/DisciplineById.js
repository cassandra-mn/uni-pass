import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function DisciplineById() {
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

    console.log(discipline)
    return discipline ? (
        <Container>
            <Discipline>
                <Infos>
                    <h1>Informações gerais</h1>
                    <p>Nome: {discipline.discipline}</p>
                    <p>Professor: {discipline.teacher}</p>
                    <p>Sala: {discipline.clasroom}</p>
                </Infos>
                <Tests>
                    <h1>Provas</h1>
                </Tests>
                <Tasks>
                    <h1>Tarefas</h1>
                </Tasks>
                <Timetable>
                    <h1>Horário</h1>
                </Timetable>
            </Discipline>
        </Container>
    ) : <>Loading</>;
}

const Container = styled.div`

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