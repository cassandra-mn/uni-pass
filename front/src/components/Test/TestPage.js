import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiFillCalendar} from 'react-icons/ai';
import Popup from 'reactjs-popup';
import axios from 'axios';
import dayjs from 'dayjs';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import StorageContext from '../../contexts/StorageContext.js';

export default function TestPage({changeState}) {
    const {headers, URL} = useContext(StorageContext);
    const [tests, setTests] = useState();
    const [test, setTest] = useState({});
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    changeState();

    const Update = ({test}) => (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <Modal>
                <Close onClick={() => setOpen(false)}>x</Close>
                <Form onSubmit={update}>
                    <Input placeholder={test.test} type='text' required value={test.test} onChange={e => setTest({...test, test: e.target.value})}/>
                    <Input placeholder={test.date} type='date' required value={test.date} onChange={e => setTest({...test, date: e.target.value})}/>
                    <Button type='submit'>Salvar alterações</Button>
                </Form>
            </Modal>
        </Popup>
    );

    useEffect(() => {
        async function getTests() {
            try {
                const {data} = await axios.get(`${URL}/tests`, headers);
                setTests(data);
            } catch(e) {
                alert(e.response.data);    
            }
        }

        getTests();
    }, [URL, headers]);

    async function update(e) {
        e.preventDefault();
        try {
            await axios.put(`${URL}/test/update/${test.id}`, {test: test.test, date: test.date}, headers);
            alert('Alterações salvas com sucesso!');
            window.location.reload();
        } catch(e) {
            alert(e.response.data);
        }
    }

    async function exclude(id) {
        const confirm = window.confirm('Tem certeza que deseja deletar?');
        if (confirm) {
            try {
                await axios.delete(`${URL}/test/delete/${id}`, headers);
                window.location.reload();
            } catch(e) {
                alert(e.response.data);
            }
        }
    }
    
    return tests ? (
        <Container>
            <Tests>
                {tests.length === 0 ? 
                    <p>Não há provas a serem exibidas!</p>
                    : (tests.map(test => {
                        return (
                            <Test key={test.id} onClick={() => setOpen(true) & setTest(test)}>
                                <div>
                                    <h1>{test.test}</h1>
                                    <p><AiFillCalendar /> {dayjs(test.date).add(1, 'day').format('DD/MM/YYYY')}</p>
                                    <div className='flex'>
                                        <Color background={test.color}></Color>
                                        <small>{test.discipline}</small>
                                    </div>
                                </div>
                                <DeleteIcon color='error' onClick={() => exclude(test.id)} />
                            </Test>
                        ); 
                    }))
                }
                <Update test={test} />
            </Tests>
            <BasicSpeedDial />
        </Container>
    ) : <>Loading</>;
}

function BasicSpeedDial() {
    const navigate = useNavigate();
    
    return (
        <Box onClick={() => navigate('/test/create')}>
            <SpeedDial
                ariaLabel='SpeedDial basic example'
                sx={{position: 'absolute', bottom: 40, right: 40}}
                icon={<SpeedDialIcon />}
            >
            </SpeedDial>
        </Box>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 50px 35px;
    font-family: var(--font-osvald);
`;

const Tests = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Test = styled.div`
    width: 100%;
    margin: 5px;
    padding: 15px;
    border: 1px  black solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;

    .flex {
        display: flex;
        align-items: center;
    }

    h1 {
        font-weight: 600;
        font-size: 22px;
        margin-bottom: 10x;
    }
    
    p {
        font-size: 18px;
        margin: 10px 0;
        color: #313131;
    }

    small {
        margin-left: 5px;
        font-size: 18px;
        color: #313131;
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
    width: 100vw;
    height: 85vh;
    padding: 50px;
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