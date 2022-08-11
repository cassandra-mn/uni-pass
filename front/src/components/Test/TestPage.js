import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiFillCalendar} from 'react-icons/ai';
import Popup from 'reactjs-popup';
import axios from 'axios';
import dayjs from 'dayjs';
import styled from 'styled-components';

import StorageContext from '../../contexts/StorageContext.js';

export default function TestPage({changeState}) {
    const navigate = useNavigate();
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
    
    return tests ? (
        <Container>
            <Button onClick={() => navigate('/test/create')}>Adicionar prova</Button>
            <Tests>
                {tests.length === 0 ? 
                    <p>Não há provas a serem exibidas!</p>
                    : (tests.map(test => {
                        return (
                            <Test key={test.id} onClick={() => setOpen(true) & setTest(test)}>
                                <p>{test.test}</p>
                                <p><AiFillCalendar /> {dayjs(test.date).add(1, 'day').format('DD/MM/YYYY')}</p>
                                <p className='flex'>
                                    <Color background={test.color}></Color>
                                    <small>{test.discipline}</small>
                                </p>
                            </Test>
                        ); 
                    }))
                }
                <Update test={test} />
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