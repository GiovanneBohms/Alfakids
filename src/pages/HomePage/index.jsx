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
        if (currentScroll >= aboutDivOffSet -80) {
            document.getElementById("navItem1").style.color = "var(--color-primary)"
            document.getElementById("navItem1").style.transition = "0.2s"

            document.getElementById("navItem2").style.color = "var(--color-primary)"
            document.getElementById("navItem2").style.transition = "0.2s"

            document.getElementById("navItem3").style.color = "var(--color-primary)"
            document.getElementById("navItem3").style.transition = "0.2s"

            document.getElementById("navItem4").style.color = "var(--color-primary)"
            document.getElementById("navItem4").style.transition = "0.2s"

        }
        else if(currentScroll < aboutDivOffSet -80){
            document.getElementById("navItem1").style.color = "white"
            document.getElementById("navItem2").style.color = "white"
            document.getElementById("navItem3").style.color = "white"
            document.getElementById("navItem4").style.color = "white"
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
                        <li><a id="navItem1" href="">Sobre</a></li>
                        <li><a id="navItem2" href="">Sobre</a></li>
                        <li><a id="navItem3" href="">Sobre</a></li>
                        <li><a id="navItem4" href="">Sobre</a></li>
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
                    <button onClick={() => location.href = "/login"}>Entrar</button>
                    <p>Não tem uma conta ainda? <a href="/register">Criar</a></p>
                </div>
            </div>
            
            <div className="aboutDiv">
                <div className="logosDiv">
                    <div className="logosContainer">
                       <img src={unicariocaLogo} alt="unicariocaLogo" />
                        <img src={unicariocaLogo} alt="unicariocaLogo" /> 
                    </div>
                    
                </div>
                <div className="aboutText">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aperiam repellendus expedita ut! Debitis cum, tempora aliquam ab totam, iure labore accusamus temporibus tenetur praesentium dolor id culpa laudantium inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum commodi consequuntur quasi reiciendis facilis aspernatur deserunt sint voluptatem nesciunt. Illo, tempore quis. Temporibus nulla inventore praesentium eveniet, autem exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed possimus ipsam voluptate repudiandae voluptatem? Porro ab consequuntur sunt repudiandae architecto dolor tenetur molestias doloribus rem minima? Molestias vel ipsam asperiores.</p>
                </div>
            </div>
        </div>
    )
}