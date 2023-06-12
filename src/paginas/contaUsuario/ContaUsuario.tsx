import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ContaUsuario.css";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Usuario from "../../models/Usuario";
import { TokenState } from "../../store/tokens/TokensReducer";
import { buscaId } from "../../services/Service";

function ContaUsuario() {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    foto: "",
    nome: "",
    usuario: "",
    senha: "",
    produto: null
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
    getUsuario();
  }, []);

  useEffect(() => {
    setUsuario({
      ...usuario,
      senha: "",
    });
  }, [usuario.usuario]);

  return (
    <div className="perfilContainer">
      <div className="perfilBanner">
        <div>
          <h3>Nome: {usuario.nome}</h3>
          <p>Usuário: {usuario.usuario}</p>
          <p>Total de produtos cadastrados: {usuario.produto?.length}</p>

          <Box marginTop={2} textAlign="center">
            <Link to="/atualizarCadastro">
              <Button variant="contained" color="primary">
                Atualizar Cadastro
              </Button>
            </Link>
          </Box>
        </div>
        <img src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />
      </div>

      <hr />
      <br></br>
      <h1 style={{ textAlign: "center" }}> Meus Produtos</h1>
      <br></br>

      <br></br>
      <div className="perfilPosts">
        {usuario.produto?.map((prod) => (
          <Grid
            item
            border={1}
            borderRadius={2}
            borderColor={"lightgray"}
            p={2}
          >
            <Typography>Nome: {prod.nome}</Typography>

            <Typography>Descrição: {prod.descricao}</Typography>

            <Typography>Quantidade: {prod.quantidade}</Typography>

            <Typography>Valor: R${prod.valor}</Typography>

            <Typography>
              Validade:
              {new Intl.DateTimeFormat("pt-br", {
                dateStyle: "full",
              }).format(new Date(prod.validade))}
            </Typography>

            <Box display={"flex"} gap={4}>
              <Link to={`/cadastrarprodutos/${prod.id}`}>
                <Button fullWidth variant="contained" color="primary">
                  Editar
                </Button>
              </Link>

              <Link to={`/deletarProduto/${prod.id}`}>
                <Button fullWidth variant="contained" color="secondary">
                  Apagar
                </Button>
              </Link>
            </Box>
          </Grid>
        ))}
      </div>

    </div>
  );
}

export default ContaUsuario;
