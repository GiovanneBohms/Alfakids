import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import App from "../App";

export function RouteComponent(){

    const token = localStorage.getItem("token");
      
    return(
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage />}/>
                <Route path="/" element={token !== null ? <App /> : <LoginPage />}/>
            </Routes>
        </BrowserRouter>
    )
}