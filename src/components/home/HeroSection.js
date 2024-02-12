import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shoe from "../../images/shoe-hero.png";

const HeroSection = () => {
  return (
    <>
        <Container id="hero" className="my-5 d-flex flex-column gap-5">
          {/* HERO SECTION */}
          <Row className="py-5">
            <Col md={6} className="d-flex flex-column justify-content-center align-items-start gap-3">
              <p className="display-3 fw-semibold">Find your dream sneakers</p>
              <p className="fs-4">Find your shoes from our various collections. Your Journey Starts with the Right Shoes.</p>
              <Link to="/products" type="button" class="p-3 btn btn-dark rounded-4">Shop now</Link>
              
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <img src={shoe} alt="shoe" className="hero_img" />
            </Col>
          </Row>
          <Row className="py-5 d-flex flex-column flex-md-row gap-5 gap-md-0">
            <Col md={4}>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-shield-halved" className="p-2 display-3 primary rounded" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h4>Secure Payment</h4>
                  <small>Secure an order</small>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-business-time" className=" p-2 display-3 primary rounded" />
                </div>
                <div className="d-flex flex-column justify-content-center" >
                  <h4>24 / 7 Support</h4>
                  <small>Contact us 24hrs a day</small>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-truck" className="p-2 display-3 primary rounded" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h4>Fast Delivery</h4>
                  <small>Fast delivery on order</small>
                </div>
              </div>
            </Col>
            
          </Row>
        </Container>
    </>
  )
}

export default HeroSection;