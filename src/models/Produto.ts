import Categoria from "./Categoria"

interface Produto {

  id: number
  nome: string
  validade: string 
  descricao: string
  quantidade: number
  valor: number
  foto: string
  categoria?: Categoria | null
  
}

export default Produto