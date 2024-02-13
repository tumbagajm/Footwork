import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function AboutMePage() {
  return (
    <Container className="mt-5">
      <Row>
        {/* <Col md={4} className="d-flex justify-content-center align-items-center">
          <Image src="https://via.placeholder.com/150" roundedCircle />
        </Col> */}
        <Col md={12}>
          <div className="text-center text-md-start">
            <h1 className="mb-4">About Footwork</h1>
            <p>
              Welcome to Footwork, your ultimate destination for trendy and comfortable shoes! At Footwork, we believe that every step should be stylish and effortless. Whether you're strolling down the street or hitting the gym, we've got the perfect pair for you.
            </p>
            <p>
              Our mission is to provide high-quality footwear that not only looks great but also feels amazing on your feet. From sneakers to sandals, boots to loafers, we've curated a collection that caters to every style and occasion.
            </p>
            <p>
              We understand the importance of staying ahead of the fashion curve, which is why we regularly update our inventory with the latest trends and designs. Our team is dedicated to delivering exceptional customer service, ensuring that your shopping experience with us is nothing short of fantastic.
            </p>
            <p>
              Thank you for choosing Footwork as your go-to shoe store. Step into style with Footwork today!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutMePage;
