import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function HomePage({changeState}) {
    const navigate = useNavigate();
    changeState();
    
    return (
        <Container>
            <Button onClick={() => navigate('/user')}>Perfil</Button>
            <Button onClick={() => navigate('/discipline')}>Disciplinas</Button>
            <Button onClick={() => navigate('/test')}>Provas</Button>
        </Container>
    );
}

const Container = styled.div`

`;

const Button = styled.button`

`;