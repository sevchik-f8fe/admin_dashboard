import { create } from "zustand";

export const useArticles = create((set) => ({
    articles: [
        { id: 1213112123, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://s3.stroi-news.ru/img/kartinki-lisenka-2.jpg', type: 'small' },
        { id: 212312412, title: 'Как приручить бычка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'large' },
        { id: 3134132244, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'large' },
        { id: 1241341344, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'small' },
        { id: 53423123, title: 'Как приручить тигра в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'large' },
        { id: 6123432412, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'small' },
        { id: 1243423127, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://s3.stroi-news.ru/img/kartinki-lisenka-2.jpg', type: 'small' },
        { id: 824135523, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'large' },
        { id: 9555473683, title: 'Как приручить утконоса в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'large' },
        { id: 13762856560, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'small' },
        { id: 13568343441, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'large' },
        { id: 1457686882, title: 'Как приручить лисенка в Poizon?', date: '12.12.24', telegraphLink: 'https://link', previewUrl: 'https://masterpiecer-images.s3.yandex.net/d43b22c0a03411eebdcd0a0d9f74bed2:upscaled', type: 'small' },
    ],
    filterParam: '',
    currentArticle: {},
    currentArticleCopy: {},
    setArticles: (data) => set((state) => {
        return { articles: [...state.articles, ...data] }
    }),
    setFilterParam: (value) => set((state) => {
        return { filterParam: value }
    }),
    setCurrentArticle: (articleId) => set((state) => {
        const ca = state.articles.find(elem => elem.id == articleId);

        if (ca) {
            console.log('change ' + articleId);
            return { currentArticle: ca, currentArticleCopy: ca }
        } else {
            const today = new Date();

            const day = today.getDate().toString().padStart(2, '0');
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const year = today.getFullYear();

            console.log('add ' + articleId);
            return { currentArticle: { id: articleId, title: '', date: new Date().toLocaleString(), telegraphLink: '', previewUrl: '', type: 'small' }, currentArticleCopy: { id: articleId, title: '', date: `${day}.${month}.${year}`, telegraphLink: '', previewUrl: '', type: 'small' } }
        }
    }),
    saveArticle: (article) => set((state) => {
        const oldArticles = state.articles.filter(elem => elem.id != article.id);
        return { articles: [article, ...oldArticles] }
    }),
    setCurrentArticleField: (field, value) => set((state) => {
        return { currentArticleCopy: { ...state.currentArticleCopy, [field]: value } }
    }),
    addArticle: (article) => set((state) => {
        return { articles: [...state.articles, article] }
    }),
    removeArticle: (articleId) => set((state) => {
        const newArticles = state.articles.filter(elem => elem.id != articleId);
        return { articles: newArticles, currentArticle: {}, currentArticleCopy: {} }
    }),
}))