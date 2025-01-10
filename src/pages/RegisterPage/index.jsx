import "./index.css"

export function RegisterPage(){
    return(
        <div className="registerPageBody">
            <div className="registerFormContainer">
                <form>
                    <div className="formInput">
                        <label htmlFor="">Name</label>
                        <input type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Email</label>
                        <input type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Password</label>
                        <input type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Gender</label>
                        <input type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">Autism Level</label>
                        <input type="text" />
                    </div>
                    <div className="formInput">
                        <label htmlFor="">School Year</label>
                        <input type="text" />
                    </div>
                    <div>
                        <button>Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}