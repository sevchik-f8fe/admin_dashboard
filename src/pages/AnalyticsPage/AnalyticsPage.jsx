import { Box, Typography, FormControl, InputLabel, MenuItem, Select, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { nanoid } from "nanoid";

const AnalyticsPage = () => {
    const pickTimeData = [
        { title: 'за неделю', value: 'weekly' },
        { title: 'за месяц', value: 'monthly' },
        { title: 'за 3 месяца', value: 'seasonly' },
        { title: 'за 6 месяцев', value: 'halfYearly' },
        { title: 'за год', value: 'yearly' },
        { title: 'за всё время', value: 'allTime' }
    ];

    const liqidData = [
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
        { title: 'nike air force', count: '1223' },
    ];

    const dataNPU = [
        {
            name: 'январь',
            value: 12,
        },
        {
            name: 'февраль',
            value: 14,
        },
        {
            name: 'март',
            value: 15,
        },
        {
            name: 'апрель',
            value: 16,
        },
        {
            name: 'май',
            value: 18,
        },
        {
            name: 'июнь',
            value: 21,
        },
        {
            name: 'июль',
            value: 12,
        },
        {
            name: 'август',
            value: 11,
        },
        {
            name: 'сентябрь',
            value: 16,
        },
        {
            name: 'октябрь',
            value: 31,
        },
        {
            name: 'ноябрь',
            value: 14,
        },
        {
            name: 'декабрь',
            value: 19,
        },
    ];

    const dataPSP = [
        { time: 'за неделю', money: 12345 },
        { time: 'за месяц', money: 12345 },
        { time: 'за 3 месяца', money: 12345 },
        { time: 'за 6 месяцев', money: 12345 },
        { time: 'за год', money: 12345 },
        { time: 'за все время', money: 12345 },
    ];

    return (
        <Box>
            <TopNavigation title={'Аналитика'} />

            <Box
                sx={{
                    display: 'flex',
                    m: '2rem',
                    gap: '1rem',
                    alignItems: 'start',
                    flexWrap: 'wrap'
                }}
            >
                <AContainer title="SLT" subtitle="самые ликвидные товары">
                    <PickTime data={pickTimeData} />
                    <LiqidItems data={liqidData} />
                </AContainer>
                <AContainer title="NPU" subtitle="количество новых пользователей">
                    <NPUCotainer data={dataNPU} />
                </AContainer>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <AContainer title="ARPU" subtitle="средний доход с одного пользователя ">
                        <ARPUContainer AOV={12345} ARPU={12345} />
                    </AContainer>
                    <AContainer title="PSP" subtitle="доходы за период">
                        <PSPContainer data={dataPSP} />
                    </AContainer>
                </Box>
            </Box>
        </Box>
    );
}

const AContainer = ({ title, subtitle, children }) => {
    return (
        <Box
            sx={{
                borderRadius: '1rem',
                p: '1rem',
                boxShadow: '0px 0px 10px 0px rgba(37, 36, 34, 0.15)',
            }}
        >
            <Typography
                sx={{
                    lineHeight: '.75',
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    mb: '1rem'
                }}
            >{title} <br /> <span style={{ color: '#25242250', fontSize: '.8rem', fontWeight: 500 }}>*{subtitle}</span> </Typography>
            {children}
        </Box>
    );
}

const PickTime = ({ value, onChange, data }) => {
    return (
        <FormControl variant="standard" sx={{ minWidth: '12rem' }}>
            <InputLabel id="staus-label">Промежуток времени</InputLabel>
            <Select
                labelId="status-label"
                value={value}
                onChange={onChange}
            >
                {data.map(elem => <MenuItem value={elem.value} key={nanoid()}>{elem.title}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

const LiqidItems = ({ data }) => {
    return (
        <TableContainer
            sx={{
                mt: '1rem'
            }}
            component={Paper}
        >
            <Table sx={{ minWidth: '12rem' }}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontWeight: '600',
                                color: '#25242260'
                            }}
                        >Наименование</TableCell>
                        <TableCell
                            sx={{
                                fontWeight: '600',
                                color: '#25242260'
                            }}
                            align="right"
                        >Количество проданного товара</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((elem) => (
                        <TableRow
                            key={nanoid()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {elem.title}
                            </TableCell>
                            <TableCell align="right">{elem.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const ARPUContainer = ({ ARPU, AOV }) => {
    return (
        <TableContainer
            sx={{
                mt: '1rem'
            }}
            component={Paper}
        >
            <Table sx={{ minWidth: '12rem' }}>
                <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            sx={{
                                fontWeight: '600',
                                color: '#25242260'
                            }}
                            component="th"
                            scope="row"
                        >
                            Средний объем продаж на одного пользователя:
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: '500',
                                color: '#252422',
                                fontSize: '1rem'
                            }}
                        >{AOV} руб.</TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            sx={{
                                fontWeight: '600',
                                color: '#25242260'
                            }}
                            component="th"
                            scope="row"
                        >
                            Средний доход с одного пользователя:
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: '500',
                                color: '#252422',
                                fontSize: '1rem'
                            }}
                        >{ARPU} руб.</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const NPUCotainer = ({ data }) => {
    const CustomWindLabel = ({ x, y, value }) => {
        return (
            <text x={x} y={y} dy={-10} fontFamily="Inter" fill={"#25242280"} fontSize={16} textAnchor="middle">
                {value}
            </text>
        );
    }

    return (
        <Box>
            <LineChart
                width={800}
                height={400}
                data={data}
                margin={{
                    top: 25,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Line label={<CustomWindLabel />} type="monotone" dataKey="value" stroke="#EB5E28" />
            </LineChart>

            <Typography
                sx={{
                    mt: '1rem',
                    fontWeight: '600',
                    color: '#25242280'
                }}
            >В среднем за месяц: {12234}</Typography>
        </Box>
    );
}

const PSPContainer = ({ data }) => {
    return (
        <TableContainer
            sx={{
                mt: '1rem'
            }}
            component={Paper}
        >
            <Table sx={{ minWidth: '12rem' }}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontWeight: '600',
                                color: '#25242260'
                            }}
                        >Период</TableCell>
                        <TableCell
                            sx={{
                                fontWeight: '600',
                                color: '#25242260'
                            }}
                            align="right"
                        >Доход</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((elem) => (
                        <TableRow
                            key={nanoid()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {elem.time}
                            </TableCell>
                            <TableCell align="right">{elem.money} руб.</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AnalyticsPage;