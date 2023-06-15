import { purple, red } from '@material-ui/core/colors';
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
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { addToken } from '../../../store/tokens/Action';
import { toast } from 'react-toastify';
import './Navbar.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';



function Navbar() {
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

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
      nome: 'Loja',
      link: '/home',
    },
    {
      nome: 'Sobre',
      link: '/sobre',
    },
    {
      nome: 'Login',
      link: '/login',
    },
    {
      nome: 'Cadastrar',
      link: '/cadastrousuario',
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
      <AppBar position="static" className='text-decorator-none navBargeral'>
        <Container maxWidth="xl">
          <Toolbar disableGutters className="navBartoken">
            <Link to='/home' className='text-decorator-none'>
              
            </Link>
            <Box className='navBartokendireita'>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className='navBartokendireita'>
                {pages.slice(0, 2).map((page) => (
                  <Link to={page.link} >
                    <Button
                      key={page.nome}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      <Typography className='textnavBar'>
                        {page.nome}
                      </Typography>
                    </Button>
                  </Link>
                ))}
              </Box>
              <Button>
                <Link to='/carrinho'>
                  <ShoppingCartOutlinedIcon className='carrinhoicon' />
                </Link>
              </Button>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Botão com foto do usuário" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
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
                  className='menu'
                >
                  <Box className='navBarmenu'>

                    <MenuItem onClick={handleCloseUserMenu}>

                      <Link to='/contaUsuario'>
                        <Typography className='Typography Typography:hover' variant="h6" >
                          Sua Conta
                        </Typography>
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>

                      <Link to='/cadastrarprodutos'>
                        <Typography className='Typography Typography:hover' variant="h6" >
                          Novo Produto
                        </Typography>
                      </Link>
                    </MenuItem>
                    
                    <MenuItem onClick={handleCloseUserMenu}>

                      <Link to='/categoriascadastro'>
                        <Typography className='Typography Typography:hover' variant="h6" >
                          Nova Categoria
                        </Typography>
                      </Link>
                    </MenuItem>


                    <MenuItem onClick={goLogout}>
                      <Typography className='Typography Typography:hover' variant="h6">
                        Logout
                      </Typography>

                    </MenuItem>
                  </Box>


                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  } else {
    navbarComponent =
      <AppBar position="static" className='navBargeral'  >
        <Container maxWidth="xl"   >
          <Toolbar disableGutters className='navBarsemtoken'>

            <Box className='navBaresquerda'>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                }}
                className='textnavBar'
              >
                P
              </Typography>

              <Box >
                {pages.slice(0, 2).map((page) => (
                  <Link to={page.link} >
                    <Button
                      key={page.nome}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      <Typography className='textnavBar'>
                        {page.nome}
                      </Typography>
                    </Button>
                  </Link>
                ))}
              </Box>
            </Box>
            <Box >
              {pages.slice(2, 4).map((page) =>
                <Link to={page.link} >
                  <Button
                    key={page.nome}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Typography className='textnavBar'>
                      {page.nome}
                    </Typography>
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