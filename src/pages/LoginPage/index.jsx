import { useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import { LoadingIcon } from "../../components/LoadingIcon"
import { useAuth } from "../../hooks/useAuth"


export function LoginPage(){

    const { login_student } = useAuth()

    const [isLoading, setIsLoading] = useState(false)

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
                <form id="loginForm" className="formSection" onSubmit={(event) => handleLogin(event)}>
                    <div className="InputContainer">
                        <label className="inputLabel">Email:</label>
                        <input type="text" name="email" required className="inputField"/>
                    </div>
                    <div className="InputContainer">
                        <label className="inputLabel">Password:</label>
                        <input type="password" name="password" required className="inputField"/>
                    </div>
                    <div className="bottomSideContainer">
                        <a href="#" className="forgotPasswordLink">Esqueci a senha</a>
                        {
                            isLoading ?
                                <button className="buttonLoginLoading"><LoadingIcon /></button>
                            :
                                <button className="buttonLogin" type="submit">Entrar</button>
                        }
                        <a href="/register" className="registerLink">Cadastrar</a>
                    </div>
                </form>
            </section>
            <div>
                <a className="professorModeLink" href="/login/professor">Modo Professor</a>
            </div>
        </div>
    )
}