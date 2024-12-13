import { useEffect, useState } from "react";

export function LoginPage(){

    const [email, setEmail] = useState("");

    useEffect(() => {
        console.log("Mudou!")
    }, [])

    return(
        <div>
            <h1>Login</h1>
            <input type="text" onChange={(element) => setEmail(element.target.value)} />
        </div>
    )
}