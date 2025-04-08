import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieProvider";
import { Box, Button, Pagination, TextField } from "@mui/material";
import Loading from "../components/Loading";
import { toastWarnNotify } from "../helpers/ToastNotify";
import { useAuthContext } from "../context/AuthProvider";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [searchItem, setSearchItem] = useState("");
  const {
    movies,
    loading,
    getMovies,
    currentPage,
    setCurrentPage,
    totalPages
  } = useMovieContext();
  const { currentUser } = useAuthContext();

  console.log(searchItem);
  console.log(SEARCH_API + searchItem);

  
  const handlePageChange = (e,value) => {
    setCurrentPage(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem.trim() && currentUser) {
      getMovies(SEARCH_API + searchItem);
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie!");
    } else {
      toastWarnNotify("Please enter a text!");
    }
    // getMovies(SEARCH_API + (searchItem.trim()))
  };
  return (
    // search için form eklenecek

    <>
      <Navbar />

      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 2,
        }}
      >
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Contained
        </Button>
      </Box>

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
          <Pagination
            sx={{ mt: 2, mb: 2 }}
            count={totalPages}
            variant="outlined"
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </>
  );
};

export default Main;
