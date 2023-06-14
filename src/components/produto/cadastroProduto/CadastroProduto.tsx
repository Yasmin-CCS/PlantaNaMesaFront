import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import { busca, buscaId, put, post } from "../../../services/Service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { addToken } from "../../../store/tokens/Action";
import { toast } from "react-toastify";
import Usuario from "../../../models/Usuario";
import InputAdornment from "@mui/material/InputAdornment";
import { Grid } from "@mui/material";
import"./CadastroProduto.css"

function FormularioProduto() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const { id } = useParams<{ id: string }>();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: "",
  });

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

  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
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

  async function getCategorias() {
    try {
      await busca("/categorias", setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().contains("403")) {
        toast.error("Token expirado, logue novamente", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
        dispatch(addToken(""));
        navigate("/login");
      }
    }
  }

  async function getProdutoById(id: string) {
    await busca(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getCategorias();
    if (id !== undefined) {
      getProdutoById(id);
    }
  }, []);

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [event.target.name]: event.target.value,
      categoria: categoria,
    });
  }
  // function getfoto(item:Produto){

  // }

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
      usuario: usuario,
    });
  }, [categoria]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (id !== undefined) {
      try {
        await put("/produtos", produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Atualização realizada com sucesso", {
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
      } catch (error) {
        toast.error("Algo de errado aconteceu", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
      }
    } else {
      try {
        console.log(produto);
        await post("/produtos", produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Produto cadastrado com sucesso", {
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
      } catch (error) {
        toast.error("Deu erro", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
      }
    }
  }

  function voltar() {
    navigate("/home");
  }

  return (
    <Grid
      container
      className="fundocd"
    >
        <Grid className="formcd">
          
            <form onSubmit={onSubmit} >
              <Typography className="Titulo-Prod" variant="h4" align="center">
                {id !== undefined ? " Atualizar" : " Cadastrar "} Produto:
              </Typography>

              <Box className="input1">
              <TextField
                variant='outlined'
                className="digita"
                name="nome"
                fullWidth
                margin="normal"
                label="Nome do produto"
                error={produto.nome.length < 5 && produto.nome.length > 0}
                helperText="Pelo menos 5 caracteres"
                value={produto.nome}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
              />
                <TextField
                variant='outlined'
                className="digita"
                name="foto"
                fullWidth
                margin="normal"
                multiline
                label="Coloque a foto do produto"
                value={produto.foto}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
              />

            {/* Codigo baixo mostra a imagem quando compo de img no input é prenchido   */}
            
            <Grid className='input-imag'>
              {produto.foto == '' &&         
              <Box className='bolsa'>
                <span className='pacote'>{produto.foto == "" && ' Foto '}</span>
              </Box>}
              <Box>
                <img className='propriedade-imag' src={produto.foto} alt='' />
                </Box>
            </Grid>
              <FormControl fullWidth margin="normal"
              variant="outlined"
              className="digita">
                <InputLabel
                id="selectCategoria">Categoria</InputLabel>
                <Select
                  labelId="selectCategoria"
                  onChange={(event) =>
                    buscaId(`/categorias/${event.target.value}`, setCategoria, {
                      headers: {
                        Authorization: token,
                      },
                    })
                  }
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.descricao}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Escolha um categoria para a sua produto
                </FormHelperText>
              </FormControl>
              </Box>

              <Box className="input2">
              <TextField
                variant="outlined"
                className="digita"
                name="validade"
                type="date"
                fullWidth
                margin="normal"
                helperText="Validade do Produto"
                value={produto.validade}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
              />
              <TextField
                variant="outlined"
                className="digita"
                name="quantidade"
                type="number"
                fullWidth
                margin="normal"
                multiline
                label="Quantidade do Produto"
                value={produto.quantidade}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
              />

              <TextField
                variant="outlined"
                className="digita"
                name="valor"
                fullWidth
                margin="normal"
                multiline
                label="Preço"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                value={produto.valor}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
              />
              </Box>
              
              <Box className="input-desc">
              <TextField
                name="descricao"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                label="Descrição do produto"
                value={produto.descricao}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
              />
              </Box>
      
              <Box className="botao">
                <Link to="/produtos">
                <Button  
                  variant="contained">
                  Voltar
                </Button>
                </Link>
            
                <Button
                  type="submit"
                  variant="contained"
                  disabled={categoria.id === 0}
                >
                  {id !== undefined ? "Atualizar Produto" : "Cadastrar Produto"}
                </Button>
              </Box>
            </form>
        </Grid>
      </Grid>
  );
}

export default FormularioProduto;
