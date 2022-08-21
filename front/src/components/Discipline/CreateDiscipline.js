import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import {gray, blue, red, green, pink} from '@radix-ui/colors';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import StorageContext from '../../contexts/StorageContext.js';

export default function CreateDiscipline() {
    const navigate = useNavigate();
    const {URL, headers} = useContext(StorageContext);
    const [discipline, setDiscipline] = useState({
        discipline: '',
        teacher: '',
        clasroom: '',
        color: ''
    });
    const theme = {
        colors: {
            ...blue,
            ...pink,
            ...green,
            ...gray,
            ...red,
        },
    };     
    const colors = [
        {background: theme.colors.pink6},
        {background: theme.colors.blue8},
        {background: theme.colors.green9},
        {background: theme.colors.gray11},
        {background: theme.colors.red11},
    ];

    async function register(e) {
        e.preventDefault();
        try {
            await axios.post(`${URL}/discipline/create`, discipline, headers);
            alert('Disciplina cadastrada!');
            navigate('/discipline');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Form onSubmit={register}>
                <Input placeholder='Nome da disciplina' type='text' required value={discipline.discipline} onChange={e => setDiscipline({...discipline, discipline: e.target.value})}/>
                <Input placeholder='Nome do(a) professor(a)' type='text' required value={discipline.teacher} onChange={e => setDiscipline({...discipline, teacher: e.target.value})}/>
                <Input placeholder='Sala de aula' type='text' required value={discipline.clasroom} onChange={e => setDiscipline({...discipline, clasroom: e.target.value})}/>
                <DialogSelect colors={colors} discipline={discipline} setDiscipline={setDiscipline} />
                <Button className='submit' type='submit'>Cadastrar Disciplina</Button>
            </Form>
        </Container>
    );
}

function DialogSelect({colors, discipline, setDiscipline}) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
  
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
  
    return (
        <>
            <Button type='button' onClick={handleClickOpen}>
                <div className='block'>
                    Selecione uma cor
                    {discipline.color ?
                        <Option background={discipline.color}></Option>
                    : ''}
                </div>
            </Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Selecione uma cor</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {colors.map((color, id) => {
                            return <Option key={id} background={color.background} 
                                onClick={() => setDiscipline({...discipline, color: color.background}) 
                                & handleClose}>{color.background === discipline.color ? 'X' : ''}
                            </Option>
                        })}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 40px;
    margin-top: 40px;

    .block {
        display: flex;
        justify-content: space-around;
    }

    .submit {
        margin-top: 50px;
        color: #FFFFFF;
        background: #1877F2;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    height: 70px;
    padding: 15px;
    margin-bottom: 12px;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 10px; 
    color: #333333;
    background: #FFFFFF;
    font-family: var(--font-osvald);

    ::placeholder {
        color: #9F9F9F;
    }
`;

const Button = styled.button`
    height: 70px;
    font-size: 27px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: transparent;
    font-family: var(--font-osvald);
`;

const Option = styled.div`
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 50%;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-osvald);
    background-color: ${props => props.background};

    :hover {
        cursor: pointer;
    }
`;