import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={() => navigate('/user')}>Perfil</Button>
            <Button onClick={() => navigate('/discipline')}>Disciplinas</Button>
        </Container>
    );
}

const Container = styled.div`

`;

const Button = styled.button`

`;