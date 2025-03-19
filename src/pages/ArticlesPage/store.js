import axios from "axios";
import { create } from "zustand";
import { VITE_IMG_KEY } from "../../utils/key"

export const useArticles = create((set, get) => ({
    articles: [],
    filterParam: '',
    currentArticle: {},
    isLoading: false,
    error: { message: '' },

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
                currentArticle: { articleId: id, title: '', updatedAt: new Date(), link: '', photoUrl: '', type: 'small' },
            }
        }
    }),
    saveArticle: async (article, token) => {
        if (article.title.length == 0) {
            set({ isLoading: false, error: { message: 'title' } });
            return;
        }
        if (article.link.length == 0) {
            set({ isLoading: false, error: { message: 'link' } });
            return;
        }
        if (article.photoUrl.length == 0) {
            set({ isLoading: false, error: { message: 'photoUrl' } });
            return;

        }

        const oldArticles = get().articles.filter(elem => elem.articleId != article.articleId);
        set({
            articles: [article, ...oldArticles],
        });

        set({ isLoading: true, error: { message: '' } });

        try {
            let imageUrl = await get().currentArticle.photoUrl;

            if (!imageUrl.startsWith('https://')) {
                const fd = new FormData();
                fd.append("image", get().currentArticle.photoUrl.split(',')[1]);

                const imageBanData = await axios.post('https://api.imageban.ru/v1', fd, {
                    headers: {
                        'Authorization': `TOKEN ${VITE_IMG_KEY}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((res) => res.data)
                    .catch((err) => console.log(err));

                imageUrl = imageBanData?.data?.link;
            }

            await axios.post('https://vanopoizonserver.ru/admin_dashboard/addArticle',
                {
                    title: article.title,
                    photoUrl: imageUrl,
                    link: article.link,
                    type: article.type,
                    articleId: article.articleId,
                },
                {
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .catch((e) => console.log('ne tut: ', e))

            set({ isLoading: false, });

        } catch (error) {
            console.error('Error saving article:', error);
            set({
                error: { message: 'Failed to save article' },
                isLoading: false,
            });
        }
    },
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