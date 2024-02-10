import Cart from '../components/cart/Cart';
import { Container, Row, Col } from 'react-bootstrap';

const CartPage = () => {
  return (
    <>
        <Container>
            <Row className="pb-5">
                <Col>
                    <h1>Shopping Cart</h1>
                </Col>
            </Row>
            <Row>
                <Cart />
            </Row>
        </Container>
    </>
  )
}

export default CartPage