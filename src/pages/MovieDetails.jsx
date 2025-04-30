import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, []);
  // promise.all birden fazla aynı anda istek için kullanılabilir
  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = movieDetails;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" align="center" color="#E0E0E0" mb={3}>
        {title}
      </Typography>
      <Grid2 container justifyContent="center" spacing={3}>
        <Grid2 item xs={12} md={8}>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", lg: "33%" },
                height: { xs: 300, lg: 600 },
                objectFit: "cover",
                borderRadius: { xs: 2, lg: "10px 0 0 10px" },
              }}
              image={
                poster_path ? `${baseImageUrl}${poster_path}` : defaultImage
              }
              alt="Poster"
            />
            <CardContent sx={{ flex: 1, backgroundColor:"#2F343D" }}>
              <Typography variant="h5" color="#E0E0E0" mb={2}>
                Overview
              </Typography>
              <Typography variant="body1" color="#E0E0E0" paragraph>
                {overview}
              </Typography>
              <List sx={{ border: 1, borderRadius: 1, borderColor: "divider", color:"#E0E0E0" }}>
                <ListItem>
                  <ListItemText primary={`Release Date: ${release_date}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Rate: ${vote_average}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Total Vote: ${vote_count}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Button
                        component={Link}
                        to={-1}
                        variant="text"
                        color="primary"
                        fullWidth
                      >
                        Go Back
                      </Button>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default MovieDetails;
