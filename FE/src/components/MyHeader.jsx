import Container from 'react-bootstrap/Container';
import { Component } from "react";

class MyHeader extends Component {
    render() {
        return (
            <Container className="d-flex justify-content-start mx-3">
                <h1 className='text-white'>TV Shows</h1>
            </Container>
        )
    }
}

export default MyHeader;