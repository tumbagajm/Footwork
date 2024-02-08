import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({productProp}) => {
    const { _id, name, description, price } = productProp;
  return (
    <>
        <Card className="p-3 my-3">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP {price}</Card.Text>
                <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    </>
  );
};

export default ProductCard;