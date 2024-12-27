import axios from "axios";

export const getArticleById = async (id) => {
  try {
    const res = await axios.get(
      `https://api-news-dot-school.vercel.app/api/getone/${id}`
    );
    if (res.status === 200) {
      return res.data.news;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getArticlesByCategory = (articles, category) => {
  return articles.filter((item) => item.category === category);
};
