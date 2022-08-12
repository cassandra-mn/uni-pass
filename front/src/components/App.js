import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useState} from 'react';

import Back from './Button/Back.js';
import SignUp from './Auth/SignUp.js';
import SignIn from './Auth/SignIn.js';
import HomePage from './Home/HomePage.js';
import UserPage from './User/UserPage.js';
import UserUpdate from './User/UserUpdate.js';
import UserDelete from './User/UserDelete.js';
import DisciplinePage from './Discipline/DisciplinePage.js';
import DisciplineById from './Discipline/DisciplineById.js';
import CreateDiscipline from './Discipline/CreateDiscipline.js';
import DisciplineUpdate from './Discipline/DisciplineUpdate.js';
import StorageContext from '../contexts/StorageContext.js';
import TestPage from './Test/TestPage.js';
import CreateTest from './Test/CreateTest.js';
import TaskPage from './Task/TaskPage.js';

export default function App() {
    const URL = 'http://localhost:5000';
    const data = localStorage.getItem("data");
    const locals = data ? JSON.parse(data) : '';
    const headers = locals ? {headers: {Authorization: `Bearer ${locals.token}`}} : '';
    const [visible, setVisible] = useState(true);
    const changeStateVisible = () => setVisible(true);
    const changeStateNotVisible = () => setVisible(false);

    return (
        <StorageContext.Provider value={data ? {userId: locals.userId, headers, URL} : {URL}}>
            <BrowserRouter>
                <Back visible={visible}/>
                <Routes>
                    <Route path='/' element={<Navigate replace to='sign-in' />} />
                    <Route path='/sign-up' element={<SignUp changeState={changeStateNotVisible} />} />
                    <Route path='/sign-in' element={<SignIn changeState={changeStateNotVisible} />} />
                    <Route path='/home' element={<HomePage changeState={changeStateNotVisible} />} />
                    <Route path='/user' element={<UserPage changeState={changeStateVisible} />} />
                    <Route path='/user/update' element={<UserUpdate />} />
                    <Route path='/user/delete' element={<UserDelete />} />
                    <Route path='/discipline' element={<DisciplinePage changeState={changeStateVisible} />} />
                    <Route path='/discipline/:id' element={<DisciplineById />} />
                    <Route path='/discipline/create' element={<CreateDiscipline />} />
                    <Route path='/discipline/update/:id' element={<DisciplineUpdate />} />
                    <Route path='/test' element={<TestPage changeState={changeStateVisible} />} />
                    <Route path='/test/create' element={<CreateTest />} />
                    <Route path='/task' element={<TaskPage changeState={changeStateVisible} />} />
                </Routes>
            </BrowserRouter>
        </StorageContext.Provider>
    );
}