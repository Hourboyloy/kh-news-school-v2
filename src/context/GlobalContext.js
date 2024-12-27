"use client"; // Enable client-side rendering for context

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Create the context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const router = useRouter();

  const [newestArticles, setNewestArticles] = useState([]);
  const [newsByCategoryInHome, setNewsByCategoryInHome] = useState({
    entertainment: [],
    sports: [],
    technology: [],
    lifes: [],
  });
  const [isLoading, setLoading] = useState(false);
  const [LengthOfCategories, setLengthOfCategories] = useState({
    lengthOfEntertainment: 0,
    lengthOfSports: 0,
    lengthOfLifes: 0,
    lengthOfTechnology: 0,
  });
  const [popularArticles, setPopularArticles] = useState([]);

  // data of all pages categories
  const [sports, setSports] = useState([]);
  const [entertainments, setEntertainments] = useState([]);
  const [lifes, setLifes] = useState([]);
  const [technology, setTechnology] = useState([]);

  // end index of all categories
  const [endIndexForSports, setEndIndexForSports] = useState(23);
  const [endIndexForEntertainments, setEndIndexForEntertainments] =
    useState(23);
  const [endIndexForlifes, setEndIndexForlifes] = useState(23);
  const [endIndexForTechnology, setEndIndexForTechnology] = useState(23);

  // current pagenation of categories
  const [currentPageSport, setCurrentPagePageSport] = useState(0);
  const [currentPageTechnology, setCurrentPagePageTechnology] = useState(0);
  const [currentPageLife, setCurrentPagePageLife] = useState(0);
  const [currentPageEntertainment, setCurrentPagePageEntertainment] =
    useState(0);
  const [currentPageReligion, setCurrentPagePageReligion] = useState(0);

  // manage acc
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  // Handle login logic
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin");
    if (loginStatus === "1") {
      const userToken =
        localStorage.getItem("user_access_token") ||
        localStorage.getItem("admin_access_token");
      const userData = JSON.parse(localStorage.getItem("user"));
      setIsLogin(true);
      setUser(userData);
      setToken(userToken);
    }
  }, []);

  const handleClearStorage = () => {
    localStorage.clear();
    setIsLogin(false);
    setUser(null);
    setToken(null);
    router.push("/");
  };

  const handleSetLogin = (user, token) => {
    setIsLogin(true);
    setUser(user);
    setToken(token);
  };

  // manage data
  const handleGetCountLengthOfCategories = async () => {
    try {
      // Check for cached data
      const cachedData = JSON.parse(localStorage.getItem("categoriesCache"));

      if (cachedData) {
        setLengthOfCategories(cachedData.lengthOfCategories);
        setPopularArticles(cachedData.popularArticles);
      }
      // Fetch fresh data from the API
      const res = await axios.get(
        "https://api-news-dot-school-version2.vercel.app/api/get-length-categories-popular-news"
      );

      if (res.status == 200) {
        const {
          lengthOfEntertainment,
          lengthOfSports,
          lengthOfLifes,
          lengthOfTechnology,
          popularNews,
        } = res.data;

        // Update state
        setLengthOfCategories({
          lengthOfEntertainment,
          lengthOfSports,
          lengthOfLifes,
          lengthOfTechnology,
        });
        setPopularArticles(popularNews);

        // Cache the data
        localStorage.setItem(
          "categoriesCache",
          JSON.stringify({
            lengthOfCategories: {
              lengthOfEntertainment,
              lengthOfSports,
              lengthOfLifes,
              lengthOfTechnology,
            },
            popularArticles: popularNews,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetByCategoriesInHome = async () => {
    try {
      // Check for cached data
      const cachedNewestArticles = JSON.parse(
        localStorage.getItem("newestArticles")
      );
      const cachedCategories = JSON.parse(localStorage.getItem("categories"));

      if (cachedNewestArticles && cachedCategories) {
        // Use cached data immediately for faster response
        setNewestArticles(cachedNewestArticles);
        setNewsByCategoryInHome(cachedCategories);
      } else {
        setLoading(true);
      }

      // Fetch updated data from the server
      const res = await axios.get(
        "https://api-news-dot-school-version2.vercel.app/api/categories-home"
      );

      if (res.status === 200) {
        const { newestArticles, categories } = res.data;

        // Update states if the data has changed
        setNewestArticles(newestArticles);
        setNewsByCategoryInHome({
          entertainment: categories.entertainment,
          sports: categories.sports,
          lifes: categories.lifes,
        });

        // Update the cache
        localStorage.setItem("newestArticles", JSON.stringify(newestArticles));
        localStorage.setItem("categories", JSON.stringify(categories));

        // Additional processing
        await handleGetCountLengthOfCategories();
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetByCategoriesInHome();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        LengthOfCategories,
        isLoading,
        isLogin,
        setIsLogin,
        handleClearStorage,
        handleSetLogin,
        token,
        user,
        setUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        newestArticles,
        popularArticles,
        newsByCategoryInHome,

        

        // handle categories
        sports,
        setSports,
        setEndIndexForSports,
        endIndexForSports,

        setEntertainments,
        entertainments,
        setEndIndexForEntertainments,
        endIndexForEntertainments,

        lifes,
        setLifes,
        endIndexForlifes,
        setEndIndexForlifes,

        technology,
        setTechnology,
        endIndexForTechnology,
        setEndIndexForTechnology,


        // current pagenation ===============================
        currentPageSport,
        setCurrentPagePageSport,

        currentPageTechnology,
        setCurrentPagePageTechnology,

        currentPageLife,
        setCurrentPagePageLife,

        currentPageEntertainment,
        setCurrentPagePageEntertainment,

        currentPageReligion,
        setCurrentPagePageReligion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for consuming the global state
export const useGlobalContext = () => useContext(GlobalContext);