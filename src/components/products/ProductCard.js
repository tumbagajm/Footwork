import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({productProp}) => {
  const { _id, name, price, images } = productProp;
  const [ image, setImage ] = useState("");



  useEffect(() => {
    const getImage = () => {
    if(image === "" || image === null || image === undefined) {
      setImage("https://placehold.co/400x400");
    } 

    setImage(images.data[0]);

    getImage();

    // Cleanup function (optional)
    return () => {
        // Cleanup code here if needed
    };
  }
  }, [image, images.data])
  

 


  return (
    <>
      <div className="mb-5 d-flex flex-column justify-content-center gap-2">
        <div className="product_box">
          {
            productProp.images.length === 0 ? 
            <Link to={`/products/${_id}`}><img src={"https://placehold.co/400x400"} className="product_img rounded-4" /></Link>
            :
            <Link to={`/products/${_id}`}><img src={productProp.images[0]} className="product_img rounded-4" /></Link>
          }
          <div className="d-flex flex-column justify-content-center align-items-center rounded-4 text-white overlay">
            <h4 className="text-center">{name}</h4>
            <h3 className="text-center">&#8369;{price}</h3>
            <Link className="btn btn-light" to={`/products/${_id}`}>View Product</Link>
          </div>
        </div>
        <div className="d-flex flex-column">
          <h5 className="fw-medium">{name.toUpperCase()}</h5>
          <h5 className="fw-bold">&#8369;{price.toLocaleString("en-US")}</h5>
        </div>
      </div>
    </>
  );
};

export default ProductCard;