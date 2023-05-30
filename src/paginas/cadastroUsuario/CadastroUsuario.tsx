import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastroUsuario } from '../../services/Service';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

function CadastroUsuario() {

    const navigate = useNavigate();

    const [user, setUser] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    const [userResult, setUserResult] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (user.senha === confirmarSenha && user.senha.length >= 8) {

            try {
                await cadastroUsuario('/usuarios/cadastrar', user, setUserResult);
                toast.success('Usuário cadastrado com sucesso',{
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
                toast.error('Falha ao cadastrar o usuário, verifique os campos',{
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
        } else {
            toast.error('Os campos de Senha e Confirmar Senha estão diferentes',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined, 
            });
            setUser({ ...user, senha: '' });
            setConfirmarSenha('')
        }
    }

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login");
        }
    }, [userResult]);

    function voltar() {
        navigate('/login')
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="fundo"
        >
            <Grid alignItems="center" xs={12}>
                <Box paddingX={0}>
                    <form onSubmit={cadastrar} className="form">
                        <Typography
                            variant="h3"
                            gutterBottom
                            color="textPrimary"
                            component="h3"
                            align="center"
                            className="textos2"
                        >
                            Cadastrar Usuário
                        </Typography>

                        <TextField
                            value={user.nome}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(event)
                            }
                            id="nome"
                            label="Nome"
                            variant="outlined"
                            name="nome"
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            value={user.usuario}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(event)
                            }
                            id="usuario"
                            label="Usuário"
                            type="email"
                            required
                            variant="outlined"
                            name="usuario"
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            value={user.senha}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(event)
                            }
                            id="senha"
                            label="Senha"
                            variant="outlined"
                            name="senha"
                            margin="normal"
                            type="password"
                            fullWidth
                        />

                        <TextField
                            value={confirmarSenha}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                confirmarSenhaHandle(event)
                            }
                            id="confirmarSenha"
                            label="Confirmar Senha"
                            variant="outlined"
                            name="confirmarSenha"
                            margin="normal"
                            type="password"
                            fullWidth
                        />

                        <TextField
                            value={user.foto}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(event)
                            }
                            id="foto"
                            label="Foto"
                            variant="outlined"
                            name="foto"
                            margin="normal"
                            type="normal"
                            fullWidth
                        />

                        <Box marginTop={2} textAlign="center">
                            <Link to="/login" className="text-decorator-none">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="btnCancelar"
                                    onClick={voltar}
                                >
                                    Cancelar
                                </Button>
                            </Link>

                            <Button type="submit" variant="contained" color="primary">
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;