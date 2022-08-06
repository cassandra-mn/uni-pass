import {BrowserRouter, Routes, Route} from 'react-router-dom';

import SignUp from './SignUp.js';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/sign-up' element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}