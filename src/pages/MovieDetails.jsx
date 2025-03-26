import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState("");
  const [videoKey, setVideoKey] = useState("");
  const { movieId } = useParams();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  const { title, poster_path, vote_average } = movieDetails;

  return (
    <Box sx={{
      display:"flex",
      justifyContent:"center",
      mt:5
    }}>
      <Card
        className="movie"
        sx={{ maxWidth: 275, backgroundColor: "#E3F2FD" }}
      >
        <CardMedia
          className="movieImg"
          sx={{ height: 350, width: 275, objectFit: "cover" }}
          image={poster_path ? baseImageUrl + poster_path : defaultImage}
          title={title}
          loading="lazy"
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </Box>
  );
};

export default MovieDetails;
