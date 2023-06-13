import { Box } from "@material-ui/core";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

function Sobre(){
        return(
        <>
                        <Box display="flex" alignItems="center" justifyContent="center">
                        <a href="https://www.linkedin.com/in/planta-na-mesa-828a1b272/" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon className='redes' />
                        </a>
                        <a href="https://github.com/PI-PLANTA-NA-MESA/Planta-na-Mesa" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon className='redes1' />
                        </a>
                        <a href="https://github.com/AzvalSG" target="_blank" rel="noopener noreferrer">
                            <img src="https://avatars.githubusercontent.com/u/127205710?v=4" alt="Link para o github do Giovanni" className='criador' />
                        </a>
                        <a href="https://github.com/Yasmin-CCS" target="_blank" rel="noopener noreferrer">
                            <img src="https://avatars.githubusercontent.com/u/127205957?v=4" alt="Link para o github da Yasmin" className='criador' />
                        </a>
                        <a href="https://github.com/MarianeAnjos" target="_blank" rel="noopener noreferrer">
                            <img src="https://avatars.githubusercontent.com/u/100323487?v=4" alt="Link para o github da Mariane" className='criador' />
                        </a>
                        <a href="https://github.com/beatrizangelita" target="_blank" rel="noopener noreferrer">
                            <img src="https://avatars.githubusercontent.com/u/43155603?v=4" alt="Link para o github da Beatriz" className='criador' />
                        </a>
                        <a href="https://github.com/WilliamReisO" target="_blank" rel="noopener noreferrer">
                            <img src="https://avatars.githubusercontent.com/u/123428616?v=4" alt="Link para o github do William" className='criador' />
                        </a>
                        <a href="https://github.com/Juliana-placido" target="_blank" rel="noopener noreferrer">
                            <img src="https://avatars.githubusercontent.com/u/108702650?v=4" alt="Link para o github da Juliana" className='criador' />
                        </a>
                    </Box>
                </>
        )
}
export default Sobre;
