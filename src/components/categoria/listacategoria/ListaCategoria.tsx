import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './ListaCategoria.css';
import Categoria from '../../../models/Categoria';
import { useSelector } from 'react-redux';
import { busca } from '../../../services/Service';
import { toast } from 'react-toastify';
import { TokenState } from '../../../store/tokens/TokensReducer';

function ListaCategoria() {

    const [categoria, setCategoria] = useState<Categoria[]>([])

    const navigate = useNavigate();
    
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    );

    async function getCategoria() {
        await busca('/categorias', setCategoria, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getCategoria()
    }, [categoria.length])

    useEffect(() => {
            if (token == '') {
                toast.error('Você precisa estar logado',{
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined, 
                });
            navigate('/login')
        }
    }, [token])

    return (
        <>
        {categoria.map((categoria)=>(
            <Box m={2} >
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Categoria
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {categoria.nome}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {categoria.descricao}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" mb={1.5} >
                            <Link to={`/categoriasCadastro/${categoria.id}`} className="text-decorator-none">
                                <Box mx={1}>
                                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                        atualizar
                                    </Button>
                                </Box>
                            </Link>
                            <Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
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
            ))}
        </>
    );
}


export default ListaCategoria;