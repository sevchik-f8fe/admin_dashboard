import axios from "axios";
import { create } from "zustand";

export const useArticles = create((set) => ({
    articles: [],
    filterParam: '',
    currentArticle: {},

    setArticles: (data) => set(() => {
        return { articles: data }
    }),
    setFilterParam: (value) => set(() => {
        return { filterParam: value }
    }),
    setCurrentArticle: (id) => set((state) => {
        const ca = state.articles.find(elem => elem.articleId == id);

        if (ca) {
            console.log('sca change ', id);
            return { currentArticle: ca }
        } else {
            console.log('sca add new', id);
            return {
                currentArticle: { articleId: id, title: '', updatedAt: new Date().toLocaleString(), link: '', photoUrl: '', type: 'small' },
            }
        }
    }),

    saveArticle: (article, token) => set((state) => {
        const fetchSaveArticle = async () => {

            const fd = new FormData();
            fd.append("image", state.currentArticle.photoUrl.split(',')[1]);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.imageban.ru/v1");
            xhr.responseType = 'json';
            xhr.setRequestHeader('Authorization', `TOKEN ${import.meta.VITE_IMG_KEY}`);
            xhr.send(fd);
            xhr.onload = () => {
                axios.post('https://vanopoizonserver.ru/admin_dashboard/addArticle',
                    {
                        title: article.title,
                        photoUrl: xhr?.response?.data?.link || state.currentArticle.photoUrl,
                        link: article.link,
                        type: article.type,
                        articleId: article.articleId,
                    },
                    {
                        headers: {
                            'authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                )
                    .then(res => console.log('ok'))
                    .catch(err => console.log(err))
            };
        }

        fetchSaveArticle();

        const oldArticles = state.articles.filter(elem => elem.articleId != article.articleId);
        return { articles: [article, ...oldArticles] }
    }),
    setCurrentArticleField: (field, value) => set((state) => {
        return { currentArticle: { ...state.currentArticle, [field]: value } }
    }),
    removeArticle: (articleId, token) => set((state) => {
        const fetchRemoveArticle = async () => {
            await axios.post('https://vanopoizonserver.ru/admin_dashboard/removeArticle',
                {
                    articleId: articleId,
                },
                {
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then(res => console.log('ok'))
                .catch(err => console.log(err))
        }

        fetchRemoveArticle();

        const newArticles = state.articles.filter(elem => elem.articleId != articleId);
        return { articles: newArticles, currentArticle: {} }
    }),
}))