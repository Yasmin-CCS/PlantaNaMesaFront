import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { addToken } from '../../../store/tokens/Action';
import { toast } from 'react-toastify';
import './Navbar.css'
import Usuario from '../../../models/Usuario';

function Navbar() {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  let navigate = useNavigate();
  const dispatch = useDispatch();

  function goLogout() {
    dispatch(addToken(''))
    toast.info('Usuário deslogado', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    navigate('/login')
  }

  const pages = [
    {
      nome: 'Home',
      link: '/home',
    },
    {
      nome: 'Produtos',
      link: '/produtos',
    },
    {
      nome: 'Novo Produto',
      link: '/cadastrarprodutos',
    },
    {
      nome: 'Categorias',
      link: '/categorias',
    },
    {
      nome: 'Nova Categoria',
      link: '/categoriascadastro',
    },
    {
      nome: 'Carrinho',
      link: '/carrinho',
    },
   

  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  var navbarComponent;

  if (token != "") {
    navbarComponent =
      <AppBar position="static" className='Nav-style'>
        <Container maxWidth="xl" >
          <Toolbar disableGutters>
            <Link to='/home' >
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'secondary',
                  textDecoration: 'none',
                }}
              >
                <Avatar src='/src/assets/icones/mudinha.png'></Avatar>
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
              </Button>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.nome} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.nome}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Avatar src='/src/assets/icones/mudinha.png'></Avatar>

            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link to={page.link} >
                  <Button
                    key={page.nome}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.nome}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* aqui trocamos o icone da bolinha navbar  */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="outras opições">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu} >
                  <Box className='Box' mx={1}>
                    <Link to='/contaUsuario'>
                      <Typography className='' variant="h6" color="inherit">
                        Conta
                      </Typography>
                    </Link>
                  </Box>
                  <Box className='Box' mx={1} onClick={goLogout} >
                    <Typography className='Typography Typography:hover' variant="h6" color="inherit">
                      Logout
                    </Typography>
                  </Box>
                </MenuItem>


              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  }else {
    navbarComponent =
    <AppBar position="static" style={{ backgroundColor: "gray" }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'secondary',
              textDecoration: 'none',
            }}
          >
            Plant
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <Button
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
            </Button>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.nome} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.nome}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.slice(0, 2).map((page) => (
              <Link to={page.link} >
                <Button
                  key={page.nome}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.nome}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.slice(6, 8).map((page) =>
              <Link to={page.link} >
              <Button
                key={page.nome}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.nome}
              </Button>
              </Link>
              )}

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}
export default Navbar;