import "./index.css"
import girassolLogo from "../../assets/girassolLogo.png"
import unicariocaLogo from "../../assets/logo-unicarioca1.png"
import cnpqLogo from "../../assets/cnpqLogo.png"
import { useEffect, useState } from "react";

export function HomePage(){

    const [aboutDivOffSet, setAboutDivOffSet] = useState()
    const [videoDivOffSet, setVideoDivOffSet] = useState()
    const [currentScroll, setCurrentScroll] = useState()

    useEffect(() => {
        window.addEventListener("scroll", function () {
            setAboutDivOffSet(document.querySelector("#aboutDiv").offsetTop)
            setVideoDivOffSet(document.querySelector("#videoDiv").offsetTop)
            setCurrentScroll(this.window.scrollY)
        });
    }, [])

    useEffect(() => {
        if ((currentScroll >= aboutDivOffSet - 40) && !(currentScroll >= videoDivOffSet - 40)) {
            document.getElementById("navItem1").style.color = "black"
            document.getElementById("navItem1").style.transition = "0.2s"

            document.getElementById("navItem2").style.color = "black"
            document.getElementById("navItem2").style.transition = "0.2s"

            // document.getElementById("navItem3").style.color = "var(--color-primary)"
            // document.getElementById("navItem3").style.transition = "0.2s"

            document.getElementById("navItem4").style.color = "black"
            document.getElementById("navItem4").style.transition = "0.2s"

            document.getElementById("imgLogoNav").style.transition = "0.2s"
            document.getElementById("imgLogoNav").style.opacity = "1"
            document.getElementById("imgLogoNav").style.cursor = "pointer"
        }
        else if((currentScroll < aboutDivOffSet - 40) && !(currentScroll >= videoDivOffSet - 40)){
            document.getElementById("navItem1").style.color = "white"
            document.getElementById("navItem2").style.color = "white"
            // document.getElementById("navItem3").style.color = "white"
            document.getElementById("navItem4").style.color = "white"

            document.getElementById("imgLogoNav").style.opacity = "0"
            document.getElementById("imgLogoNav").style.cursor = "default"
        }
        else if((currentScroll >= videoDivOffSet - 40)){
            document.getElementById("navItem1").style.color = "white"
            document.getElementById("navItem2").style.color = "white"
            // document.getElementById("navItem3").style.color = "white"
            document.getElementById("navItem4").style.color = "white"

            document.getElementById("imgLogoNav").style.transition = "0.2s"
            document.getElementById("imgLogoNav").style.opacity = "1"
            document.getElementById("imgLogoNav").style.cursor = "pointer"
        }
    }, [currentScroll])
    
    return(
        <div className="homeBody">
            <header id="homeHeader">
                <nav>
                    <div>
                        <img id="imgLogoNav" onClick={() => document.getElementById("mainDiv")?.scrollIntoView({ behavior: "smooth" })} src={girassolLogo} alt="girassolLogo" />
                    </div>
                    <ul>
                        <li><a id="navItem1" onClick={() => document.getElementById("aboutDiv")?.scrollIntoView({ behavior: "smooth" })}>Sobre</a></li>
                        <li><a id="navItem2" onClick={() => document.getElementById("videoDiv")?.scrollIntoView({ behavior: "smooth" })}>Apresentação</a></li>
                        {/*<li><a id="navItem3" href="">Sobre</a></li> */}
                        <li><a id="navItem4" href="/login">Entrar</a></li>
                    </ul>
                </nav>
            </header>
            <div id="mainDiv" className="mainDiv">
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
            
            <div id="aboutDiv">
                <div className="logosDiv">
                    <div className="logosContainer">
                        <img src={unicariocaLogo} alt="unicariocaLogo" />
                        <img src={cnpqLogo} alt="unicariocaLogo" />
                    </div>
                </div>
                <div className="aboutText">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aperiam repellendus expedita ut! Debitis cum, tempora aliquam ab totam, iure labore accusamus temporibus tenetur praesentium dolor id culpa laudantium inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum commodi consequuntur quasi reiciendis facilis aspernatur deserunt sint voluptatem nesciunt. Illo, tempore quis. Temporibus nulla inventore praesentium eveniet, autem exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed possimus ipsam voluptate repudiandae voluptatem? Porro ab consequuntur sunt repudiandae architecto dolor tenetur molestias doloribus rem minima? Molestias vel ipsam asperiores.</p>
                </div>
            </div>
            <div id="videoDiv">
                <div>
                    <iframe width="960" height="615" src="https://www.youtube.com/embed/4DI4uIEQ_4M?si=FnDGLyQ-QYDTL1-V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}