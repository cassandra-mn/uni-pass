import styled from 'styled-components';
import {TailSpin} from 'react-loader-spinner';

export default function Loading() {
    return (
        <Container>
            <TailSpin color='#333333'/>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;