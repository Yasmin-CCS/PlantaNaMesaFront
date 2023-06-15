import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { buscaId } from "../../../services/Service";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/tokens/Action";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { toast } from "react-toastify";
import "./DetalheProduto.css";
import { Box, Button, Grid } from "@mui/material";
import { Typography } from "@material-ui/core";

function DetalheProduto(idDetalhe: any) {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const idProduto = idDetalhe.idDetalhe.idModal

 console.log(idProduto)

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    validade: new Date(),
    descricao: "",
    quantidade: 0,
    valor: 0,
    foto: "",
    categoria: null,
    usuario: null,
  });

  useEffect(() => {
    if (token === "") {
      toast.error("Por favor efetue o login para acessar essa página", {
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
  }, []);

  async function addCarrinho() {
    dispatch(addToCart(produto));
    toast.success("Produto Adicionado ao Carrinho!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    navigate("/produtos");
  }

  async function getProdutoUnico() {
    try {
      await buscaId(`/produtos/${idProduto}`, setProduto, {
        headers: {
          Authorization: token,
        },
      });

      console.log(produto);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (idProduto !== undefined) {
      getProdutoUnico();
    }
  }, []);

  return (

    <>
      <Grid container className="fundos" >
        
        <Box className="centralizar-detalhar">

          <Grid item xs className="card-detalhe" >

            <Box>
              <Box className="text_desc">
              <Typography variant="h3" align="center" 
              > 
              {produto.nome}
              </Typography>
              </Box>
          <Box>
              <img src={produto.foto} alt={produto.nome} className="img_desc" />
              </Box>
            <Box className="textodetalhe">
              <Typography>Descrição: {produto.descricao}</Typography>
              </Box>

              <Box className="info">
              <Typography className="text">Fornecedor: {produto.usuario?.nome}</Typography>
                
              <Typography className="info">Valor: R$ {produto.valor}</Typography>
            </Box>

          </Box>
              <Box marginTop={2} textAlign="center" className="botoes">
              <Button type="submit" onClick={addCarrinho} className="addCarrinho">
              Adicionar ao Carrinho 
              </Button>
            </Box>

          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default DetalheProduto;
