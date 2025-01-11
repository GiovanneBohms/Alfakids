import { useNavigate } from "react-router-dom"
import "./index.css"
import { registerStudent } from "../../services/StudentService"
import { useState } from "react"
import { LoadingIcon } from "../../components/LoadingIcon"

export function RegisterPage(){

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    function handleFormSubmit(event){
        event.preventDefault()

        setIsLoading(true)

        const registerForm = document.getElementById("registerForm")
        const formData = new FormData(registerForm)

        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        const gender = formData.get("gender")
        const age = formData.get("age")
        const autism_level = formData.get("autism_level")
        const school_year = formData.get("school_year")

        const new_student = {name, email, password, gender, age, autism_level, school_year}

        registerStudent(new_student).then(() => {
            navigate("/login")
        }).catch((error) => {
            if(error.status == 400){
                setIsLoading(false)
                alert("Some field is missing!")
            }
        })
    }

    return(
        <div className="registerPageBody">
            <div className="registerFormContainer">
                <h1>Cadastro</h1>
                <form id="registerForm" onSubmit={(event) => handleFormSubmit(event)}>
                    <div className="formInput">
                        <label htmlFor="">Name</label>
                        <input name="name" type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Email</label>
                        <input name="email" type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Password</label>
                        <input name="password" type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Gender</label>
                        <input name="gender" type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Age</label>
                        <input name="age" type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Autism Level</label>
                        <input name="autism_level" type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">School Year</label>
                        <input name="school_year" type="text" />
                    </div>
                    <div className="optionsSection">
                        <a href="/login">Voltar para Login</a>
                    </div>
                    <div>
                        {
                            isLoading ?
                                <button className="buttonRegisterLoading"><LoadingIcon /></button>
                            :
                                <button className="buttonRegister" type="submit">Cadastrar</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}