import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useState} from 'react';

import Back from './Back.js';
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

export default function App() {
    const URL = 'http://localhost:5000';
    const data = localStorage.getItem("data");
    const locals = data ? JSON.parse(data) : '';
    const headers = locals ? {headers: {Authorization: `Bearer ${locals.token}`}} : '';
    const [visible, setVisible] = useState(true);

    return (
        <StorageContext.Provider value={data ? {userId: locals.userId, headers, URL} : {URL}}>
            <BrowserRouter>
                <Back visible={visible}/>
                <Routes>
                    <Route path='/' element={<Navigate replace to='sign-in' />} />
                    <Route path='/sign-up' element={<SignUp changeState={() => setVisible(false)} />} />
                    <Route path='/sign-in' element={<SignIn changeState={() => setVisible(false)} />} />
                    <Route path='/home' element={<HomePage changeState={() => setVisible(false)} />} />
                    <Route path='/user' element={<UserPage changeState={() => setVisible(true)} />} />
                    <Route path='/user/update' element={<UserUpdate />} />
                    <Route path='/user/delete' element={<UserDelete />} />
                    <Route path='/discipline' element={<DisciplinePage changeState={() => setVisible(true)} />} />
                    <Route path='/discipline/:id' element={<DisciplineById />} />
                    <Route path='/discipline/create' element={<CreateDiscipline />} />
                    <Route path='/discipline/update/:id' element={<DisciplineUpdate />} />
                </Routes>
            </BrowserRouter>
        </StorageContext.Provider>
    );
}