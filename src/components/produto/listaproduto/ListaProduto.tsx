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

function ListaProduto() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto[]>([]);
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );
  const [termoBusca, setTermoBusca] = useState('');

  async function getProduto() {
    await busca("/produtos", setProduto, {
      headers: {
        Authorization: token,
      },
      params: {
        nome: termoBusca
      }
    })
  }

  useEffect(() => {
    getProduto();
  }, [termoBusca]);

  // const handleProdutoClick = (produtoId: number) => {
  //   navigate(/produtos/${produtoId});
  // };

  useEffect(() => {
    if (token == "") {
      toast.error("VocÃª precisa estar logado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login");
    }
  }, [token]);

  return (
    <>



      <Grid container className="fundo" justifyItems="center">
        <Grid xs={4}></Grid>

        <Input placeholder="Pesquise seu produto aqui"  color="info"
        type="text"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        size="medium"
      />


        <Grid xs={4} className="text">
          <br></br>
          <h1> Lista de Produtos </h1>
          <br></br>
        </Grid>
        <Grid xs={4}></Grid>

        <Grid container className="listaproduto">
          {termoBusca === '' ? produto.map((produto) => (
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

                    <Box display="flex" justifyContent="center" mb={1.5}>
                      <Link
                        to={`/produtos/${produto.id}`}
                        className="text-decorator-none"
                      >
                        <Box mx={1}>
                          <Button
                            variant="contained"
                            size="small"
                            color="default"
                          >
                            Detalhar
                          </Button>
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Box m={2}></Box>
            </>
          )) : produto.filter(produto => produto.nome.toLowerCase().includes(termoBusca.toLowerCase())).map((produto) => (
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

                    <Box display="flex" justifyContent="center" mb={1.5}>
                      <Link
                        to={`/produtos/${produto.id}`}
                        className="text-decorator-none"
                      >
                        <Box mx={1}>
                          <Button
                            variant="contained"
                            size="small"
                            color="default"
                          >
                            Detalhar
                          </Button>
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Box m={2}></Box>
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
export default ListaProduto;