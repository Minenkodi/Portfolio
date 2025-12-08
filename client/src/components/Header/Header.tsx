import * as React from 'react';
import Button from '@mui/material/Button';
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {Person as PersonIcon, AccountBalanceWallet} from '@mui/icons-material';
import './Header.scss';
import {useState} from "react";

function Header() {
    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const [isLoggedIn, setIsLoggedIn] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAuth(false);
    };

    /*const handleLogout = () => {
        setAuth(false);
        console.log('logout');
    }*/

    const handleSingUp = () => {
        console.log('sing up');
        setAuth(true);
    }
    // const isLoggedIn = false;
    const totalBalance = 12500;

    const renderAuthButtons = () => (
        // Варіант 1: Користувач НЕ авторизований (Зображення image_024b3d.png)
        <Box sx={{display: 'flex', gap: 1}}>
            <Button
                variant="contained"
                onClick={handleSingUp}
                sx={{backgroundColor: '#57A151'}}
            >
                Sign Up
            </Button>
            <Button
                variant="outlined" color="inherit"
                onClick={handleSingUp}
                startIcon={<PersonIcon/>}
            >
                Log In
            </Button>
        </Box>
    );

    const renderUserActions = () => (
        // Варіант 2: Користувач авторизований (Зображення image_024b1d.png)
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
            <Button
                variant="contained"
                onClick={handleSingUp}
                sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': {
                        backgroundColor: '#2e7d32', // Темніший відтінок зеленого
                        boxShadow: 6,
                    },
                }}
            >
                Add Transaction
            </Button>
            <IconButton onClick={handleMenu}>
                {/* Аватар або іконка користувача */}
                <Avatar sx={{width: 32, height: 32}}><PersonIcon/></Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClick={handleClose}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Exit</MenuItem>
            </Menu>
        </Box>
    );

    return (
        <Box sx={{flexGrow: 2}}>
            <AppBar
                position="static"
                sx=
                    {{
                        backgroundColor: !auth ? '#243D59' : '#FDFDFD',
                        padding: '10px 0',
                        borderRadius: '10px',
                    }}
            >
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'stretch', gap: 3}}>
                        <Typography variant="h6" color={auth ? 'text.primary' : 'white'} sx={{fontWeight: 600}}>
                            <span><AccountBalanceWallet sx={{marginRight: 0.5, marginBottom: -0.6}}/>
                                {'FinTrack'}
                            </span>
                        </Typography>

                        {/* Баланс відображається лише для авторизованого користувача */}
                        {auth && (

                            <Typography variant="h5" color="text.primary" sx={{fontWeight: 700}}>
                                <span>{'Total Balance: '}</span>
                                ${totalBalance.toLocaleString()}
                            </Typography>
                        )}
                    </Box>

                    {/* Умовний рендеринг: вибір набору кнопок */}
                    {auth ? renderUserActions() : renderAuthButtons()}
                </Toolbar>
            </AppBar>
        </Box>
        /*<div className="header-container">
            <div className="header-balance">
                <Typography
                    component="p"
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Total Balance:
                </Typography>
                <Typography
                    component="p"
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                    }}>
                    &#36; 12500.00
                </Typography>
            </div>
            <div>
                <Button variant="contained" color="success" className="AddTransactionButton" size="large">
                    <Typography component="span" fontWeight="bold">
                        Add Transaction
                    </Typography>
                </Button>

                {auth && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            sx={{
                                color: 'grey',
                            }}
                        >
                            <AccountCircleRoundedIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Exit</MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        </div>*/
    );
}

export default Header;