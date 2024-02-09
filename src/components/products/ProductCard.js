import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({productProp}) => {
  const { _id, name, description, price } = productProp;

  const [shoe, setShoe] = useState({})

  

  useEffect(()=> {
    const fetchData = async () => {
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products/4");
            const data = await response.json();
            setShoe(data)
        } catch(error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();

    // Cleanup function (optional)
    return () => {
        // Cleanup code here if needed
    };

  }, [])

  console.log(shoe);

  return (
    <>
      <div className="mb-5 d-flex flex-column justify-content-center align-items-center gap-3">
        <img src="https://placehold.co/400x400" className="img-fluid rounded-4" />
        <h4>{name}</h4>
        <h5>&#8369;{price}</h5>
        <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
      </div>
      {/* <Card className="p-3 my-3">
        <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PhP {price}</Card.Text>
        <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
        </Card.Body>
      </Card> */}
    </>
  );
};

export default ProductCard;