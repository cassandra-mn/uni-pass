import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner';
import styled from 'styled-components';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import StorageContext from '../../contexts/StorageContext.js';

export default function SignUp({changeState}) {
    const navigate = useNavigate();
    const {URL} = useContext(StorageContext);
    const [disable, setDisable] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    });
    changeState();

    async function register(e) {
        e.preventDefault();
        setDisable(true);
        try {
            await axios.post(`${URL}/sign-up`, data);
            navigate('/sign-in');
        } catch(e) {
            setDisable(false);
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <Form onSubmit={register}>
                <Text>UniPass</Text>
                <Input placeholder='nome' type='text' required value={data.name} onChange={e => setData({...data, name: e.target.value})}/>
                <Input placeholder='e-mail' type='email' required value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
                <OutlinedInput
                    required
                    placeholder='senha'
                    className='password'
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    onChange={e => setData({...data, password: e.target.value})}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                {disable ?
                    <ButtonDisable>
                        <ThreeDots color='#FFFFFF' height={13} width={51}/>
                    </ButtonDisable>
                    : <Button type='submit'>Cadastrar</Button>
                }
                <MoreOptions onClick={() => navigate('/sign-in')}>Já tem uma conta? Entre</MoreOptions>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #151515;

    .password {
        width: 60%;
        height: 10%;
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
    }
`;

const Text = styled.h1`
    font-size: 70px;
    margin-bottom: 30px;
    color: #FFFFFF;
    font-family: var(--font-passion);
`;

const Form = styled.form`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #333333;
`;

const Input = styled.input`
    width: 60%;
    height: 10%;
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
`;

const Button = styled.button`
    width: 60%;
    height: 10%;
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
`;

const ButtonDisable = styled.div`
    width: 60%;
    height: 10%;
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