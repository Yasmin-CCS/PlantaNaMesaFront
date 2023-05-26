import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/estaticos/footer/Footer';
import Navbar from './components/estaticos/navbar/Navbar';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import ListaCategoria from './components/categoria/listacategoria/ListaCategoria';
import ListaProduto from './components/produto/listaproduto/ListaProduto';
import FormularioProduto from './components/produto/cadastroProduto/CadastroProduto';
import { Provider } from 'react-redux';
import store from './store/store';

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
          <Route path="/categorias" element={<ListaCategoria />} />
          <Route path="/produtos" element={<ListaProduto />} />
          <Route path="/cadastrarprodutos" element={<FormularioProduto />} />
          <Route path="/cadastrarprodutos/:id" element={<FormularioProduto />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </Provider>
  )
}

export default App
