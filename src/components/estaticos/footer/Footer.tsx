import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import './Footer.css'

function Footer() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={12}>
                    <Box className='box1'>
                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5" align="center" gutterBottom className='textos'>Siga-nos nas redes sociais. </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center">

                            <a href="https://www.linkedin.com/in/planta-na-mesa-828a1b272/" target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon className='redes'/>
                            </a>
                            <a href="https://github.com/PI-PLANTA-NA-MESA/Planta-na-Mesa" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon className='redes1'/>
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
                    </Box>
                    <Box className='box2'>
                        <Box paddingTop={1}>
                            <Typography variant="subtitle2" align="center" gutterBottom className='textos' >© 2023 Copyright : Planta na Mesa v0.1</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer;