import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TokenState } from "../../store/tokens/TokensReducer";
import { buscaId, put } from "../../services/Service";
import './AtualizarCadastro.css';
import Loading from "../../components/estaticos/loading/Loading";

function AtualizarCadastro() {

  const navigate = useNavigate();

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  const [removeLoading, setRemoveLoading] = useState(false);

  const userId = useSelector<TokenState, TokenState['id']>((state) => state.id);

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    foto: '',
    nome: '',
    usuario: '',
    senha: '',
    produto: null,
  });

  async function getUsuario() {
    try {
      await buscaId(`/usuarios/${usuario.id}`, setUsuario, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getUsuario();
      setRemoveLoading(true);
    }, 5000);
  }, []);

  useEffect(() => {
    setUsuario({
      ...usuario,
      senha: ''
    })
  }, [usuario.usuario])

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  }

  async function atualizar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
      try {
        await put('/usuarios/atualizar', usuario, setUsuario, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('Usuário atualizado com sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined
        });
        setUsuario({ ...usuario, senha: '' });
        setConfirmarSenha('');
        navigate('/contaUsuario')

      } catch (error) {
        toast.error('Falha ao cadastrar o usuário, verifique os campos!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });
      }
    } else {
      toast.error('Os campos de Senha e Confirmar Senha estão diferentes!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
      });
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('');
    }
  }

  function voltar() {
    navigate("/contaUsuario");
  }

  return (
    <Grid className="fundo-att-user" >


    <Grid className="container-form">
        <form onSubmit={atualizar} className="form-atualizarCadastro">
        <Box className='input-imag-cadastro'>
              {usuario.foto == '' &&
              <Box className=''>
                <span>{usuario.foto == "" && ' Foto '}</span>
              </Box>}

              {!removeLoading && <Loading />}

                <img src={usuario.foto} alt='' />

            </Box>

            <Box>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textos2 form-att-h3"
            >
              Atualizar Usuário
            </Typography>

            <TextField
              value={usuario.nome}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              id="nome"
              label="Nome"
              variant="outlined"
              name="nome"
              margin="normal"
              fullWidth
            />

                <TextField
                  value={usuario.usuario}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateModel(event)
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
                  value={usuario.foto}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateModel(event)
                  }
                  id="foto"
                  label="Foto"
                  variant="outlined"
                  name="foto"
                  margin="normal"
                  fullWidth
                />

                <TextField
                  error={usuario.senha.length < 8 && usuario.senha.length > 0}
                  value={usuario.senha}
                  helperText={
                    usuario.senha.length < 8 && usuario.senha.length > 0
                      ? "a senha tem que ser maior que 8 caracteres"
                      : ""
                  }
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateModel(event)
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
                  error={confirmarSenha.length < 8 && confirmarSenha.length > 0}
                  value={confirmarSenha}
                  helperText={
                    confirmarSenha.length < 8 && confirmarSenha.length > 0
                      ? "a senha tem que ser maior que 8 caracteres"
                      : ""
                  }
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    confirmSenha(event)
                  }
                  id="confirmarSenha"
                  label="Confirmar Senha"
                  variant="outlined"
                  name="confirmarSenha"
                  margin="normal"
                  type="password"
                  fullWidth
                />
         
            <Box marginTop={2} textAlign="center">
              <Link>
                <Button
                  variant="contained"
                  className="btnCancelar"
                  onClick={voltar}
                >
                  Cancelar
                </Button>
              </Link>

              <Button className="btnAtualizar" type="submit" variant="contained" color="primary">
                Atualizar
              </Button>
            </Box>
            </Box>
          </form>
          </Grid>
        </Grid>
  );
}

export default AtualizarCadastro