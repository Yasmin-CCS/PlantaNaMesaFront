import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Produto from "../../../models/Produto";
import { busca } from "../../../services/Service";
import "./ListaProduto.css";
import { toast } from "react-toastify";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { Box, Grid, Input } from "@mui/material";
import ModalProduto from "../modalProduto/ModalProduto";
import Loading from "../../estaticos/loading/Loading";

function ListaProduto() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto[]>([]);
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const [removeLoad, setRemoveLoad] = useState(false);

  const [termoBusca, setTermoBusca] = useState("");

  async function getProduto() {
    await busca("/produtos", setProduto, {
      headers: {
        Authorization: token,
      },
      params: {
        nome: termoBusca,
      },
    });
  }

  useEffect(() => {
    setTimeout(() => {
      getProduto();
      setRemoveLoad(true);
    }, 5000);
  }, [termoBusca]);

  // const handleProdutoClick = (produtoId: number) => {
  //   navigate(/produtos/${produtoId});
  // };

  return (
    <>
      <Grid container className="fundo" justifyItems="center">
        <Grid xs={12} className="botao-posicao">
          <Box className="pesquisa-position">
            <Input
              color="success"
              placeholder="Pesquisar"
              type="text"
              className="pesquisa"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </Box>
        </Grid>

        <Grid container className="listaproduto">
          {termoBusca === ""
            ? produto.map((produto) => (
                <>
                  <Grid item className="flip-card">
                    <Box className="flip-card-inner">
                      <Box className="flip-card-front">
                        <img src={produto.foto} alt="" className="img" />
                      </Box>
                      <Box className="flip-card-back">
                        <Typography variant="body2" component="p">
                          Fornecedor: {produto.usuario?.nome}
                        </Typography>

                        <Typography variant="body2" component="p">
                          Planta: {produto.nome}
                        </Typography>

                        <Typography variant="body2" component="p">
                          Valor: R${produto.valor}
                        </Typography>

                        <Box className="botao" mb={1.5}>
                          <ModalProduto idModal={produto.id} />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Box m={2}></Box>
                </>
              ))
            : produto
                .filter((produto) =>
                  produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
                )
                .map((produto) => (
                  <>
                    <Grid item className="flip-card">
                      <Box className="flip-card-inner">
                        <Box className="flip-card-front">
                          <img src={produto.foto} alt="" className="img" />
                        </Box>
                        <Box className="flip-card-back">
                          <Typography variant="body2" component="p">
                            Fornecedor: {produto.usuario?.nome}
                          </Typography>

                          <Typography variant="body2" component="p">
                            Planta: {produto.nome}
                          </Typography>

                          <Typography variant="body2" component="p">
                            Valor: R${produto.valor}
                          </Typography>

                          <Box className="botao-posicao">
                            <ModalProduto idModal={produto.id} />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                ))}

          {!removeLoad && <Loading />}
          {removeLoad && produto.length === 0 && (
            <p>Não há produtos cadastrados!</p>
          )}
        </Grid>
      </Grid>
    </>
  );
}
export default ListaProduto;
