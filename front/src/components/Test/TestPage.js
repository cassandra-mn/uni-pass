import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiFillCalendar} from 'react-icons/ai';
import axios from 'axios';
import dayjs from 'dayjs';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function TestPage({changeState}) {
    const navigate = useNavigate();
    const {headers, URL} = useContext(StorageContext);
    const [tests, setTests] = useState();
    changeState();

    useEffect(() => {
        async function getDisciplines() {
            try {
                const {data} = await axios.get(`${URL}/tests`, headers);
                setTests(data);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getDisciplines();
    }, [URL, headers]);
    
    return tests ? (
        <Container>
            <Button onClick={() => navigate('/test/create')}>Adicionar prova</Button>
            <Tests>
                {tests.length === 0 ? 
                    <p>Não há provas a serem exibidas!</p>
                    : (tests.map(test => {
                        return (
                            <Test key={test.id}>
                                <p>{test.test}</p>
                                <p><AiFillCalendar /> {dayjs(test.date).add(1, 'day').format('DD/MM/YYYY')}</p>
                                <p className='flex'>
                                    <Color background={test.color}></Color>
                                    <p>{test.discipline}</p>
                                </p>
                            </Test>
                        ); 
                    }))
                }
            </Tests>
        </Container>
    ) : <>Loading</>;
}

const Container = styled.div`

`;

const Button = styled.button`

`;

const Tests = styled.div`

`;

const Test = styled.div`
    margin: 1px;
    border: 1px  black solid;

    .flex {
        display: flex;
        align-items: center;
    }
`;

const Color = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.background};
`;