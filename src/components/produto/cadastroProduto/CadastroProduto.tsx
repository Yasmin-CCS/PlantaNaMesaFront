import { Container, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import { busca, buscaId, put, post} from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { addToken } from "../../../store/tokens/Action";
import { toast } from "react-toastify";
import Usuario from "../../../models/Usuario";
import InputAdornment from "@mui/material/InputAdornment";


function FormularioProduto() {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["token"] >(
    (state) => state.token
  );
  

  const { id } = useParams<{ id: string }>();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome:'',
    descricao: ''
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome:'',
    validade: new Date(),
    descricao: '',
    quantidade:0,
    valor:0,
    foto:'',
    categoria: null,
    usuario: null
  });

  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  )

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if(token === '') {
      toast.error('Por favor efetue o login para acessar essa página',{
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined, 
    });
      navigate('/login')
    }
  }, [])

  async function getCategorias(){
    try {
      await busca ('/categorias', setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().contains('403')) {
        toast.error('Token expirado, logue novamente',{
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined, 
      });
        dispatch(addToken(''));
        navigate('/login');
    }
  }
}

  async function getProdutoById(id: string) {
    await busca(`/produtos/${id}`,setProduto, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getCategorias();
    if(id !== undefined) {
      getProdutoById(id)
    }
  }, []);

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [event.target.name]: event.target.value,
      categoria: categoria,
    });
  }

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
      usuario: usuario
    });
  }, [categoria]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (id !== undefined) {
      try {
        await put('/produtos', produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('Atualização realizada com sucesso',{
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined, 
      });
        navigate('/produtos')
      } catch (error) {

        toast.error('Algo de errado aconteceu',{
          position: 'top-right',
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
        console.log(produto)
        await post('/produtos', produto, setProduto, {
          headers: {
            Authorization: token,
          }
        });
        toast.success('Produto cadastrado com sucesso',{
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined, 
      });
        navigate('/produtos')
      } catch (error) {
        toast.error('Deu erro',{
          position: 'top-right',
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
  


return (
  <Container maxWidth="sm">
    <Box my={2}>
      <form onSubmit={onSubmit}>
        
        <Typography variant="h4" align="center">
          {id !== undefined ? ' Atualização ' : ' Cadastro '} de Produto
        </Typography>
        
        <TextField
          name="nome"
          fullWidth
          margin="normal"
          label="Nome do Produto"
          helperText='Pelo menos 5 caracteres'
          value={produto.nome}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateModel(event)
          }
        />
        <InputLabel>Validade do Produto</InputLabel>
        <TextField
          name="validade"
          type = "date"
          fullWidth
          margin="normal"
          helperText="Validade do Produto"
          value={produto.validade}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateModel(event)
          }
        />
        <TextField
          name="descricao"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          label="Descricao do Produto"
          value={produto.descricao}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateModel(event)
          }
        />
        <TextField
          name="quantidade"
          type="number"
          fullWidth
          margin="normal"
          multiline
          InputProps={{
            startAdornment:<InputAdornment position="start">R$</InputAdornment>
            }}
          label="Quantidade do Produto"
          value={produto.quantidade}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateModel(event)
          }
        />
        <TextField
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
        <TextField
          name="valor"
          type="number"
          fullWidth
          margin="normal"
          multiline
          defaultValue="somente números"
          InputProps={{
          startAdornment:<InputAdornment position="start">R$</InputAdornment>
          }}
          value={produto.valor}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateModel(event)
          }
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="selectTema">Categoria</InputLabel>
          <Select
            labelId="selectTema"
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
          <FormHelperText>Escolha uma Categoria</FormHelperText>
        </FormControl>
        
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={categoria.id === 0}>
          {id !== undefined ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </Button>

      </form>
    </Box>
  </Container>
);
}

export default FormularioProduto;