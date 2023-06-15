import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ContaUsuario.css";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Usuario from "../../models/Usuario";
import { TokenState } from "../../store/tokens/TokensReducer";
import { buscaId } from "../../services/Service";
import ListaCategoria from "../../components/categoria/listacategoria/ListaCategoria";
import Loading from "../../components/estaticos/loading/Loading";

function ContaUsuario() {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

    const [removeLoad, setRemoveLoad] = useState(false)

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
    setTimeout(() => {
      getUsuario();
      setRemoveLoad(true);
    }, 5000);
  }, []);

  useEffect(() => {
    setUsuario({
      ...usuario,
      senha: "",
    });
  }, [usuario.usuario]);

  return (
    <Grid className="perfilContainer">
      <Grid className="usuarioconta">
        <Grid className="perfilBanner">
          <Grid>
            <Typography>Nome: {usuario.nome}</Typography>
            <Typography>Usuário: {usuario.usuario}</Typography>
            <Typography>Total de produtos cadastrados: {usuario.produto?.length}</Typography>

            <Box marginTop={2} textAlign="center">
              <Link to="/atualizarCadastro">
                <Button variant="contained" className="btnAtualiza">
                  Atualizar Cadastro
                </Button>
              </Link>
            </Box>
          </Grid>     
          <img src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />
        </Grid>


        <Typography style={{ textAlign: "center" }}> Meus Produtos</Typography>

        <Grid className="perfilPosts">
          {usuario.produto?.map((prod) => (
            <Grid
              item
              border={1}
              borderRadius={2}
              borderColor={"lightgray"}
              p={2}
              className='cardprodutoconta'
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
                  <Button fullWidth variant="contained" className="btnEditar">
                    Editar
                  </Button>
                </Link>

                <Link to={`/deletarProduto/${prod.id}`}>
                  <Button fullWidth variant="contained" className="btnApagar">
                    Apagar
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}
          {!removeLoad && <Loading />}
        </Grid>

        <Typography style={{ textAlign: "center" }}> Categorias</Typography>

        <ListaCategoria />
        {!removeLoad && <Loading />}
      </Grid>
    </Grid>
  );
}

export default ContaUsuario;
