import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ title, poster_path, vote_average, id, overview }) => {
  // console.log(movie);

  const navigate = useNavigate();

  // const getVoteClass = () => {
  //   if (vote_average >= 8) {
  //     return "green";
  //   } else if (vote_average >= 6) {
  //     return "orange";
  //   } else {
  //     return "red";
  //   }
  // };

  return (
    <Card
      className="movie"
      sx={{
        maxWidth: 275,
        height: 320,
        backgroundColor: "#111111",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => navigate("/details/" + id)}
    >
      <CardMedia
        component="img"
        className="movieImg"
        sx={{
          height: "100%",
          width: "100%",
          objectFit: "contain"
        }}
        image={poster_path ? IMG_API + poster_path : defaultImage}
        title={title}
        loading="lazy"
      />
      {/* <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent> */}
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default MovieCard;
