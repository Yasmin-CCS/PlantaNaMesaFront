import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './ListaProduto.css';
import { busca } from '../../../services/Service';
import Produto from '../../../models/Produto';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';


function ListaProduto() {
    const navigate = useNavigate();
    const [produto, setProduto] = useState<Produto[]>([])
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    );


    async function getProduto() {
        await busca('/produto', setProduto, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getProduto()
    }, [produto.length])

    useEffect(() => {
        if (token == '') {
            alert('Por favor efetue o Login para acessar essa página');
            navigate('/login')
        }
    }, [token])

    return (
        <>
            <Box m={2} >
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Postagens
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Título
                        </Typography>
                        <Typography variant="body2" component="p">
                            Texto da Postagem
                        </Typography>
                        <Typography variant="body2" component="p">
                            Tema
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" mb={1.5}>

                            <Link to="/cadastrarprodutos" className="text-decorator-none" >
                                <Box mx={1}>
                                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                        atualizar
                                    </Button>
                                </Box>
                            </Link>
                            <Link to="" className="text-decorator-none">
                                <Box mx={1}>
                                    <Button variant="contained" size='small' color="secondary">
                                        deletar
                                    </Button>
                                </Box>
                            </Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>)
}

export default ListaProduto;