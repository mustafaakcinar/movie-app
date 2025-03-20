import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};


const API_KEY = process.env.REACT_APP_TMDB_KEY
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`


const MovieProvider = ({children}) => {

    const [movies,setMovies] = useState([])
    
    useEffect(() => {
        getMovies()
    },[])

    const getMovies = async () => {
        try {
            let data = await axios.get(FEATURED_API)
            console.log(data.data.results);
        } catch (error) {
            console.log(error);
        }
    }

  return <MovieContext.Provider value={null}>{children}</MovieContext.Provider>;
};

export default MovieProvider;
