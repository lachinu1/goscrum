import React from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux"

import './header.css';

import { styled } from '@mui/material/styles';
import { 
    Badge,
    Avatar,
    Stack,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Button,
    Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  

export const Header = () => {

    const navigate = useNavigate();

    const { tasks } = useSelector(state => { // trae el estado de la acción de obtener tareas de tasksReducer
        return state.tasksReducer // se obtiene el estado de la acción de getTasks
    })

    const handlerLogout = () => { // redirigir al login
        localStorage.removeItem('token'); // elimina el token del localStorage
        localStorage.removeItem('userName'); // elimina el userName del localStorage
        navigate('/login', { replace: true }); // replace: true para que no se pueda volver atrás
    }

    const pages = ['Tareas', 'Donar'];
    const settings = ['Cerrar sesión'];

    const [anchorElNav, setAnchorElNav] = React.useState (null);
    const [anchorElUser, setAnchorElUser] = React.useState  (null);

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

        return (
            // <header>
            //     <img src="/img/logo.png" alt="logo" />
          
            //     <div className="wrapper_right_header">
             
            //         <button onClick={() => navigate("/donar", { replace: true })}>Doná</button>
                
            //         <span>Tareas creadas: {tasks?.length}</span>
            //         <span>{localStorage.getItem('userName')}</span>



            //         <Stack direction="row" spacing={2}>
            //             <StyledBadge
            //                 overlap="circular"
            //                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            //                 variant="dot"
            //             >
            //                 <Avatar alt={localStorage.getItem('userName')} src="/img/avatar.png" />
            //             </StyledBadge>
            //         </Stack>
                
            //         <button onClick={handlerLogout}>
            //             <ArrowCircleRightIcon />
            //         </button>
            //     </div>
            // </header>
            <>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <img src="https://usercontent.one/wp/www.scrumbeginner.com/wp-content/uploads/2021/05/Scrum.org-logo-full.png" alt="logo" width="150"/>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
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
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={() => navigate(page === "Tareas" ? "/tareas" : "/donar", { replace: true })}
                                        sx={{ my: 1, color: '#4a4a4a', display: 'block' , fontFamily: 'Nunito', fontSize: '14px', fontWeight: 'bold'}}
                                    >
                                        {page}
                                    </Button>

                                    // <Link
                                    //     key={page} href={page === "Tareas" ? "/tareas" : "/donar"}
                                    //     sx={{ my: 1, color: 'white', display: 'block' , fontFamily: 'Nunito', fontSize: '14px'}}

                                    //     >
                                    //     {page}
                                    // </Link>
                                ))}
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                               
                                    <span>Tareas creadas:&nbsp;{tasks?.length}</span>&nbsp;&nbsp;
                                    <span>{localStorage.getItem('userName')}</span>&nbsp;
                              
                                <Tooltip title="Perfil">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Stack direction="row" spacing={2}>
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                            >
                                                <Avatar alt={localStorage.getItem('userName')} src={localStorage.getItem('userName')} />
                                            </StyledBadge>
                                        </Stack>
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
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" onClick={handlerLogout}>{setting}
                                                <ArrowCircleRightIcon />
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        );
    }
