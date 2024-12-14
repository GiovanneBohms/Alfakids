import { useState } from "react"
import "./index.css"
import { Login } from "../../services/AuthService"
import { useNavigate } from "react-router-dom"

export function LoginPage(){
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    async function HandleLogin(email, password){
        await Login(email, password)
        navigate("/chatbot")
    }
    
    return (
        <div className="loginPageBody">
            <div className="loginTitleDiv">
                <h1 className="loginTitleTxt">Login</h1>
            </div>
            <section className="loginFormSection">
                <form className="formSection">
                    <div className="InputContainer">
                        <label className="inputLabel">Email:</label>
                        <input type="text" name="email" className="inputField" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="InputContainer">
                        <label className="inputLabel">Password:</label>
                        <input type="password" name="password" className="inputField" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </form>
                <div className="bottomSideContainer">
                    <a href="#" className="forgotPasswordLink">Esqueci a senha</a>
                    <button className="buttonLogin" onClick={async () => await HandleLogin(email, password)}>Entrar</button>
                    <a href="#" className="registerLink">Cadastrar</a>
                </div>
            </section>
        </div>
    )
}