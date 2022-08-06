import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import UserPage from './UserPage.js';
import UserUpdate from './UserUpdate.js';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/' element={<Navigate replace to='sign-in' />} />
                <Route path='/user' element={<UserPage />} />
                <Route path='/user/update' element={<UserUpdate />} />
            </Routes>
        </BrowserRouter>
    );
}