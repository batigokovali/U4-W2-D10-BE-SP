import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Component } from "react";
import { Search } from "react-bootstrap-icons";
import { Bell } from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MovieDetails from "./MovieDetails";

class MyNavbar extends Component {
  render() {
    return (
      <Navbar bg="transparent" expand="lg" className="mx-3">
        <Navbar.Brand href="#home">
          <img
            id="netflix-navbar-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/tv-shows" className="text-white">
              <p className="mx-2 my-0">Tv Shows</p>
            </Link>
            <Link to="/movie-details" className="text-white">
              <p className="mx-2 my-0">Movie Details</p>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <div className="ml-auto d-flex justify-content-center align-items-center">
          <Search className="text-white"></Search>
          <p className="text-white mb-0 mx-3">KIDS</p>
          <Bell className="text-white"></Bell>
          <Dropdown align="end" bg="transparent">
            <Dropdown.Toggle id="dropdown" bg="transparent" align="end">
              <img
                className="avatar-img mr-2"
                src="https://media.npr.org/assets/img/2020/10/06/gettyimages-74299482_wide-5ac106c73086aa63c495089c35f4811d0bb1ce5b.jpg"
                alt=""
              />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" bg="transparent">
              <Dropdown.Item href="#/action-1">Edit Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Account</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    );
  }
}

export default MyNavbar;
