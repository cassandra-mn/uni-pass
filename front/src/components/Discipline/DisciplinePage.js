import {useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext';

export default function HomePage() {
    const navigate = useNavigate();
    const {headers, URL} = useContext(StorageContext);
    const [disciplines, setDisciplines] = useState();
    
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
            <Button onClick={() => navigate('/discipline/create')}>Cadastrar disciplina</Button>
            <Disciplines>
                {disciplines.length === 0 ? 
                    <p>Não há disciplinas cadastradas!</p>
                    : (disciplines.map(discipline => {
                        return <Discipline key={discipline.id}>{discipline.discipline}</Discipline>
                    }))
                }
            </Disciplines>
            </Container>
    ) : <>Loading</>;
}

const Container = styled.div`

`;

const Button = styled.button`

`;

const Disciplines = styled.div`

`;

const Discipline = styled.div`

`;