import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({productProp}) => {
  const { _id, name, description, price, images } = productProp;
  const [ image, setImage ] = useState("");



  useEffect(() => {
    const getImage = () => {
    if(image == "" || image == null || image == undefined) {
      setImage("https://placehold.co/400x400");
    } 

    setImage(images.data[0]);

    getImage();

    // Cleanup function (optional)
    return () => {
        // Cleanup code here if needed
    };
  }
  }, [])
  

 


  return (
    <>
      <div className="mb-5 d-flex flex-column justify-content-center align-items-center gap-3">
        <div className="product_box">
          <Link to={`/products/${_id}`}><img src={"https://placehold.co/400x400"} className="product_img rounded-4" /></Link>
          <div className="product_box_items text-white">
            <h4>{name}</h4>
            <h5>&#8369;{price}</h5>
            <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
          </div>
        </div>
        <h4 className="text-secondary">{name}</h4>
        <h5>&#8369;{price}</h5>
      </div>
    </>
  );
};

export default ProductCard;