import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import './ListaCategoria.css';
import Categoria from '../../../models/Categoria';
import { useSelector } from 'react-redux';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { toast } from 'react-toastify';

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
            toast.error('Você precisa estar logado', {
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
            {categoria.map((categoria) => (
                <Box m={2} >
                    <Card variant="outlined" className='cardcategoria'>
                        <CardContent className='cardcategoriagrid'>
                            <Grid className='cardcategoriatop'>
                                <Typography className='nomecategorialista'>
                                    {categoria.nome}
                                </Typography>
                        <CardActions>
                            <Box display="flex" justifyContent="center" mb={1.5} >
                                <Link to={`/categoriasCadastro/${categoria.id}`} className="text-decorator-none">
                                    <Box mx={1}>
                                        <Button variant="contained" className="btnAtualizar" >
                                            Editar
                                        </Button>
                                    </Box>
                                </Link>
                                <Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
                                    <Box mx={1}>
                                        <Button variant="contained" className='btnApagar'>
                                            Deletar
                                        </Button>
                                    </Box>
                                </Link>
                            </Box>
                        </CardActions>
                            </Grid>


                            <Typography className='descricaocategorialista'>
                                Descrição: {categoria.descricao}
                            </Typography>

                        </CardContent>
                    </Card>
                </Box>
            ))}
        </>
    );
}


export default ListaCategoria;