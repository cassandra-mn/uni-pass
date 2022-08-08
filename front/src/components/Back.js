import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function Back({visible}) {
    const navigate = useNavigate();

    return visible ? (
        <Button onClick={() => navigate(-1)}>Voltar</Button>
    ) : <></>;
}

const Button = styled.button`

`;