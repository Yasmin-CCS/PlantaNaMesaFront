import Categoria from "./Categoria"
import Usuario from "./Usuario"

interface Produto {

  id: number
  nome: string
  validade: string 
  descricao: string
  quantidade: number
  valor: number
  kit:boolean
  categoria?: Categoria | null
  usuario?: Usuario | null
  
}

export default Produto