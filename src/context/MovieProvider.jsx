import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = async (URL,currentPage) => {
    setLoading(true);
    try {
      let data = await axios.get(`${URL}&page=${currentPage}`);
      // console.log(data.data.results);
      // console.log(data.data);
      setMovies(data.data.results);
      setTotalPages(data.data.total_pages)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(FEATURED_API,currentPage);
  }, [currentPage]);

  return (
    <MovieContext.Provider value={{ movies, loading, getMovies, setCurrentPage,totalPages, currentPage }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
