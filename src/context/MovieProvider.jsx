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

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = async (URL) => {
    setLoading(true);
    try {
      let data = await axios.get(URL);
      // console.log(data.data.results);
      setMovies(data.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider value={{ movies, loading, getMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
