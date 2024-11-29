import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif',
        color: '#252422',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                },
                outlined: {
                    textTransform: 'none',
                    borderRadius: '1rem',
                    fontWeight: '600',
                    backgroundColor: 'transparent',
                    borderColor: '#252422',
                    color: '#252422',
                    '&:hover': {
                        borderColor: '#252422',
                        backgroundColor: 'transparent',
                    },
                },
                text: {
                    textTransform: 'none',
                    borderRadius: '1rem',
                    fontWeight: '600',
                    backgroundColor: '#EB5E2815',
                    color: '#EB5E28',
                    '&:hover': {
                        backgroundColor: '#EB5E2815',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        // backgroundColor: 'transparent',
                    },
                    '&:active': {
                        // backgroundColor: '#fff1',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFF',
                        color: '#252422',
                        borderRadius: '1rem',
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#CCC5B9',
                                borderWidth: '1px',
                            },
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#CCC5B9',
                    },
                },
            },
        }
    }
})