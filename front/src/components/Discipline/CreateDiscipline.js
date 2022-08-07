import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

const URL = 'http://localhost:5000';

export default function CreateDiscipline() {
    const navigate = useNavigate();
    const data = localStorage.getItem("data");
    const {token} = JSON.parse(data);
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    const [discipline, setDiscipline] = useState({
        discipline: '',
        teacher: '',
        clasroom: '',
        color: ''
    });
    const colors = [
        {name: '', background: '', display: 'Selecione uma cor'},
        {name: 'blue', background: 'blue'},
        {name: 'pink', background: 'pink'},
        {name: 'green', background: 'green'},
        {name: 'gray', background: 'gray'},
        {name: 'black', background: 'black'},
        {name: 'wihite', background: 'wihite'},
    ];

    async function register(e) {
        e.preventDefault();
        try {
            await axios.post(`${URL}/discipline/create`, discipline, headers);
            alert('Disciplina cadastrada!');
            navigate('/discipline');
        } catch(e) {
            console.log(e.response);
            alert('Não foi possível cadastrar a disciplina, tente novamente mais tarde!');
        }
    }

    return (
        <Container>
            <Form onSubmit={register}>
                <Input placeholder='Nome da disciplina' type='text' required value={discipline.discipline} onChange={e => setDiscipline({...discipline, discipline: e.target.value})}/>
                <Input placeholder='Nome do(a) professor(a)' type='text' required value={discipline.teacher} onChange={e => setDiscipline({...discipline, teacher: e.target.value})}/>
                <Input placeholder='Sala de aula' type='text' required value={discipline.clasroom} onChange={e => setDiscipline({...discipline, clasroom: e.target.value})}/>
                <Select required value={discipline.color} onChange={e => setDiscipline({...discipline, color: e.target.value})}>
                    {colors.map(color => {
                        return <Option value={color.name} background={color.background}>{color.display ? color.display : ''}</Option>
                    })} 
                </Select>
                <Button type='submit'>Cadastrar Disciplina</Button>
            </Form>
        </Container>
    );
}

const Container = styled.div`

`;

const Form = styled.form`

`;

const Input = styled.input`

`;

const Select = styled.select`



`;

const Option = styled.option`
    background-color: ${props => props.background};
`;

const Button = styled.button`

`;