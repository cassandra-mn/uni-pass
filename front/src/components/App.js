import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import HomePage from './HomePage.js';
import UserPage from './UserPage.js';
import UserUpdate from './UserUpdate.js';
import UserDelete from './UserDelete.js';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/' element={<Navigate replace to='sign-in' />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/user' element={<UserPage />} />
                <Route path='/user/update' element={<UserUpdate />} />
                <Route path='/user/delete' element={<UserDelete />} />
            </Routes>
        </BrowserRouter>
    );
}