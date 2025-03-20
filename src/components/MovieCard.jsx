import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const IMG_API = "https://image.tmdb.org/t/p/w1280"
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({title,poster_path,vote_average,id,overview}) => {
  // console.log(movie);


  const getVoteClass = () => {
    if (vote_average >= 8) {
      return "green";
    } else if (vote_average >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <Card className='movie' sx={{ maxWidth: 275 , backgroundColor: "#E3F2FD"}}>
      <CardMedia className='movieImg'
        sx={{ height: 350, width: 275, objectFit:"cover" }}
        image={poster_path ? IMG_API + poster_path : defaultImage}
        title={title}
        loading="lazy"
      />
      <CardContent sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Box className={`tag ${getVoteClass()}`}>
          {vote_average.toFixed(1)}
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default MovieCard;
