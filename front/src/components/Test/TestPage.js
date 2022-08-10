import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function TestPage({changeState}) {
    const navigate = useNavigate();
    changeState();
    
    return (
        <Container>
            <Button onClick={() => navigate('/test/create')}>Adicionar prova</Button>
        </Container>
    );
}

const Container = styled.div`

`;

const Button = styled.button`

`;