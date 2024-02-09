import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import shoe from "../images/shoe-hero.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeroSection = () => {
  return (
    <>
        <Container id="hero" className="my-5 d-flex flex-column gap-5">
          {/* HERO SECTION */}
          <Row className="py-5">
            <Col md={6} className="d-flex flex-column justify-content-center align-items-start gap-3">
              <p className="display-3 fw-semibold">Find your dream sneakers</p>
              <p className="fs-4">Find your shoes from our various collections. Discover Your Sole Mate.</p>
              <Link to="/products" type="button" class="btn btn-danger p-3 rounded-4">Shop now</Link>
              
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <img src={shoe} alt="shoe" className="hero_img" />
            </Col>
          </Row>
          <Row className="py-5 d-flex flex-column flex-md-row gap-5 gap-md-0">
            <Col md={4}>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-shield-halved" className="display-3 p-2 primary rounded" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h4>Secure Payment</h4>
                  <p><small>Secure an order</small></p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-business-time" className="display-3 p-2 primary rounded" />
                </div>
                <div className="d-flex flex-column justify-content-center" >
                  <h4>24 / 7 Support</h4>
                  <p><small>Contact us 24hrs a day</small></p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-shield-halved" className="display-3 p-2 primary rounded" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h4>Secure Payment</h4>
                  <p><small>Secure an order</small></p>
                </div>
              </div>
            </Col>
            
          </Row>
        </Container>
    </>
  )
}

export default HeroSection;