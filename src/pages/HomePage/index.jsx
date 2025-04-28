import "./index.css"
import girassolLogo from "../../assets/alfakidsLogoFinal.png"
import correcaogerada from "../../assets/correcaogerada.png"
import correcao from "../../assets/correcao.png"
import assistente from "../../assets/assistente.png"
import assistenteVazio from "../../assets/assistenteVazio.png"
import planodeaula from "../../assets/planodeaula.png"
import planogerado from "../../assets/planogerado.png"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export function HomePage(){

    const [aboutDivOffSet, setAboutDivOffSet] = useState()
    const [creditDivOffSet, setcreditDivOffSet] = useState()
    const [currentScroll, setCurrentScroll] = useState()

    useEffect(() => {
        window.addEventListener("scroll", function () {
            setAboutDivOffSet(document.querySelector("#aboutDiv").offsetTop)
            setcreditDivOffSet(document.querySelector("#creditDiv").offsetTop)
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

        if ((currentScroll >= aboutDivOffSet - 40) && (currentScroll < creditDivOffSet - 40)) {
            for(let i = 0; i < navItems.length; i++){
                document.getElementById(navItems[i].id).style.color = "black"
                document.getElementById(navItems[i].id).style.transition = "0.2s"
            }

            document.getElementById("homeHeader").style.transition = "0.2s"
            document.getElementById("imgLogoNav").style.transition = "0.2s"
            document.getElementById("imgLogoNav").style.opacity = "1"
            document.getElementById("imgLogoNav").style.cursor = "pointer"
        }
        else if((currentScroll < aboutDivOffSet - 40) && (currentScroll < creditDivOffSet - 40)){
            for(let i = 0; i < navItems.length; i++){
                document.getElementById(navItems[i].id).style.color = "white"
            }
            document.getElementById("homeHeader").style.transition = "0.2s"

            document.getElementById("homeHeader").style.backgroundImage = "none"

            document.getElementById("imgLogoNav").style.opacity = "0"
            document.getElementById("imgLogoNav").style.cursor = "default"
        }
        else if((currentScroll >= creditDivOffSet - 40)){
            for(let i = 0; i < navItems.length; i++){
                document.getElementById(navItems[i].id).style.color = "white"
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
                        <li><a id="navItem1" className="navItem" onClick={() => document.getElementById("mainDiv")?.scrollIntoView({ behavior: "smooth" })}>Início</a></li>
                        <li><a id="navItem2" className="navItem" onClick={() => document.getElementById("aboutDiv")?.scrollIntoView({ behavior: "smooth" })}>Sobre</a></li>
                        <li><a id="navItem3" className="navItem" onClick={() => document.getElementById("creditDiv")?.scrollIntoView({ behavior: "smooth" })}>Quem somos</a></li>
                        <li><a id="navItem4" className="navItem" href="/login">Entrar</a></li>
                    </ul>
                </nav>
            </header>
            <div id="mainDiv" className="mainDiv">
                <div id="homeContainer" className="homeContainer awakeClass initial">
                    <div className="titleDiv">
                        <img src={girassolLogo} alt="mainLogo" />
                        <h1>Alfa</h1>
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
                    <div id="aboutText" className="aboutText awakeClass">
                        <Swiper
                            spaceBetween={100}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                            className="slider"
                            modules={[Autoplay]}
                            loop={true}
                            autoplay={{delay:5000, pauseOnMouseEnter:true}}
                        >
                            <SwiperSlide className="sliderItem">
                                <div className="sliderItemContentContainer">
                                    <div className="sliderImgContainer">
                                        <img src={correcao} alt="" />
                                        <img src={correcaogerada} alt="" />
                                    </div>
                                    <div className="sliderTextContainer">
                                        <p>Alunos e professores podem gerar correções feitas por inteligência artificial para as respostas dadas às questões de cada atividade, fazendo com que você consiga ver seus resultados logo após responder à uma atividade.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="sliderItem">
                                <div className="sliderItemContentContainer">
                                    <div className="sliderImgContainer">
                                        <img src={planodeaula} alt="" />
                                        <img src={planogerado} alt="" />
                                    </div>
                                    <div className="sliderTextContainer">
                                        <p>Para você que é professor, nossa plataforma oferece um meio de gerar seus planos de aula automaticamente com a inteligência artificial, a qual analisa as principais dificuldades de cada aluno baseados em suas respostas às atividades propostas</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="sliderItem">
                                <div className="sliderItemContentContainer">
                                    <div className="sliderImgContainer">
                                        <img src={assistenteVazio} alt="" />
                                        <img src={assistente} alt="" />
                                    </div>
                                    <div className="sliderTextContainer">
                                        <p>Converse com seu assistente virtual! Tire dúvidas, pergunte sobre assuntos diversos e muito mais com o Copilot, uma inteligência artificial feita para te ajudar com sua vida acadêmica.</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <div id="creditDiv" className="awakeClass">
                <Swiper
                    spaceBetween={100}
                    slidesPerView={1}
                    pagination={{clickable: true}}
                    className="slider"
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{delay:5000, pauseOnMouseEnter:true}}
                >
                    <SwiperSlide className="sliderItem">
                        <div className="sliderItemContentContainer">
                            <div className="creditImg">
                                <img src={girassolLogo} alt="" />
                            </div>
                            <div className="sliderTextContainer">
                                <p>Felipe Martins de Medeiros: <br/> Desenvolvedor</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="sliderItem">
                        <div className="sliderItemContentContainer">
                            <div className="creditImg">
                                <img src={girassolLogo} alt="" />
                            </div>
                            <div className="sliderTextContainer">
                                <p>Anderson da Silva Nogueira Júnior: <br/> Desenvolvedor</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="sliderItem">
                        <div className="sliderItemContentContainer">
                            <div className="creditImg">
                                <img src={girassolLogo} alt="" />
                            </div>
                            <div className="sliderTextContainer">
                                <p>Joice Pereira Conceição Costa: <br/> Idealizadora do projeto</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <footer className="homeFooter">
                <p>Direitos reservados para o Centro Universitário Carioca</p>
            </footer>
        </div>
    )
}