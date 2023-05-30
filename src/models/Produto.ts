import Categoria from "./Categoria";
import Usuario from "./Usuario";

interface Produto {
  id: number;
  nome: string;
  validade: Date;
  descricao: string;
  quantidade: number;
  valor: number;
  foto: string;
  categoria?: Categoria | null;
  Usuario?: Usuario | null;
}

export default Produto;
