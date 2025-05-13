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
    currentPage,
    setCurrentPage,
    totalPages,
    searchMovies
  } = useMovieContext();
  const { currentUser } = useAuthContext();

  // console.log(searchItem);
  // console.log(SEARCH_API + searchItem);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem.trim() && currentUser) {
      searchMovies(SEARCH_API + searchItem);
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie!");
    } else {
      toastWarnNotify("Please enter a text!");
    }
    // getMovies(SEARCH_API + (searchItem.trim()))
  };
  return (
    <Box
      sx={{
        backgroundColor: "#000022",
      }}
    >
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
          sx={{ backgroundColor: "#0D47A1", color:"white" }}
        />
        <Button
          sx={{ backgroundColor: "#0D47A1" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Box>

      {loading ? (
        <Loading />
      ) : (
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}>
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

            <Pagination
              sx={{
                mt: 2,
                mb: 2,
                '& .MuiPaginationItem-root': {
                  color: '#E0E0E0',
                  backgroundColor: '#0D47A1',
                  borderColor: '#1976d2',
                  '&.Mui-selected': {
                    backgroundColor: '#1E88E5', 
                    color: '#ffffff',
                  },
                  '&:hover': {
                    backgroundColor: '#1565C0', 
                  },
                },
              }}
              count={totalPages}
              variant="outlined"
              color="#E0E0E0"
              page={currentPage}
              onChange={handlePageChange}
            />

        </Box>
      )}
    </Box>
  );
};

export default Main;
