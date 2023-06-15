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
                    <Tabs centered className="style" onChange={handleChange}>
                        <Tab label="Lista de Produtos" value="1" />
                    </Tabs>
                </AppBar>
                <TabPanel value="1" >
                    <Box>
                        <ListaProduto />
                    </Box>
                </TabPanel>
            </TabContext>
        </>
    );
}
export default TabProduto;