import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterSection = () => {
    const date = new Date();
    let year = date.getFullYear();
    return (
        <>
            <Container className="my-5">
                <Row className="py-5 border-bottom">
                    <Col md={6}>
                        <h1>Join our newsletter to kee up to date with us!</h1>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end align-items-start">
                        <div className="d-flex gap-3">
                            <input class="form-control" type="text" placeholder="Enter your email" aria-label="default input example" />
                            <button type="button" className="btn btn-dark">Subscribe</button>
                        </div>
                    </Col>
                </Row>
                <Row className="py-5 border-bottom">
                    <Col md={6}>
                        <h1 className="fs-1 fw-bold">Foot<span>Work.</span></h1>
                        <h3>Putting Your Best Foot Forward</h3>
                        <p className="text-secondary">hello@footwork.com</p>
                        <p className="text-secondary">Footwork, 2023</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end align-items-center">
                        <div className="d-flex gap-2 align-items-center fs-2">
                            <i class="fa-brands fa-square-facebook"></i>
                            <i class="fa-brands fa-square-instagram"></i>
                            <i class="fa-brands fa-square-x-twitter"></i>
                            <i class="fa-brands fa-linkedin"></i>
                        </div>
                    </Col>
                </Row>
                <Row className="py-3 text-secondary">
                    <Col className="d-flex justify-content-between">
                        <p>&#169; {year} Footwork Inc.</p>
                        <div className="d-flex gap-2 gap-md-5">
                            <p>Terms of Service</p>
                            <p>Privacy Policy</p>
                            <p>Cookies</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default FooterSection