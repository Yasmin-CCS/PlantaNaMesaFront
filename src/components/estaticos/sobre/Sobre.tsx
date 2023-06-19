import { Box } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { Grid } from '@mui/material'


function Sobre() {
    return (
        <>
            <Grid>
                <h1> Planta na Mesa </h1>
                <Box>
                    <p> Nós somos uma plataforma online dedicada a promover a alimentação sustentável e a inclusão social por meio das PANCs.
                        Sabemos que a fome e a agricultura sustentável são desafios urgentes que afetam comunidades ao redor do mundo, e estamos comprometidos em contribuir para a solução desses problemas.</p>
                    <p> Nosso objetivo principal é fornecer um espaço onde pequenos produtores e comunidades indígenas, quilombolas e outras possam expor e vender suas PANCs e ervas medicinais.
                        Reconhecemos o valor dessas plantas não convencionais, tanto em termos nutricionais quanto culturais, e queremos ajudar a preservar esse conhecimento tradicional ao mesmo tempo em que oferecemos oportunidades de renda para essas comunidades. </p>
                </Box>
                <Box>
                    <img src="https://blog.livup.com.br/wp-content/uploads/2022/02/planta-peixinho-principal-1160x653.jpg" alt="Planta peixinho" />
                    <p>
                        No Brasil, a maioria da nossa alimentação é baseada em apenas 20 espécies de plantas. Porém, existe um grupo de alimentos não convencionais chamados de PANCs, que são pouco explorados.
                    </p>
                </Box>
                <Box>
                    <img src="https://media.discordapp.net/attachments/1094735797179129998/1120346382394474637/planta.png" alt="Logo do planta na mesa" />
                    <p>
                        Pensando nisso, criamos o Planta na Mesa,
                        um e-commerce que conecta pequenas comunidades produtoras de PANCs ao resto da população.
                        Nosso objetivo é gerar renda para essas comunidades, diversificar a oferta de alimentos e estimular a agricultura sustentável.
                    </p>
                </Box>
                <Box>
                    <img src="https://mude1habito.unimedrio.com.br/wp-content/uploads/2021/11/pancs-noticia3.png" alt="Variedade  de Pancs" />
                    <p>
                        No Planta na Mesa, você encontrará uma variedade de PANCs, principalmente produzidas por comunidades quilombolas e indígenas.
                        Essa iniciativa foi idealizada para contribuir com o Objetivo de Desenvolvimento Sustentável 2.3 - Fome Zero e Agricultura Sustentável.
                    </p>
                </Box>
                <Box>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNRKKIp9L2FOiNRZ4JSlzbnvjo-Dacz1Tx8HIWor5WipGYhEVQKAop7tPRywucG42LBS8&usqp=CAU" alt="Pão sabor lavanda" />
                    <p>
                    Estamos comprometidos em promover uma alimentação mais diversa, sustentável e inclusiva. Convidamos você a explorar nossa plataforma, descobrir novos sabores e apoiar as comunidades produtoras de PANCs. Juntos, podemos fazer a diferença para a segurança alimentar e o desenvolvimento sustentável.
                    </p>
                </Box>

            </Grid>
            <footer>
                <a href="https://www.linkedin.com/in/planta-na-mesa-828a1b272/" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon className='redes' />
                </a>
                <a href="https://github.com/PI-PLANTA-NA-MESA/Planta-na-Mesa" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon className='redes1' />
                </a>

            </footer>
        </>
    )
}
export default Sobre;