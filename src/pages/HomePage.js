import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import shoe from "../images/shoe-hero.png"

const HomePage = () => {
  document.title = "ZUITT Shop";
    return (
      <>
        <Container id="hero" className="my-5">
          {/* HERO SECTION */}
          <Row className="py-5">
            <Col md={6} className="d-flex flex-column justify-content-center align-items-start gap-3">
              <p className="display-3 fw-semibold">Find your dream sneakers</p>
              <p className="fs-4">Find your shoes from our various collections. Discover Your Sole Mate.</p>
              <Link to="/products"><button type="button" class="btn btn-danger p-3 rounded-4">Shop now</button></Link>
              
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <img src={shoe} alt="shoe" className="hero_img" />
            </Col>
          </Row>
        </Container>
      </>
    )
  }

export default HomePage