import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../../models/Usuario";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./CadastroUsuario.css";
import { cadastroUsuario } from "../../services/Service";

function CadastroUsuario() {
  
  // constante para efetuar a navegação do usuário por dentro da lógica
  const navigate = useNavigate();

  // state para controlar o formulário enquanto o usuário preenche o mesmo
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: ""
    
  });

  // state que vai receber a resposta do backend, para verificar se veio tudo ok
  const [usuarioResult, setUsuarioResult] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: ""
  });

  // state para armazenar o campo de confirmação de senha, e fazer a checagem com a senha do usuário
  const [confirmarSenha, setConfirmarSenha] = useState<String>("");

  // função para atualizar o estado do confirmar senha
  function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  // função para atualizar o estado de controle do formulário de usuário, automatizada para todos os campos
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  }

  // função de disparo da requisição para o backend, é bom deixar ela como assincrona
  async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    // verificar se os campos de senha e confirmar senha são iguais, e com no minimo 8 caracteres
    if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
      // caso passe pelo IF, vai executar a tentativa de cadastro, e dar o alerta de sucesso
      try {
        await cadastroUsuario('/usuarios/cadastrar', usuario, setUsuarioResult);
        alert('Usuário cadastrado com sucesso')
      } catch (error) {
        // se der erro no cadastro, por exemplo por e-mail repetido, vai cair nessa msg de erro
        alert('Falha ao cadastrar o usuário, verifique os campos');
      }
    } else {
      // aqui é a mensagem de erro para o caso dos campos de senha estarem diferentes, vai avisar, e apagar os dois campos
      alert('Os campos de Senha e Confirmar Senha estão diferentes');
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('')
    }
  }

  // controle de efeito, para levar a pessoa para a tela de login assim que o backend devolver o JSON de cadastro ok
  useEffect(() => {
    if (usuarioResult.id != 0) {
      navigate("/login");
    }
  }, [usuarioResult]);

  // função de navegação para o botão de cancelar
  // (só fiz essa função pq se eu usasse o Link no botão, quebrava o meu layout, ela não é necessária, da pra fazer com Link mesmo)
  function voltar(){
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
             error={usuario.senha.length < 8 && usuario.senha.length > 0}
             value={usuario.senha}
             helperText={usuario.senha.length < 8 && usuario.senha.length > 0 ? 'a senha tem que ser maior ou = a 8 caracteres' : ''}
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
            helperText={confirmarSenha.length < 8 && confirmarSenha.length > 0 ? 'a senha tem que ser maior ou = a 8 caracteres' : ''}
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
