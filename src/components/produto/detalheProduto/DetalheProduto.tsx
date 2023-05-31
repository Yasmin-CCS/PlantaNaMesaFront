import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Produto from "../../../models/Produto"
import { buscaId } from "../../../services/Service"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeItem } from "../../../store/tokens/Action"
import { TokenState } from "../../../store/tokens/tokensReducer"
import { toast } from "react-toastify"
import { Button } from "@material-ui/core"


function DetalheProduto() {
  
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


  const dispatch = useDispatch()
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token);

  async function addCarrinho() {
    dispatch(addToCart(produto))
  }

  async function getProdutoUnico(id: string) {
    try {
      await buscaId(`/produtos/${id}`, setProduto, {
        headers: {
          Authorization: token
        }
      })
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

  const carrinho = useSelector<TokenState, TokenState['produtos']>(
    (state) => state.produtos
  );

  let valorTotal=0

  function buy(){
    dispatch(removeItem([]))
    toast.success('Compra realizada com sucesso', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
  });
    navigate('/home')
  }

  return (
    <>
      {carrinho.map(item => (
        <form onSubmit={addCarrinho}>
          <p>{item.nome}</p>
          <p>{item.valor}</p>
          <img src={item.foto} alt={item.nome} />
          valor total: {carrinho.map((price) =>{
            {valorTotal = valorTotal + price.valor}
          })}{valorTotal}
          <Button type='submit'></Button>
          </form>
      ))}
    </>
  )
}

export default DetalheProduto