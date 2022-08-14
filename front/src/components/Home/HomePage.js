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

export default function HomePage({changeState}) {
    const navigate = useNavigate();
    changeState();
    
    return (
        <Container>
            <Title>Visão geral</Title>
            <MenuListComposition />
            <Buttons>
                <button onClick={() => navigate('/discipline')}>Disciplinas</button>
                <button onClick={() => navigate('/timetable')}>Horário</button>
                <button onClick={() => navigate('/test')}>Provas</button>
                <button onClick={() => navigate('/task')}>Tarefas</button>
                <button onClick={() => navigate('/calendar')}>Calendário</button>
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
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: var(--theme);

    .profile {
        top: 40px;
        right: 30px;
        width: 20px;
        height: 30px;
        font-size: 30px;
        color: black;
        position: absolute;
    }
`;

const Title = styled.h1`
    margin-top: 20px;
    font-size: 30px;
    font-family: var(--font-passion);
`;

const Buttons = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;

    button {
        width: 120px;
        height: 120px;
        margin: 20px;
        border-radius: 20px;
        border: 1px solid black;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    }
`;