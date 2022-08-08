import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import SignUp from './Auth/SignUp.js';
import SignIn from './Auth/SignIn.js';
import HomePage from './Home/HomePage.js';
import UserPage from './User/UserPage.js';
import UserUpdate from './User/UserUpdate.js';
import UserDelete from './User/UserDelete.js';
import DisciplinePage from './Discipline/DisciplinePage.js';
import CreateDiscipline from './Discipline/CreateDiscipline.js';
import StorageContext from '../contexts/StorageContext.js';

export default function App() {
    const data = localStorage.getItem("data");
    const {userId, token} = JSON.parse(data);
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    const URL = 'http://localhost:5000';

    return (
        <StorageContext.Provider value={{userId, token, headers, URL}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/' element={<Navigate replace to='sign-in' />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/user' element={<UserPage />} />
                    <Route path='/user/update' element={<UserUpdate />} />
                    <Route path='/user/delete' element={<UserDelete />} />
                    <Route path='/discipline' element={<DisciplinePage />} />
                    <Route path='/discipline/create' element={<CreateDiscipline />} />
                </Routes>
            </BrowserRouter>
        </StorageContext.Provider>
    );
}