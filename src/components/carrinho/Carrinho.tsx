import { toast } from "react-toastify";
import { removeItem } from "../../store/tokens/Action";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { TokenState } from "../../store/tokens/TokensReducer";
import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

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

  return (
    <>

      <h1>Produtos Adicionados</h1>

      {carrinho.map((item) => (
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
                <Typography>Nome: {item.nome}</Typography>

                <Typography>Valor: {item.valor}</Typography>

                <img src={item.foto} alt={item.nome} />
              </Grid>
            </Box>
          </Grid>
        </>
      ))}

      <>
        valor total:{" "}
        {carrinho.map((price) => {
          {
            valorTotal = valorTotal + price.valor;
          }
        })}
        <h2>{valorTotal}</h2>
        <Button onClick={buy}>Finalizar compra</Button>
      </>
    </>
  );
}

export default Carrinho;
