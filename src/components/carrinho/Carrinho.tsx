import { toast } from "react-toastify";
import { addToCart, removeItem, removeToCart } from "../../store/tokens/Action";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { TokenState } from "../../store/tokens/TokensReducer";
import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import './Carrinho.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';


function Carrinho() {
  const navigate = useNavigate();
  const carrinho = useSelector<TokenState, TokenState["produtos"]>(
    (state) => state.produtos
  );
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

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

  let valorTotal = 0;

  const dispatch = useDispatch();

  function buy() {
    dispatch(removeItem([]));
    toast.success("Compra realizada com sucesso", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    navigate("/home");
  }

  function removeFromCart(id: number) {
    dispatch(removeToCart(carrinho.filter((item) => { return item.id !== id })));
    toast.success("Produto removido com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    navigate("/carrinho")
  }



  return (
    <>
      <Typography align="center" variant="h4">
        Produtos Adicionados
      </Typography>

      {carrinho.map((item) => (
        <>
          <Grid container my={2} px={4} alignItems="center">
            <Box display="flex" flexWrap={"wrap"} width={"100%"}>
              <Grid item xs={2} border={2} borderRadius={1} borderColor={"black"} p={1}>
                <Typography>{item.nome}</Typography>
                <img className="img_listCart" src={item.foto} alt={item.nome} />
                <Typography>Valor: R$ {item.valor}</Typography>
                <Button type="submit" color="primary" onClick={() => removeFromCart(item.id)}>
                  <DisabledByDefaultIcon />
                </Button>
              </Grid>
            </Box>
          </Grid>
        </>
      ))}

      <>

        <Typography align="center">
          {" "}
          {carrinho.map((price) => {
            {
              valorTotal = valorTotal + price.valor;
            }
          })}

          <h3>Valor Total: R${valorTotal}</h3>

        </Typography>
        <Box marginTop={2} textAlign="center">
          <Link to="/produtos">
            <Button
              variant="contained"
              color="secondary"
              className="btnCancelar"
            >
              Voltar
            </Button>
          </Link>

          <Button type="submit" variant="contained" color="primary" onClick={buy}>
            Comprar
          </Button>
        </Box>
      </>
    </>
  );
}

export default Carrinho;
