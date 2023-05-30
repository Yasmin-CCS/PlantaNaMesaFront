import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ListaCategoria from './components/categoria/listacategoria/ListaCategoria';
import Footer from './components/estaticos/footer/Footer';
import Navbar from './components/estaticos/navbar/Navbar';
import FormularioProduto from './components/produto/cadastroProduto/CadastroProduto';
import ListaProduto from './components/produto/listaproduto/ListaProduto';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import CadastroCategoria from './components/categoria/cadastroCategoria/CadastroCategoria';
import DeletarCategoria from './components/categoria/deletarCategoria/DeletarCategoria';
import DeletarProduto from './components/produto/deletarProduto/DeletarProduto';
import store from './store/Store';

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
          <Route path="/produtos" element={<ListaProduto />} />
          <Route path="/cadastrarprodutos" element={<FormularioProduto />} />
          <Route path="/cadastrarprodutos/:id" element={<FormularioProduto />} />
          <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
          <Route path="/categorias" element={<ListaCategoria />} />
          <Route path="/categoriascadastro" element={<CadastroCategoria />} />
          <Route path="/categoriascadastro/:id" element={<CadastroCategoria />} />
          <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </Provider>
  )
}

export default App
