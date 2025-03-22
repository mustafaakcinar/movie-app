import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieProvider";
import { Box } from "@mui/material";
import Loading from "../components/Loading";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [searchItem, setSearchItem ] = useState("")
  const { movies, loading } = useMovieContext();
  // console.log(movies);

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies(SEARCH_API + searchItem)
  }
  return (
    // search için form eklenecek
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </Box>
      )}
    </>
  );
};

export default Main;
