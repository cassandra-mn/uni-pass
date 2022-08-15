import {useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import StorageContext from '../../contexts/StorageContext';

export default function DisciplinePage({changeState}) {
    const navigate = useNavigate();
    const {headers, URL} = useContext(StorageContext);
    const [disciplines, setDisciplines] = useState();
    changeState();
    
    useEffect(() => {
        async function getDisciplines() {
            try {
                const {data} = await axios.get(`${URL}/disciplines`, headers);
                setDisciplines(data);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getDisciplines();
    }, [URL, headers]);

    return disciplines ? (
        <Container>
            <Title>Disciplinas</Title>
            <Disciplines>
                {disciplines.length === 0 ? 
                    <p>Não há disciplinas cadastradas!</p>
                    : (disciplines.map(discipline => {
                        const {id, discipline: name} = discipline;
                        return (
                            <Discipline key={id} border={discipline.color} 
                                onClick={() => navigate(`/discipline/${id}`)}>
                                {name}
                            </Discipline>
                        );
                    }))
                }
            </Disciplines>
            <BasicSpeedDial />
        </Container>
    ) : <>Loading</>;
}

function BasicSpeedDial() {
    const navigate = useNavigate();
    
    return (
        <Box onClick={() => navigate('/discipline/create')}>
            <SpeedDial
                ariaLabel='SpeedDial basic example'
                sx={{position: 'absolute', bottom: 50, right: 50}}
                icon={<SpeedDialIcon />}
            >
            </SpeedDial>
        </Box>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 30px 50px;
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
    font-family: var(--font-passion);
`;

const Disciplines = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
`;

const Discipline = styled.button`
    height: 100px;
    margin: 15px 0;
    font-size: 20px;
    font-weight: 700;
    border-radius: 20px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    border: 2px solid ${props => props.border};
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    :hover {
        cursor: pointer;
    }
`;