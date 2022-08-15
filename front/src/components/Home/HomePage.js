import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {BsList} from 'react-icons/bs';
import * as React from 'react';
import {Button} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import {VscMortarBoard} from 'react-icons/vsc';
import {VscCalendar} from 'react-icons/vsc';
import {VscChecklist} from 'react-icons/vsc';
import {VscFiles} from 'react-icons/vsc';
import {BiTime} from 'react-icons/bi';

export default function HomePage({changeState}) {
    const navigate = useNavigate();
    changeState();
    
    return (
        <Container>
            <Title>Visão geral</Title>
            <MenuListComposition />
            <Buttons>
                <div onClick={() => navigate('/discipline')}>
                    <small><VscMortarBoard className='icons' /></small>
                    Disciplinas
                </div>
                <div onClick={() => navigate('/timetable')}>
                    <small><BiTime className='icons' /></small>
                    Horário
                </div>
                <div onClick={() => navigate('/test')}>
                    <small><VscFiles className='icons' /></small>
                    Provas
                </div>
                <div onClick={() => navigate('/task')}>
                    <small><VscChecklist className='icons' /></small>
                    Tarefas
                </div>
                <div onClick={() => navigate('/calendar')}>
                    <small><VscCalendar className='icons' /></small>
                    Calendário
                </div>
            </Buttons>
        </Container>
    );
}

function MenuListComposition() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const navigate = useNavigate();
  
    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };
  
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
      }
    }

    function logout() {
        const confirm = window.confirm('Tem certeza que deseja sair?');
        if (confirm) {
            localStorage.clear();
            navigate('/');
        }
    }
  
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) anchorRef.current.focus();
        prevOpen.current = open;
    }, [open]);
  
    return (
        <Stack direction="row" spacing={2}>
            <div>
                <Button
                    ref={anchorRef}
                    className='profile'
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <BsList />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                            >
                                <MenuItem onClick={() => navigate('/user/update')}>Editar perfil</MenuItem>
                                <MenuItem onClick={logout}>Sair</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
                </Popper>
            </div>
        </Stack>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    background-color: var(--theme);
    font-family: var(--font-osvald);

    .profile {
        top: 40px;
        right: 30px;
        width: 20px;
        height: 30px;
        font-size: 30px;
        color: black;
        position: absolute;
    }

    .icons {
        font-size: 50px;
        margin-bottom: 10px;
    }
`;

const Title = styled.h1`
    margin-top: 20px;
    font-size: 30px;
    position: absolute;
    font-family: var(--font-passion);
`;

const Buttons = styled.div`
    width: 100vw;
    height: 50%;
    margin: 60px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    div {
        width: 120px;
        height: 120px;
        margin: 10px;
        margin-top: 20px;
        font-size: 20px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #313131;
        border: 1px solid #313131;
        background-color: transparent;

        small {
            width: 70px;
            height: 70px;
            font-size: 12px;
            margin-bottom: 5px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            //background-color: var(--color-blue);
        }

        :hover {
            cursor: pointer;
            opacity: 0.5;
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
`;