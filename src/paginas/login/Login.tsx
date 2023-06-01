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
    try {
      await login(`/usuarios/logar`, userLogin, setRespUserLogin);

      toast.success("Usuário logado com sucesso!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      }); 
    } catch (error) {

      toast.success("Usuário ou senha inválidos!", {
        position: "top-center",
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
    <>
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="fundo"
      >
        <Grid alignItems="center" xs={12}>
          <Box paddingX={0}>
            <form onSubmit={onSubmit} className="form">
              <Typography
                variant="h3"
                gutterBottom
                color="textPrimary"
                component="h3"
                align="center"
              >
                Entrar
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
              />

              <TextField
                error={userLogin.senha.length < 8 && userLogin.senha.length > 0}
                value={userLogin.senha}
                helperText={userLogin.senha.length < 8 && userLogin.senha.length > 0 ? 'a senha tem que ser maior que 8 caracteres' : ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event) }
                id="senha"
                label="senha"
                variant="outlined"
                name="senha"
                margin="normal"
                type="password"
                fullWidth
              />

              <Box marginTop={2} textAlign="center">
                <Button className="btnLogin" type="submit" variant="contained">
                  Entrar
                </Button>
              </Box>

              <Box display="flex" justifyContent="center" marginTop={10}>
                <Box marginRight={1}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    Não tem uma conta?
                  </Typography>
                </Box>
                <Link to="/cadastrousuario">
                  <button className="glow-on-hover" type="button">
                    CADASTRA-SE AQUI!
                  </button>
                </Link>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
