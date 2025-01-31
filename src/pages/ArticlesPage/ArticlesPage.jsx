import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton, FormHelperText } from "@mui/material";
import { nanoid } from "nanoid";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { useArticles } from "./store";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchField from "../../components/SearchField/SearchField";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from ".././AuthPage/store";
import axios from "axios";

const ArticlesPage = () => {
    const { articles, setArticles, filterParam, setFilterParam } = useArticles();
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGetArticles = async () => {
            await axios.get('https://vanopoizonserver.ru/admin_dashboard/getArticles', {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => setArticles(response.data.articles))
                .catch(err => {
                    console.log(err);
                })
        }

        if (token.length === 0) navigate('/auth');
        else {
            fetchGetArticles();
        }
    }, []);

    return (
        <Box>
            <TopNavigation title={'Статьи'}>
                <SearchField label="Поиск по статьям" onSearch={(data) => setFilterParam(data)} onBreak={() => setFilterParam('')} />
                <AddNewArticle />
            </TopNavigation>

            <Box
                sx={{
                    m: '2rem',
                    display: 'flex',
                    gap: '2rem',
                    minHeight: '92vh',
                    maxWidth: 'calc(100vw - 2rem)',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '25%',
                        minWidth: '25%',
                        minHeight: '92vh',
                        maxHeight: '92vh',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        // overflowY: 'auto',
                    }}
                >
                    {articles.length > 0 ? (
                        articles
                            .filter(elem => elem.title.toLowerCase().includes(filterParam.toLowerCase()) || elem.articleId.toString().includes(filterParam) || elem.date.includes(filterParam))
                            .map(elem => <ArcticleElement article={elem} key={nanoid()} />)
                    ) : (
                        <Typography
                            sx={{
                                fontSize: '1.2rem',
                                fontWeight: '400',
                                color: "#25242250"
                            }}
                        >Ты еще не создал ни одну статью</Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        position: "sticky",
                        top: '6rem',
                        right: '2rem',
                        maxHeight: '0vh',
                        minWidth: '70%',
                    }}
                >
                    <CurrentArticleContainer />
                </Box>
            </Box>
        </Box >
    );
}

const CurrentArticleContainer = () => {
    const { token } = useAuth();
    const { currentArticle, currentFile, setCurrentFile, removeArticle, saveArticle, setCurrentArticleField } = useArticles();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        (currentArticle?.type) ? (
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '80vh',
                    gap: '2rem'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 900,
                            borderBottom: '1px solid #CCC5B9',
                            pb: '1rem'
                        }}
                    >Статья <span
                        style={{
                            fontWeight: 600,
                            color: '#25242280'
                        }}
                    >{currentArticle.articleId}</span></Typography>
                    <Box>
                        <FormControl variant="standard" sx={{ minWidth: '10rem' }}>
                            <InputLabel id="staus-label">Тип статьи</InputLabel>
                            <Select
                                labelId="status-label"
                                value={currentArticle.type}
                                onChange={(e) => {
                                    setCurrentArticleField('type', e.target.value)
                                }}
                            >
                                <MenuItem value={'small'}>маленькая</MenuItem>
                                <MenuItem value={'big'}>большая</MenuItem>
                            </Select>
                            <FormHelperText>Выбери тип статьи</FormHelperText>
                        </FormControl>
                    </Box>

                    <Box>
                        <TextField
                            variant="outlined"
                            label="Название статьи"
                            size="small"
                            value={currentArticle.title}
                            onChange={(e) => setCurrentArticleField('title', e.target.value)}
                            helperText="Это название будешь видеть только ты"
                            sx={{
                                minWidth: '25rem'
                            }}
                        />
                    </Box>

                    <Box>
                        <TextField
                            variant="outlined"
                            helperText=" "
                            size="small"
                            label="Ссылка на статью"
                            value={currentArticle.link}
                            onChange={(e) => setCurrentArticleField('link', e.target.value)}
                            sx={{
                                minWidth: '25rem'
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem'
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => saveArticle(currentArticle, token)}
                            color="success"
                            sx={{
                                p: '.6rem 1rem',
                                alignSelf: 'start',
                                fontSize: '1rem'
                            }}
                        >
                            сохранить
                        </Button>

                        <Button
                            startIcon={<DeleteIcon />}
                            color="error"
                            variant="contained"
                            onClick={() => removeArticle(currentArticle.articleId, token)}
                            sx={{
                                p: '.6rem 1rem',
                                alignSelf: 'start',
                                fontSize: '1rem'
                            }}
                        >
                            удалить
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: 'start',
                            gap: '1rem',
                            pb: '.5rem',
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: '1rem',
                                backgroundColor: '#CCC5B930',
                                backgroundImage: `url(${currentArticle.photoUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                ...(currentArticle.type == 'small' ? {
                                    minHeight: '12rem',
                                    maxHeight: '12rem',
                                    minWidth: '12rem',
                                    maxWidth: '12rem',
                                } : {
                                    minHeight: '18rem',
                                    maxHeight: '18rem',
                                    minWidth: '12rem',
                                    maxWidth: '12rem',
                                }),
                                border: '1px solid #CCC5B9'
                            }}
                        >
                        </Box>

                        <Button
                            component="label"
                            role={undefined}
                            variant="text"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                p: '.6rem 1rem',
                                fontSize: '1rem'
                            }}
                        >
                            Загрузить превью
                            <VisuallyHiddenInput
                                accept="image/*"
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if (file) {
                                        const reader = new FileReader();

                                        reader.onload = (e) => {
                                            setCurrentArticleField('photoUrl', e.target.result);
                                        };

                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </Button>
                    </Box>
                </Box>
            </Box>
        ) : (
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography
                    sx={{
                        maxWidth: '30rem',
                        fontSize: '1.7rem',
                        fontWeight: '400',
                        color: "#25242250"
                    }}
                >Выбери одну из статей слева, чтобы отредактировать или удалить её</Typography>
            </Box>
        )
    );
}

const ArcticleElement = ({ article }) => {
    const { setCurrentArticle } = useArticles();

    return (
        <Box
            onClick={() => setCurrentArticle(article.articleId)}
            sx={{
                borderRadius: '1rem',
                p: '1rem',
                boxShadow: '0px 0px 8px 0px rgba(37, 36, 34, 0.10)',
                cursor: 'pointer',
                transition: '.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                justifyContent: 'space-between',
                '&:hover': {
                    backgroundColor: '#25242210',
                },
                '&:active': {
                    backgroundColor: '#25242230',
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '1rem',
                        backgroundImage: `url(${article.photoUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '5rem',
                        maxHeight: '5rem',
                        minWidth: '5rem',
                        maxWidth: '5rem',
                    }}
                ></Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem',
                        alignItems: 'start'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: 500
                        }}
                    >{article.title}</Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1.5rem',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '.9rem',
                                fontWeight: 600,
                                color: '#25242280'
                            }}
                        >{new Date(article?.updatedAt).toLocaleString()}</Typography>

                        <Typography
                            sx={{
                                backgroundColor: '#25242210',
                                p: '3px 6px',
                                borderRadius: '.5rem',
                                fontSize: '.9rem',
                                fontWeight: 600,
                                color: '#25242280'
                            }}
                        >{article.articleId}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const AddNewArticle = () => {
    const { setCurrentArticle, setCurrentArticleField } = useArticles();

    return (
        <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setCurrentArticle(nanoid(8))}
            sx={{
                p: '.6rem 1rem',
                fontSize: '1rem'
            }}
        >
            Создать новую
        </Button>
    );
}

export default ArticlesPage;