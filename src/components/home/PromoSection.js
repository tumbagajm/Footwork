import { Container, Row, Col } from "react-bootstrap";

const PromoSection = () => {
    return (
    <>
        <Container className="py-5">
            <Row className="py-5">
                <h2 className="d-block display-4 text-center fw-bold">Promos</h2>
            </Row>
            <Row>
                {/* <div className="promo_box rounded-4">
                    <div className="faded"></div>
                    <img alt="shoes background" className="promo_img rounded-top-4" />
                    <Container>
                        <Row className="justify-content-center">
                            <Col sm={9} className="m-5 p-5 text-center">
                                <h1 className="mb-4">Exclusive Discounts for Members</h1>
                                <p className="lead mb-sm-5 px-md-8">The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you.</p>
                                <button className="btn btn-dark btn-lg d-flex align-items-center mx-auto">Get your code</button>
                            </Col>
                        </Row>
                    </Container>
                </div> */}

                <Container>
                    <Row>
                        <Col className="p-5 border rounded-4 bg-dark-subtle shadow">
                            <div className="p-5 text-center">
                                <h1 className="mb-4">Exclusive Discounts for Members</h1>
                                <p className="lead mb-sm-5 px-md-8">The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you.</p>
                                <button className="btn btn-dark btn-lg d-flex align-items-center mx-auto">Get your code</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    </>
    )
}

export default PromoSection