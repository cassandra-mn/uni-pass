import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function UserPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={() => navigate('/user/update')}>Editar informações</Button>
            <Button onClick={() => navigate('/user/delete')}>Excluir conta</Button>
        </Container>
    );
}

const Container = styled.div`

`;

const Button = styled.button`

`;