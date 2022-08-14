import {AiOutlineRollback} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function Back({visible}) {
    const navigate = useNavigate();

    return visible ? (
        <Button onClick={() => navigate(-1)}><AiOutlineRollback /></Button>
    ) : <></>;
}

const Button = styled.button`
    top: 30px;
    left: 30px;
    width: 40px;
    height: 40px;
    font-size: 30px;
    border-radius: 10px;
    color: black;
    border: none;
    position: absolute;
    background-color: transparent;

    :hover {
        cursor: pointer;
    }
`;