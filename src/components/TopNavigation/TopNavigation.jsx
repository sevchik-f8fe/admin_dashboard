import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigation } from "../NavComponent/store";

const TopNavigation = ({ title, children }) => {
    const { setIsOpen } = useNavigation();

    return (
        <Box
            sx={{
                boxShadow: '0px 0px 15px 0px rgba(37, 36, 34, 0.1)',
                zIndex: '10',
                position: 'sticky',
                top: '0.001px',
                p: '1rem 0rem 1rem 5rem',
                backgroundColor: '#FFFCF2',
                display: 'flex',
                gap: '3rem',
                alignItems: 'center'
            }}
        >
            <IconButton
                onClick={() => setIsOpen(true)}
                sx={{
                    border: '1px solid #252422'
                }}
            >
                <MenuIcon sx={{
                    color: '#252422',
                    fontSize: '1.8rem'
                }} />
            </IconButton>

            <Typography
                sx={{
                    fontWeight: 900,
                    color: '#252422',
                    fontSize: '1.5rem'
                }}
            >{title}</Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: '3rem',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default TopNavigation;