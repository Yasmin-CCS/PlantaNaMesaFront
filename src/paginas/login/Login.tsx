import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import './Login.css';
import UsuarioLogin from '../../models/UsuarioLogin';
import { useDispatch } from 'react-redux';
import { addId, addToken } from '../../store/tokens/Action';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');

    const [userLogin, setUserLogin] = useState<UsuarioLogin>({
        id: 0,
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    const [respUserLogin, setRespUserLogin] = useState<UsuarioLogin>({
        id: 0,
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token))
            navigate('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setRespUserLogin)
            toast.success('usuario logado com sucesso', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        } catch (error) {
            toast.error('Dados de usuario inconsistente. Erro ao logar!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        if (respUserLogin.token !== "") {
            dispatch(addToken(respUserLogin.token));
            dispatch(addId(respUserLogin.id.toString()));
            navigate("/home");
        }
    }, [respUserLogin.token]);


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={4}> </Grid>
            <Grid alignItems='center' xs={4}>
                <Box paddingX={0}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario'><Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography></Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={4} className='imagem'>
            </Grid>
        </Grid>
    );
}

export default Login;