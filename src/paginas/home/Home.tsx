import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css';
import TabProduto from '../../components/produto/tabproduto/TabProduto';

function Home() {
    return (
        <>
        <Grid container  className='geral' 
        item xs={12}>
            <Box className="carousel-wrapper">
                <span id="item-1"></span>
                <span id="item-2"></span>
                <span id="item-3"></span>
                    <div className="carousel-item item-1">
                        <a className="arrow arrow-prev" href="#item-3"></a>
                        <a className="arrow arrow-next" href="#item-2"></a>
                    </div>

                    <div className="carousel-item item-2">
                        <a className="arrow arrow-prev" href="#item-1"></a>
                        <a className="arrow arrow-next" href="#item-3"></a>
                    </div>

                    <div className="carousel-item item-3">
                        <a className="arrow arrow-prev" href="#item-2"></a>
                        <a className="arrow arrow-next" href="#item-1"></a>
                    </div>
            </Box>
                <Grid xs={12} className='produtos'>
                    <TabProduto />
                </Grid>
        </Grid>
        </>
    );
}

export default Home;