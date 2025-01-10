import { useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import { LoadingIcon } from "../../components/LoadingIcon"
import { useAuth } from "../../hooks/useAuth"

export function LoginPage(){

    const { login } = useAuth()
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)

    //const authentication = useContext(AuthContext);

    const navigate = useNavigate()

    function HandleLogin(email, password){
        try{
            setIsLoading(true)
            login(email, password).then((token) => {
                if(token !== null){
                    navigate("/chatbot")
                    location.reload()
                }
                else{
                    console.log("Ocorreu um erro")
                }
            }).catch((error) => {
                setIsLoading(false)
                console.log(error.message)
            })
        } catch(error){
            setIsLoading(false)
            console.log(error.message)
        }
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
                        <input type="text" name="email" required className="inputField" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="InputContainer">
                        <label className="inputLabel">Password:</label>
                        <input type="password" name="password" required className="inputField" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </form>
                <div className="bottomSideContainer">
                    <a href="#" className="forgotPasswordLink">Esqueci a senha</a>
                    {
                        isLoading ?
                            <button className="buttonLoginLoading"><LoadingIcon /></button>
                        :
                            <button className="buttonLogin" onClick={() => HandleLogin(email, password)}>Entrar</button>
                    }
                    <a href="/register" className="registerLink">Cadastrar</a>
                </div>
            </section>
            <div>
                <button onClick={() => navigate("/login/professor")}>Modo Professor</button>
            </div>
        </div>
    )
}