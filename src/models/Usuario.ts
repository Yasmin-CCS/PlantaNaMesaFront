import Produto from "./Produto";

interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string | null;
  produto?: Produto[];
}

export default Usuario;
