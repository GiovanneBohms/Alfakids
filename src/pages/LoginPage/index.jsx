import { useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import { LoadingIcon } from "../../components/LoadingIcon"
import { useAuth } from "../../hooks/useAuth"
import logo from "../../assets/girassolLogo.png"


export function LoginPage(){

    const { login_student } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [isCredentialsIncorrect, setIsCredentialsIncorrect] = useState(false)

    //const authentication = useContext(AuthContext);

    const navigate = useNavigate()

    function handleLogin(event){
        event.preventDefault()

        const loginForm = document.getElementById("loginForm")
        const formData = new FormData(loginForm)

        const email = formData.get("email")
        const password = formData.get("password")

        try{
            setIsLoading(true)
            login_student(email, password).then((token) => {
                if(token !== null){
                    navigate("/chatbot")
                    location.reload()
                }
                else{
                    console.log("Ocorreu um erro")
                }
            }).catch((error) => {
                setIsLoading(false)

                if(error.status == 401){
                    setIsCredentialsIncorrect(true)
                }
            })
        } catch(error){
            setIsLoading(false)
            console.log(error.message)
        }
    }
    
    return (
        <div className="loginPageBody">
            <div className="mainLogoImg">
                <a href="/"><img src={logo} alt="logo" /></a>
            </div>
            <section className="loginFormSection">
                <div className="loginTitleDiv">
                    <h1 className="loginTitleTxt">Login</h1>
                </div>
                <form id="loginForm" className="formSection" onSubmit={(event) => handleLogin(event)}>
                    <div className="InputContainer">
                        <label className="inputLabel">Email:</label>
                        <input type="text" name="email" required className="inputField"/>
                    </div>
                    <div className="InputContainer">
                        <label className="inputLabel">Senha:</label>
                        <input type="password" name="password" required className="inputField"/>
                    </div>
                    {
                        isCredentialsIncorrect ?
                            <div className="incorrectCredentialsContainer">
                                <p>Credenciais incorretas.</p>
                            </div>
                        :
                            null
                    }
                    <div className="linkSection">
                        <a href="/forgotPassword" className="forgotPasswordLink">Esqueci a senha</a>
                        <a href="/register" className="registerLink">Cadastrar</a>
                    </div>
                    <div className="bottomSideContainer">
                        {
                            isLoading ?
                                <button className="buttonLoginLoading"><LoadingIcon /></button>
                            :
                                <button className="buttonLogin" type="submit">Entrar</button>
                        }
                        <div className="professorModeLinkContainer">
                            <a className="professorModeLink" href="/login/professor">Modo Professor</a>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}