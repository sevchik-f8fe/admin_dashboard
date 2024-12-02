import { Box, Typography, Button, Drawer } from "@mui/material";
import { nanoid } from "nanoid";

import OrderPage from "./OrderComponent/OrderPage";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { useOrderPage } from "./store";
import SearchField from "../../components/SearchField/SearchField";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from ".././AuthPage/store";

const OrdersPage = () => {
    const { orderOpen, setOrderOpen, setFilterParam } = useOrderPage();

    const orders = [
        { status: 'new', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'new', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'inProccess', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'inProccess', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'finished', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'finished', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'new', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'new', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'inProccess', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'inProccess', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'finished', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'finished', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'new', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'new', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'inProccess', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'inProccess', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'finished', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
        { status: 'finished', fullname: 'Семйн Отов Игоревич', date: '12.02.23', id: '12345676542' },
    ]

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate('/auth');
    });

    return (

        <Box>
            <TopNavigation title={'Заказы'}>
                <SearchField label="Поиск по заказам" onSearch={(data) => setFilterParam(data)} onBreak={() => setFilterParam('')} />
            </TopNavigation>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'start',
                    py: '1rem'
                }}
            >
                {[{ title: 'Поступившие', status: 'new' }, { title: 'В процессе', status: 'inProccess' }, { title: 'Завершенные', status: 'finished' }]
                    .map((elem, id) => (
                        <ColumnContainer key={nanoid()} title={elem.title} orders={orders.filter(order => elem.status == order.status)} />
                    ))}
            </Box>

            <Drawer anchor={'right'} open={orderOpen} onClose={() => setOrderOpen(false)}>
                <OrderPage />
            </Drawer>
        </Box>
    );
}

const ColumnContainer = ({ title, orders }) => {
    const { setFilterParam, filterParam } = useOrderPage();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'start'
            }}
        >
            <Typography
                sx={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    mb: '3rem',
                    pt: "2rem",
                    color: "#CCC5B9",
                    borderBottom: '1px solid #CCC5B9'
                }}
            >{title}</Typography>

            {orders
                .filter(elem => elem.fullname.toLowerCase().includes(filterParam.toLowerCase()) || elem.id.toString().includes(filterParam) || elem.date.includes(filterParam))
                .map(elem => <OrderElement key={nanoid()} orderId={elem.id} fullname={elem.fullname} date={elem.date} status={elem.status} />)}
        </Box>
    );
}

const OrderElement = ({ fullname, date, orderId }) => {
    const { setOrderOpen } = useOrderPage();

    return (
        <Box
            sx={{
                boxShadow: '0px 0px 10px 0px rgba(37, 36, 34, 0.05)',
                // border: '1px solid #CCC5B9',
                borderRadius: '1rem',
                p: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 700
                    }}
                >{fullname}</Typography>

                <Box
                    sx={{
                        backgroundColor: '#EB5E2820',
                        p: '.3rem .5rem .2rem .3rem',
                        borderRadius: ".5rem"
                    }}
                >
                    <Typography
                        sx={{
                            color: '#EB5E28',
                            fontSize: '1rem',
                            fontWeight: 600
                        }}
                    >{date}</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: '3rem',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        alignSelf: 'start',
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
                    >{orderId}</Typography>
                </Box>

                <Button
                    onClick={() => setOrderOpen(true)}
                    sx={{
                        fontSize: '1rem'
                    }}
                    variant="outlined"
                >Подробнее</Button>
            </Box>
        </Box>
    );
}

export default OrdersPage;