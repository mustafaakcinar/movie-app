import React from 'react'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import { useMovieContext } from '../context/MovieProvider'
import { Box } from '@mui/material'

const API_KEY = process.env.REACT_APP_TMDB_KEY
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&query=`


const Main = () => {
  const {movies,loading} = useMovieContext()
  // console.log(movies);
  return (
    <>
    <Navbar />
    <Box sx={{
      display:"flex",
      flexWrap:"wrap"
    }}>
    {movies.map((movie) => (<MovieCard key={movie.id} movie={movie}/>))}
    </Box>

    </>
  )
}

export default Main