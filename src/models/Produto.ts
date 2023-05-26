import Categoria from "./Categoria"
import Usuario from "./Usuario"

interface Produto {
  id: number
  nome: string
  validade: string 
  descricao: string
  quantidade: number
  kit: boolean
  valor: number
  categoria?: Categoria | null
  usuario?: Usuario | null
}

export default Produto