import "./index.css"
import girassolLogo from "../../assets/girassolLogo.png"
import unicariocaLogo from "../../assets/logo-unicarioca1.png"
import { useEffect, useState } from "react";

export function HomePage(){

    const [aboutDivOffSet, setAboutDivOffSet] = useState()
    const [currentScroll, setCurrentScroll] = useState()

    useEffect(() => {
        window.addEventListener("scroll", function () {
            setAboutDivOffSet(document.querySelector(".aboutDiv").offsetTop)
            setCurrentScroll(this.window.scrollY)
        });
    }, [])

    useEffect(() => {
        console.log("Div Off Set: ", aboutDivOffSet)
        console.log("Current: ", currentScroll)
        if (currentScroll >= aboutDivOffSet) {
            document.getElementById("homeHeader").style.backgroundColor = "black";
            document.getElementById("homeHeader").style.transition = "0.2s";
        }
        else if(currentScroll < aboutDivOffSet){
            document.getElementById("homeHeader").style.backgroundColor = "transparent";
            document.getElementById("homeHeader").style.transition = "0.2s";
        }
    }, [currentScroll])
    

    return(
        <div className="homeBody">
            <header id="homeHeader">
                <nav>
                    <div>
                        <img src={girassolLogo} alt="girassolLogo" />
                    </div>
                    <ul>
                        <li><a href="">Sobre</a></li>
                        <li><a href="">Sobre</a></li>
                        <li><a href="">Sobre</a></li>
                        <li><a href="">Sobre</a></li>
                    </ul>
                </nav>
            </header>
            <div className="mainDiv">
                <div className="homeContainer">
                    <div className="titleDiv">
                        <img src={girassolLogo} alt="mainLogo" />
                        <h1>AlfaKids</h1>
                        <p>Uma plataforma educacional que utiliza de IA para melhorar seu processo de aprendizagem.</p>
                    </div>
                </div>
                
                <div className="buttonLogInDiv">
                    <button>Entrar</button>
                    <p>Não tem uma conta ainda? <a href="/register">Criar</a></p>
                </div>
            </div>
            
            <div className="aboutDiv">
                <img src={unicariocaLogo} alt="unicariocaLogo" />
            </div>
        </div>
    )
}