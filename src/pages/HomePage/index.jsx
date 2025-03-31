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
        const elements = document.getElementsByClassName("awakeClass")
        const navItems = document.getElementsByClassName("navItem")

        if(currentScroll == null){
            for(let i = 0; i < elements.length; i++){
                if(elements[i].classList.contains("initial")){
                    document.getElementById(elements[i].id).style.animation = "awake 1s"
                    document.getElementById(elements[i].id).style.opacity = "1"
                } else{
                    document.getElementById(elements[i].id).style.opacity = "0"
                }
            }
        }

        for(let i = 0; i < elements.length; i++){
            if(currentScroll >= document.querySelector(`#${elements[i].id}`).offsetTop - 300){
                document.getElementById(elements[i].id).style.animation = "awake 1s"
                document.getElementById(elements[i].id).style.opacity = "1"
            }
        }

        if ((currentScroll >= aboutDivOffSet - 40) && (currentScroll < videoDivOffSet - 40)) {
            for(let i = 0; i < navItems.length; i++){
                document.getElementById(navItems[i].id).style.color = "black"
                document.getElementById(navItems[i].id).style.transition = "0.2s"
            }

            document.getElementById("homeHeader").style.transition = "0.2s"
            // document.getElementById("homeHeader").style.backgroundImage = "linear-gradient(to left, var(--color-primary), var(--color-pink), white)"
            document.getElementById("imgLogoNav").style.transition = "0.2s"
            document.getElementById("imgLogoNav").style.opacity = "1"
            document.getElementById("imgLogoNav").style.cursor = "pointer"
        }
        else if((currentScroll < aboutDivOffSet - 40) && (currentScroll < videoDivOffSet - 40)){
            for(let i = 0; i < navItems.length; i++){
                document.getElementById(navItems[i].id).style.color = "black"
            }
            document.getElementById("homeHeader").style.transition = "0.2s"

            document.getElementById("homeHeader").style.backgroundImage = "none"

            document.getElementById("imgLogoNav").style.opacity = "0"
            document.getElementById("imgLogoNav").style.cursor = "default"
        }
        else if((currentScroll >= videoDivOffSet - 40)){
            for(let i = 0; i < navItems.length; i++){
                document.getElementById(navItems[i].id).style.color = "black"
            }
            document.getElementById("homeHeader").style.transition = "0.2s"
            document.getElementById("homeHeader").style.backgroundImage = "none"

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
                        <li><a id="navItem1" className="navItem" onClick={() => document.getElementById("aboutDiv")?.scrollIntoView({ behavior: "smooth" })}>Sobre</a></li>
                        <li><a id="navItem2" className="navItem" onClick={() => document.getElementById("videoDiv")?.scrollIntoView({ behavior: "smooth" })}>Apresentação</a></li>
                        {/*<li><a id="navItem3" href="">Sobre</a></li> */}
                        <li><a id="navItem4" className="navItem" href="/login">Entrar</a></li>
                    </ul>
                </nav>
            </header>
            <div id="mainDiv" className="mainDiv">
                <div id="homeContainer" className="homeContainer awakeClass initial">
                    <div className="titleDiv">
                        <img src={girassolLogo} alt="mainLogo" />
                        <h1>AlfaKids</h1>
                        <p>Uma plataforma educacional que utiliza de IA para melhorar seu processo de aprendizagem.</p>
                    </div>
                </div>
                
                <div id="buttonLogInDiv" className="buttonLogInDiv awakeClass initial">
                    <button onClick={() => location.href = "/login"}>Entrar</button>
                    <p>Não tem uma conta ainda? <a href="/register">Criar</a></p>
                </div>
            </div>
            
            <div id="aboutDiv">
                <div id="logosDiv" className="logosDiv awakeClass">
                    <div className="logosContainer">
                        <div className="logoImg">
                            <img src={unicariocaLogo} alt="unicariocaLogo" />  
                        </div>
                        <div className="logoImg">
                            <img src={cnpqLogo} alt="unicariocaLogo" />
                        </div>
                    </div>
                </div>
                <div id="aboutText" className="aboutText awakeClass">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aperiam repellendus expedita ut! Debitis cum, tempora aliquam ab totam, iure labore accusamus temporibus tenetur praesentium dolor id culpa laudantium inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum commodi consequuntur quasi reiciendis facilis aspernatur deserunt sint voluptatem nesciunt. Illo, tempore quis. Temporibus nulla inventore praesentium eveniet, autem exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed possimus ipsam voluptate repudiandae voluptatem? Porro ab consequuntur sunt repudiandae architecto dolor tenetur molestias doloribus rem minima? Molestias vel ipsam asperiores.</p>
                </div>
            </div>
            <div id="videoDiv" className="awakeClass">
                <div>
                    <iframe width="960" height="615" src="https://www.youtube.com/embed/4DI4uIEQ_4M?si=FnDGLyQ-QYDTL1-V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}