import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function UserPage({changeState}) {
    const navigate = useNavigate();
    changeState();
    
    function logout() {
        const confirm = window.confirm('Tem certeza que deseja sair?');
        if (confirm) {
            localStorage.clear();
            navigate('/');
        }
    }

    return (
        <Container>
            <Button onClick={() => navigate('/user/update')}>Editar informações</Button>
            <Button onClick={() => navigate('/user/delete')}>Excluir conta</Button>
            <Button onClick={logout}>Sair</Button>
        </Container>
    );
}

const Container = styled.div`

`;

const Button = styled.button`

`;