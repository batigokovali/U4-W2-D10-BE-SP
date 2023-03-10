import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
const url = "http://www.omdbapi.com/?apikey=3e647401&i=";

const MovieDetails = () => {
  const { imdbID } = useParams();
  console.log(imdbID);

  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      let response = await fetch(url + imdbID);
      console.log(response);
      if (response.ok) {
        let dataRaw = await response.json();
        let data = dataRaw;
        console.log(data);
        setMovieDetails(data);
        setIsLoading(false);
      } else {
        console.log("error");
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  return (
    <>
      {isLoading && (
        <>
          <p className="text-white">Details are loading, gimme a sec...</p>
          <Spinner
            animation="border"
            role="status"
            className="text-white"
          ></Spinner>
        </>
      )}
      {isError && (
        <Badge pill bg="warning" text="white">
          Something is broke 😥
        </Badge>
      )}
      <Card className="bg-transparent card-text">
        <Row>
          <Col lg={4}>
            <img
              variant="top"
              src={movieDetails.Poster}
              className="details-image"
            />
          </Col>
          <Col
            lg={8}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Card.Title>{movieDetails.Title}</Card.Title>
            <Card.Text>By {movieDetails.Writer}</Card.Text>
            <Card.Text>
              {movieDetails.Country} | {movieDetails.Genre} | Released at:{" "}
              {movieDetails.Released}
            </Card.Text>
            <Card.Text>IMDB Rating: {movieDetails.imdbRating}</Card.Text>
            <Card.Text>{movieDetails.Plot}</Card.Text>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default MovieDetails;
