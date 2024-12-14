import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { ChatbotPage } from '../pages/ChatbotPage';

export function RoutesComponent(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path='login' element={<LoginPage />} />
                {console.log(localStorage.getItem("token"))}
                <Route path='chatbot' element={<ChatbotPage />} />
            </Routes>
        </BrowserRouter>
    )
}