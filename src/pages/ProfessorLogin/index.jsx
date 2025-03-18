import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "./index.css"
import { LoadingIcon } from "../../components/LoadingIcon"
import { useState } from "react"
import logo from "../../assets/girassolLogo.png"

export function ProfessorLogin(){

    const [isLoading, setIsLoading] = useState(false)
    const [isCredentialsIncorrect, setIsCredentialsIncorrect] = useState(false)

    const { login_professor } = useAuth()

    const navigate = useNavigate()

    function handleProfessorLogin(event){
        event.preventDefault()

        const loginForm = document.getElementById("professorLoginForm")
        const formData = new FormData(loginForm)

        const email = formData.get("email")
        const password = formData.get("password")

        try{
            setIsLoading(true)
            login_professor(email, password).then((token) => {
                if(token !== null){
                    navigate("/activities/management")
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
        <div className="professorLoginPageBody">
            <div className="mainLogoImg">
                <a href="/"><img src={logo} alt="logo" /></a>
            </div>
            <section className="professorLoginFormSection">
                <div className="professorLoginTitleDiv">
                    <h1 className="professorLoginTitleTxt">Modo Professor</h1>
                </div>
                <form id="professorLoginForm" onSubmit={(event) => handleProfessorLogin(event)}>
                    <div className="professorLoginInputContainer">
                        <label className="professorLoginInputLabel">Email:</label>
                        <input type="text" name="email" className="professorLoginInputField"/>
                    </div>
                    <div className="professorLoginInputContainer">
                        <label className="professorLoginInputLabel">Senha:</label>
                        <input type="password" name="password" className="professorLoginInputField"/>
                    </div>
                    {
                        isCredentialsIncorrect ?
                            <div className="incorrectProfessorCredentialsContainer">
                                <p>Credenciais incorretas.</p>
                            </div>
                        :
                            null
                    }
                    <div className="professorLoginBottomSideContainer">
                        <div>
                            <a href="/login">Modo Aluno</a>
                        </div>
                        {
                            isLoading ?
                                <button className="buttonProfessorLoginLoading"><LoadingIcon /></button>
                            :
                                <button className="buttonProfessorLogin" type="submit">Entrar</button>
                        }
                    </div>
                </form>
                
            </section>
        </div>
    )
}