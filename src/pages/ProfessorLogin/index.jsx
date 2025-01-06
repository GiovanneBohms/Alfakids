import "./index.css"

export function ProfessorLogin(){
    return (
        <div className="professorLoginPageBody">
            <div className="professorLoginTitleDiv">
                <h1 className="professorLoginTitleTxt">Modo Professor</h1>
            </div>
            <section className="professorLoginFormSection">
                <div className="professorLoginInputContainer">
                    <label className="professorLoginInputLabel">Email:</label>
                    <input type="text" name="email" className="professorLoginInputField" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="professorLoginInputContainer">
                    <label className="professorLoginInputLabel">Password:</label>
                    <input type="password" name="password" className="professorLoginInputField" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="professorLoginBottomSideContainer">
                    <button className="buttonProfessorLogin" onClick={async () => await HandleLogin(email, password)}>Entrar</button>
                </div>
            </section>
        </div>
    )
}