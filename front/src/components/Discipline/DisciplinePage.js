import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={() => navigate('/discipline/create')}>Adicionar Disciplina</Button>
        </Container>
    );
}

const Container = styled.div`

`;

const Button = styled.button`

`;