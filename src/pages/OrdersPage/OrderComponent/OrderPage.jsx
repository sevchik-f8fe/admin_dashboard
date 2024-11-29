import { Box, Typography, FormHelperText, FormControl, InputLabel, MenuItem, Select, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Collapse, } from "@mui/material";
import { nanoid } from "nanoid";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import TelegramIcon from '@mui/icons-material/Telegram';
import PlaceIcon from '@mui/icons-material/Place';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LinkIcon from '@mui/icons-material/Link';

import { useOrder } from "./store";

const OrderPage = ({ order }) => {
    const { customerInfoOpen, setCustomerInfoOpen, statusOrder, setStatusOrder } = useOrder();

    return (
        <Box
            sx={{
                p: '2rem',
                display: 'flex',
                gap: '2rem',
                alignItems: 'start'
            }}
        >
            <ContentContainer title={'Информация о заказе'}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: "start",
                        gap: '1rem',
                        mt: "1rem",
                        minWidth: '25rem',
                        maxWidth: '25rem',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: "center",
                            gap: '2rem',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: '#25242210',
                                p: '.3rem .5rem .2rem .3rem',
                                borderRadius: ".5rem"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#252422',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                            >12345676542</Typography>
                        </Box>

                        <Typography
                            sx={{
                                color: '#252422',
                                fontSize: '1.5rem',
                                fontWeight: 500
                            }}
                        >170123 руб.</Typography>
                    </Box>

                    <FormControl variant="standard" sx={{ minWidth: '15rem' }}>
                        <InputLabel id="staus-label">Статус заказа</InputLabel>
                        <Select
                            labelId="status-label"
                            value={statusOrder}
                            onChange={(e) => setStatusOrder(e.target.value)}
                        >
                            <MenuItem value={'underConsider'}>На рассмотрении</MenuItem>
                            <MenuItem value={'transferChn'}>Передан в доставку в Китае</MenuItem>
                            <MenuItem value={'transferRus'}>Прибыл в Росиию</MenuItem>
                            <MenuItem value={'transferCity'}>Прибыл в город получателя</MenuItem>
                            <MenuItem value={'ready'}>Готов к выдаче</MenuItem>
                            <MenuItem value={'done'}>Получен</MenuItem>
                        </Select>
                        <FormHelperText>Этот статус будет отображаться у покупателя</FormHelperText>
                    </FormControl>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.1rem'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                color: '#252422'
                            }}
                        ><span style={{ fontWeight: '700', }}>Тип доставки:</span> курьер</Typography>
                        <Typography
                            sx={{
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                color: '#252422'
                            }}
                        ><span style={{ fontWeight: '700', }}>Адрес:</span> 11512 Россия, Новгородская обл., г. Пестово, д. 14, кв. 95</Typography>
                    </Box>

                    <List
                        sx={{
                            mt: '2rem'
                        }}
                        subheader={
                            <Typography
                                sx={{
                                    color: '#25242280',
                                    fontWeight: 700,
                                    fontSize: '1rem'
                                }}
                            >
                                Товары в заказе
                            </Typography>
                        }
                    >
                        {[1, 2].map(elem => (
                            <>
                                <ListItem sx={{
                                    borderBottom: '1px solid #CCC5B9', mb: ".5rem", pb: 0
                                }}>
                                    <ListItemText primaryTypographyProps={{ fontWeight: 600, fontSize: '1.2rem' }} primary="Nike Air Force" />
                                </ListItem >
                                <Collapse in={true} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem sx={{ pl: '2rem', py: 0 }}>
                                            <ListItemIcon>
                                                <Typography sx={{ pr: '.5rem' }}>Цвет:</Typography>
                                            </ListItemIcon>
                                            <ListItemText primary="белый" />
                                        </ListItem>
                                        <ListItem sx={{ pl: '2rem', py: 0 }}>
                                            <ListItemIcon>
                                                <Typography sx={{ pr: '.5rem' }}>Размер:</Typography>
                                            </ListItemIcon>
                                            <ListItemText primary="42" />
                                        </ListItem>
                                        <ListItem sx={{ pl: '2rem', py: 0 }}>
                                            <ListItemIcon>
                                                <Typography sx={{ pr: '.5rem' }}>Количество:</Typography>
                                            </ListItemIcon>
                                            <ListItemText primary="1" />
                                        </ListItem>
                                        <ListItem sx={{ pl: '2rem', py: 0 }}>
                                            <ListItemIcon>
                                                <Typography sx={{ pr: '.5rem' }}>Стоимость за 1 шт. в Poizon:</Typography>
                                            </ListItemIcon>
                                            <ListItemText primary="6123 руб." />
                                        </ListItem>
                                        <ListItem sx={{ pl: '2rem', py: 0 }}>
                                            <ListItemIcon>
                                                <Typography sx={{ pr: '.5rem' }}>Итоговая стоимость:</Typography>
                                            </ListItemIcon>
                                            <ListItemText primary="8123 руб." />
                                        </ListItem>
                                        <a href="https://google.com" target="_blank" style={{ textDecoration: 'none' }}>
                                            <ListItemButton sx={{ pl: '2rem', borderRadius: '1rem', py: '.25rem' }}>
                                                <ListItemIcon>
                                                    <LinkIcon />
                                                </ListItemIcon>
                                                <ListItemText primaryTypographyProps={{ fontWeight: 600, color: '#7371fc' }} primary="Этот товар в Poizon" />
                                            </ListItemButton>
                                        </a>
                                    </List>
                                </Collapse>
                            </>
                        ))}
                    </List>
                </Box>
            </ContentContainer>

            <ContentContainer title={'Информация о покупателе'}>
                <Box
                    sx={{
                        minWidth: '25rem',
                        maxWidth: '25rem',
                    }}
                >
                    <List>
                        {[
                            { title: 'семен олегов викторович', Icon: <PersonIcon /> },
                            { title: '+79999999999', Icon: <PhoneIcon /> },
                            { title: '@pooooaaaaaaaaa', Icon: <TelegramIcon /> },
                            { title: 'Новгородская область, г. Пестово', Icon: <PlaceIcon /> }
                        ].map(elem => (
                            <ListItem key={nanoid()} disablePadding>
                                <ListItemIcon>
                                    {elem.Icon}
                                </ListItemIcon>
                                <ListItemText primary={elem.title} />
                            </ListItem>
                        ))}
                        <ListItemButton sx={{ borderRadius: '1rem', border: '1px solid #CCC5B9', py: '.25rem', my: '.5rem' }} onClick={setCustomerInfoOpen}>
                            <ListItemIcon>
                                <MoreHorizIcon />
                            </ListItemIcon>
                            <ListItemText primary="Подробнее" />
                            {customerInfoOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={customerInfoOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem sx={{ pl: '2rem', py: 0 }}>
                                    <ListItemIcon>
                                        <Typography sx={{ pr: '.5rem' }}>Дата регистрации:</Typography>
                                    </ListItemIcon>
                                    <ListItemText primary="12.05.24" />
                                </ListItem>
                                <ListItem sx={{ pl: '2rem', py: 0 }}>
                                    <ListItemIcon>
                                        <Typography sx={{ pr: '.5rem' }}>Заказов совершено:</Typography>
                                    </ListItemIcon>
                                    <ListItemText primary="12" />
                                </ListItem>
                                <ListItem sx={{ pl: '2rem', py: 0 }}>
                                    <ListItemIcon>
                                        <Typography sx={{ pr: '.5rem' }}>Общ. сумма выкупа:</Typography>
                                    </ListItemIcon>
                                    <ListItemText primary="240123 руб." />
                                </ListItem>
                                <ListItem sx={{ pl: '2rem', py: 0 }}>
                                    <ListItemIcon>
                                        <Typography sx={{ pr: '.5rem' }}>Ср. стоимость 1 заказа:</Typography>
                                    </ListItemIcon>
                                    <ListItemText primary="20123 руб." />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </ContentContainer>
        </Box >
    );
}

const ContentContainer = ({ title, children }) => {
    return (
        <Box
            sx={{
                p: '1rem',
                borderRadius: '1rem',
                boxShadow: '0px 0px 10px 0px rgba(37, 36, 34, 0.15)',
            }}
        >
            <Typography
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    borderBottom: '1px solid #CCC5B9',
                    pb: '.5rem',
                    mb: '.5rem',
                    pr: '2rem'
                }}
            >{title}</Typography>

            {children}
        </Box>
    );
}

export default OrderPage;