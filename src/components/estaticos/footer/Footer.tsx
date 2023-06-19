import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import './Footer.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';

function Footer() {
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    );

    var footerComponent;

    if (token != "") {
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" item xs={12}>
                <Box className='box1'>
                    <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h5" align="center" gutterBottom className='textos'>Acesse nossas redes sociais. </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <a href="https://www.linkedin.com/in/planta-na-mesa-828a1b272/" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon className='redes' />
                        </a>
                        <a href="https://github.com/PI-PLANTA-NA-MESA/Planta-na-Mesa" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon className='redes1' />
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
    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;