import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Produto from "../../../models/Produto"
import { buscaId } from "../../../services/Service"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeItem } from "../../../store/tokens/Action"
import { TokenState } from "../../../store/tokens/TokensReducer"
import { toast } from "react-toastify"
import { Button } from "@material-ui/core"


function DetalheProduto() {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>()

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: '',
    validade: new Date(),
    descricao: '',
    quantidade: 0,
    valor: 0,
    foto: '',
    categoria: null,
    usuario: null
  })

  async function addCarrinho() {
    dispatch(addToCart(produto))
    navigate('/carrinho');
  }

  async function getProdutoUnico(id: string) {
    try {
      await buscaId(`/produtos/${id}`, setProduto,{headers: {
        Authorization: token
    }})

      console.log(produto);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      getProdutoUnico(id)
    }
  }, [id])


  return (
    <>
      <p>{produto.nome}</p>
      <p>{produto.valor}</p>
      <img src={produto.foto} alt={produto.nome} />
      <Button onClick={addCarrinho}> Adicionar ao carrinho</Button>
    </>
  )
}

export default DetalheProduto