import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import MyHeader from "./components/MyHeader";
import MyMovies from "./components/MyMovies";
import TvShows from "./components/TvShows";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar></MyNavbar>
        <MyHeader></MyHeader>
        <Routes>
          <Route element={<TvShows />} path="/tv-shows"></Route>
        </Routes>
        <Routes>
          <Route
            element={<MovieDetails />}
            path="/movie-details/:imdbID"
          ></Route>
        </Routes>
        <MyMovies search="Lord of the rings"></MyMovies>
        <MyMovies search="Star Wars"></MyMovies>
        <MyMovies search="Pirates of the Caribbean"></MyMovies>
        <MyMovies search="Underworld"></MyMovies>
        <MyMovies search="Zoolander"></MyMovies>
      </div>
    </BrowserRouter>
  );
}

export default App;
