import Order from '../components/order/Order';
import { Container, Row, Col } from 'react-bootstrap';

const OrderPage = () => {
  return (
    <>
        <Container>
            <Row className="pb-5">
                <Col>
                    <h1>Shopping Cart</h1>
                </Col>
            </Row>
            <Row>
                <Order />
            </Row>
        </Container>
    </>
  )
}

export default OrderPage;