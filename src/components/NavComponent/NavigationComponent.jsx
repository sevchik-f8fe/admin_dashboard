import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Typography } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArticleIcon from '@mui/icons-material/Article';
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useNavigation } from "./store";
import { nanoid } from "nanoid";

const NavComponent = () => {
    const { active, setActive, isOpen, setIsOpen } = useNavigation();
    const navigate = useNavigate();

    const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
        '& .MuiSvgIcon-root': {
            fontSize: '1.8rem',
        },
    }));

    const navElements = [
        {
            title: 'ЗАКАЗЫ',
            type: 'orders',
            Icon: InventoryIcon,
            onClick: () => {
                setActive('orders');
                navigate(`/`);
            }
        },
        {
            title: 'АНАЛИТИКА',
            type: 'analytic',
            Icon: AnalyticsIcon,
            onClick: () => {
                setActive('analytic');
                navigate(`/analytic`);
            }
        },
        {
            title: 'СТАТЬИ',
            type: 'article',
            Icon: ArticleIcon,
            onClick: () => {
                setActive('article');
                navigate(`/article`);
            }
        },
    ];

    return (
        <Drawer sx={{ zIndex: '100' }} onClick={() => setIsOpen(false)} open={isOpen}>
            <Box sx={{ width: '16rem', minHeight: '100%', backgroundColor: "#252422" }} role="presentation" onClick={() => setIsOpen(false)}>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        p: '2rem 2rem 2rem 1rem'
                    }}
                >
                    {navElements.map(elem => (
                        <NavElement key={nanoid()} title={elem.title} onClick={elem.onClick} Icon={elem.Icon} active={active == elem.type} />
                    ))}
                </Box>
            </Box>
        </Drawer>
    );
}

const NavElement = ({ title, Icon, onClick, active }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                p: '.8rem .5rem',
                borderRadius: '1rem',
                ...(active ? {
                    backgroundColor: '#CCC5B915',
                    border: '1px solid #EB5E28',
                } : {
                    border: '1px solid #CCC5B9',
                }),
                cursor: 'pointer',
                transition: '.3s ease',
                '&:hover': {
                    backgroundColor: '#CCC5B915'
                },
                '&:active': {
                    backgroundColor: '#CCC5B925'
                },
            }}
            onClick={onClick}
        >
            <Icon
                sx={{
                    ...(active ? {
                        color: '#EB5E28',
                    } : {
                        color: '#CCC5B9',
                    }),
                }}
            />
            <Typography
                sx={{
                    ...(active ? {
                        color: '#EB5E28',
                    } : {
                        color: '#CCC5B9',
                    }),
                }}
            >{title}</Typography>
        </Box>
    );
}

export default NavComponent;