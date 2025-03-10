import { DashBoard } from "../../components/DashBoard";
import "./index.css"

export function PolicyPage(){
    return(
        <div className="studentPageBody">
            <DashBoard />
            <div className="policyContainer">
                <div className="policyTextContainer">
                    <h1>Política de Privacidade</h1>
                    <p>
                        A sua privacidade é importante para nós. É política do Alfakids respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Alfakids e outros sites que possuímos e operamos.

                        Solicitamos informações pessoais apenas quando realmente precisamos delas para fornecer um serviço de forma eficaz. Fazemos isso por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como esses dados serão utilizados.

                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, utilizamos meios comercialmente aceitáveis para protegê-los contra perdas, roubos e acessos, divulgações, cópias, usos ou modificações não autorizadas.

                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei ou para fins de pesquisa acadêmica que garantam anonimização e conformidade com normas éticas.

                        Nosso site pode conter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e as práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.

                        Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que isso pode afetar sua experiência em alguns dos serviços oferecidos.

                        O uso continuado do nosso site será considerado como aceitação de nossas práticas em relação à privacidade e ao tratamento de informações pessoais. Se tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
                    </p>
                    <h3>Compromisso do Usuário</h3>
                    <p>
                        O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Alfakids oferece no site, respeitando as seguintes diretrizes:

                        <br />A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;
                        <br />B) Não difundir propaganda ou conteúdo de natureza discriminatória, ilegal ou que viole direitos humanos;
                        <br />C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Alfakids, de seus fornecedores ou terceiros, nem introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas que possam comprometer a segurança e a integridade dos serviços.
                    </p>
                    <h3>Uso de Dados para Pesquisa Acadêmica</h3>
                    <p>
                        Nosso compromisso com a pesquisa acadêmica em inteligência artificial significa que podemos coletar e analisar dados não sensíveis para fins de aprimoramento de modelos de IA, sempre garantindo a segurança e privacidade dos dados dos usuários. Caso haja participação direta de usuários em pesquisas, serão fornecidas informações adicionais sobre consentimento e uso de dados.
                    </p>
                    <h3>Mais informações</h3>
                    <p>
                        Esperamos que esta política esclareça nossos procedimentos. Caso tenha dúvidas, sinta-se à vontade para entrar em contato.

                        Esta política é efetiva a partir de 10 de março de 2025.
                    </p>
                </div>
                
            </div>
        </div>
    )
}