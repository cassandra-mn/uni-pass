import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import StorageContext from '../../contexts/StorageContext.js';

export default function SignUp({changeState}) {
    const navigate = useNavigate();
    const {URL} = useContext(StorageContext);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    changeState();

    localStorage.clear();

    async function login(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${URL}/sign-in`, data);
            const serializedData = JSON.stringify(response.data);
            localStorage.setItem('data', serializedData);
            navigate('/home');
        } catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Text>
                <Flex>
                    <Number className='number'>1</Number>
                    <div>
                        <H1>Gerencie suas atividades</H1>
                        <P>E melhorore seu desempenho.</P>
                    </div>
                </Flex>
                <Flex>
                    <Number className='number'>2</Number>
                    <div>
                        <H1>Fácil interatividade</H1>
                        <P>Interface intuitiva e fácil de usar.</P>
                    </div>
                </Flex>
                <Flex>
                    <Number className='number'>3</Number>
                    <div>
                        <H1>Aproveite!</H1>
                        <P>Em breve, novas funcionalidades.</P>
                    </div>
                </Flex>
            </Text>
            <Form onSubmit={login}>
                <Input placeholder='e-mail' type='email' required value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
                <Input placeholder='senha' type='password' required value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <Button type='submit'>Entrar</Button>
                <MoreOptions onClick={() => navigate('/sign-up')}>Ainda não tem uma conta? Cadastre-se</MoreOptions>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #151515;
    
    @media (max-width: 700px) {
        justify-content: center;
    }
`;

const Text = styled.div`
    width: 40%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    position: absolute;

    @media (max-width: 700px) {
        top: 0;
        width: 80%;
        height: 40%;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
    }
`;

const Flex= styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 50px;

    :hover {
        .number {
            border: 2px solid white;
        }
    }

    @media (max-width: 700px) {
        margin-bottom: 30px;
    }
`;

const Number = styled.div`
    width: 50px;
    height: 50px;
    font-size: 25px;
    font-weight: 700;
    margin-right: 35px;
    border-radius: 50%;
    border: 2px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-osvald);

    @media (max-width: 700px) {
        width: 30px;
        height: 30px;
        font-size: 15px;
        margin-right: 15px;
    }
`;

const H1 = styled.div`
    font-style: normal;
    font-size: 40px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 10px;
    font-family: var(--font-osvald);

    @media (max-width: 700px) {
        font-size: 22px;
        line-height: 30px;
        margin-bottom: 0;
    }
`;

const P = styled.div`
    font-size: 20px;
    line-height: 25px;
    color: gray;
    font-family: var(--font-osvald);

    @media (max-width: 700px) {
        font-size: 20px;
        line-height: 20px;
    }
`;

const Form = styled.form`
    right: 0;
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #333333;

    @media (max-width: 700px) {
        bottom: 0;
        width: 100vw;
        height: 60%;
    }
`;

const Input = styled.input`
    width: 70%;
    height: 8%;
    padding: 15px;
    margin-bottom: 12px;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 6px; 
    color: #333333;
    background: #FFFFFF;
    font-family: var(--font-osvald);

    ::placeholder {
        color: #9F9F9F;
    }

    @media (max-width: 700px) {
        height: 15%;
    }
`;

const Button = styled.button`
    width: 70%;
    height: 8%;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 6px; 
    border: none;
    color: #FFFFFF;
    background: #1877F2;
    font-family: var(--font-osvald);

    :hover {
        cursor: pointer;
    }

    @media (max-width: 700px) {
        height: 11%;
    }
`;

const ButtonDisable = styled.div`
    width: 70%;
    height: 8%;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 6px; 
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    background: #1877F2;
    font-family: var(--font-osvald);
    opacity: 0.5;
    @media (max-width: 700px) {
        height: 11%;
    }
`;

const MoreOptions = styled.p`
    margin: 0 15%;
    margin-top: 22px;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
    text-decoration: underline;
    font-family: var(--font-lato);

    :hover {
        cursor: pointer;
    }
    
    @media (max-width: 700px) {
        font-size: 17px;
    }
`;