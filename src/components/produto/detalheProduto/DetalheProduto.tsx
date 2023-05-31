import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { buscaId } from "../../../services/Service";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/tokens/Action";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";
import "./DetalheProduto.css";
import { Box, Button, Grid } from "@mui/material";
import { Typography } from "@material-ui/core";

function DetalheProduto() {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

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
    navigate("/produtos");
  }

  async function getProdutoUnico(id: string) {
    try {
      await buscaId(`/produtos/${id}`, setProduto, {
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
    if (id !== undefined) {
      getProdutoUnico(id);
    }
  }, [id]);

  return (
    // <>
    //   <p>{produto.nome}</p>
    //   <p>{produto.valor}</p>
    //   <img src={produto.foto} alt={produto.nome} />
    //
    // </>

    <>
      <Grid container my={2} px={4}>
        <Box display="flex" flexWrap={"wrap"} width={"100%"}>
          <Grid
            item
            xs={3}
            border={1}
            borderRadius={2}
            borderColor={"lightgray"}
            p={2}
          >
            <Typography>Nome: {produto.nome}</Typography>

            <Typography>Valor: {produto.valor}</Typography>

            <img src={produto.foto} alt={produto.nome} />

            <Box display={"flex"} gap={4}>
              <Button onClick={addCarrinho}> Adicionar ao carrinho</Button>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default DetalheProduto;
