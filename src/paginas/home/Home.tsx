import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css';
import TabProduto from '../../components/produto/tabproduto/TabProduto';
import Carrosel from '../../components/estaticos/carrosel/Carrosel';

function Home() {
    return (
        <>
        <Grid>
        <Grid container  className='geral' 
        item xs={12}>
                    <Carrosel/>
                </Grid>
                <Grid xs={12} className='produtos'>
                    <TabProduto />
                </Grid>
        </Grid>
        </>
    );
}

export default Home;