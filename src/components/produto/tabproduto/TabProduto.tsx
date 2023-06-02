import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaProduto from '../listaproduto/ListaProduto';
import './TabProduto.css';


function TabProduto() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
    }
    return (
        <>
            <TabContext value={value}>
                <AppBar position="static">
                    <Tabs centered indicatorColor="secondary" onChange={handleChange}>
                        <Tab label="Todas as postagens" value="1" />
                        <Tab label="Sobre-nós" value="2" />
                    </Tabs>
                </AppBar>
                <TabPanel value="1" >
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        <ListaProduto />
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre-nós</Typography>
                    <Typography variant="body1" gutterBottom color="textPrimary" className="sobrenos" align="justify"><div>No Brasil 90% da alimentação 
                        é baseada em apenas 20 espécies, e existe um grupo de alimentos não convencionais conhecidos como PANCs. 
                        Assim, criamos um e-commerce que conectaria pequenas comunidades produtoras de PANCs ao resto da população,
                        gerando renda, diversificando alimentos e estimulando a agricultura sustentável.</div>
                        <div>O Planta na Mesa é um e-commerce de PANCs ofertadas majoritariamente por comunidades quilombolas e 
                        indígenas, foi idealizado para contribuir para a ODS 2.3 - Fome Zero e Agricultura Sustentável.</div>
                        </Typography>
                </TabPanel>
            </TabContext>
        </>
    );
}
export default TabProduto;