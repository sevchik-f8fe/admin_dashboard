import { Box, Button, Typography, InputAdornment, TextField, FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

import { useAuth } from "./store";
import axios from "axios";
import { useEffect } from "react";

const AuthPage = () => {
    const { token, setToken } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await axios.post('https://vanopoizonserver.ru/admin_dashboard/auth', { password: data.password, login: data.login }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => setToken(response.data.token))
            .catch(error => console.error('Ошибка'));
        navigate('/')
    };

    useEffect(() => {
        if (token.length > 0) navigate('/')
    }, [token])

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#fff",
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    p: '1.5rem 2rem',
                    // alignItems: 'start',
                    textAlign: 'center',
                    borderRadius: '1rem',
                    boxShadow: '-1px 0px 16px 0px rgba(37, 36, 34, 0.2)',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: '900',
                        pb: '1rem',
                        mb: '1rem',
                        borderBottom: '1px solid #CCC5B9',
                    }}
                >Авторизация администратора</Typography>

                <TextField
                    {...register("login")}
                    label='Логин'
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={{ color: '#CCC5B9' }} />
                                </InputAdornment>
                            )
                        },
                    }}
                />
                <TextField
                    type="password"
                    {...register("password")}
                    label='Пароль'
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: '#CCC5B9' }} />
                                </InputAdornment>
                            )
                        },
                    }}
                    variant="outlined"
                />

                <Button
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    sx={{
                        fontSize: '1.2rem',
                        p: '.5rem 1.2rem'
                    }}
                    variant="text"
                    size="large"
                >Войти</Button>
            </Box>
        </Box >
    );
}

export default AuthPage;