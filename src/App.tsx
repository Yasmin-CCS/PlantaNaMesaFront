import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/estaticos/footer/Footer';
import Navbar from './components/estaticos/navbar/Navbar';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import ListaCategoria from './components/categoria/listacategoria/ListaCategoria';
import React from 'react';
import ListaProduto from './components/produto/listaproduto/ListaProduto';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes> // Antigo Switch
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
          <Route path="/temas" element={<ListaCategoria />} />
          <Route path="/posts" element={<ListaProduto />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
