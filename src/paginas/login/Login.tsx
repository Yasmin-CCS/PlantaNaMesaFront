import React, { useState, useEffect, ChangeEvent } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import "./Login.css";
import UsuarioLogin from "../../models/UsuarioLogin";
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/Action";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

function Login() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [load, setLoad] = useState(false)

  const [token, setToken] = useState("");

  const [userLogin, setUserLogin] = useState<UsuarioLogin>({
    id: 0,
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [respUserLogin, setRespUserLogin] = useState<UsuarioLogin>({
    id: 0,
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (token != "") {
      dispatch(addToken(token));
      navigate("/home");
    }
  }, [token]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoad(true)
    const toastId = toast.loading('Carregando informações...')
    try {
      await login(`/usuarios/logar`, userLogin, setRespUserLogin);
      toast.dismiss(toastId)

      toast.success("Usuário logado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });

      setLoad(false)

    } catch (error) {

      toast.dismiss(toastId)
      toast.error("Usuário ou senha inválidos!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });

      setLoad(false)

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
    <>
      <Grid
        container
        className="fundologin"
        xs={12}
      >
        <Grid xs={6}></Grid>
        <Grid xs={6} alignItems="center" className='divisaoLogin'>
  
          <Grid className='direitalogin' >
            <form onSubmit={onSubmit} className="formlogin">
              <Typography
                gutterBottom
                className='logintitulo'
                align="center"
              >
                Seja bem vinde!
              </Typography>

              <TextField
                value={userLogin.usuario}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                id="usuario"
                label="usuário"
                variant="outlined"
                name="usuario"
                margin="normal"
                fullWidth
                className='inputusuario'
              
              />

              <TextField
                error={userLogin.senha.length < 8 && userLogin.senha.length > 0}
                value={userLogin.senha}
                helperText={userLogin.senha.length < 8 && userLogin.senha.length > 0 ? 'a senha tem que ser maior que 8 caracteres' : ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                id="senha"
                label="senha"
                variant="outlined"
                name="senha"
                margin="normal"
                type="password"
                fullWidth
              />

              <Box marginTop={2} textAlign="center">
                <Button className="btnLogin" type="submit" variant="contained" color='primary'>
                  Entrar
                </Button>
              </Box>

              <Box display="flex" justifyContent="center" marginTop={10} className='linkcadastrese'>
                <Box marginRight={1}>
                  <Typography className='txtlogin' gutterBottom align="center">
                    Não tem uma conta?
                  </Typography>
                </Box>
                <Link to="/cadastrousuario">
                  <Typography className="glow-on-hover">
                    Cadastre-se aqui
                  </Typography>
                </Link>
              </Box>
            </form>
        </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
