import React from "react";


const ProductCard = ({ title, imgsrc, description, shortDescription, price, previousPrice, stockCount, discountPercentage }) => {
    return (

        <>

            <div className="col-6 col-sm-4 col-xl-3">
                <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src={imgsrc} className="card-img-top rounded-top-4" alt="Product" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div className="card-body">
                        <h3 className="h6">{title}</h3>
                        <p className="fw-bold mb-3">₦{price}</p>
                        <p className="text-decoration-line-through text-muted mb-2">₦{previousPrice}</p>
                        <p className="text-muted mb-2">{stockCount}</p>
                        <p className="text-muted mb-2">{shortDescription}</p>
                        <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                    </div>
                </div>
            </div>



           



        </>
    )
}
export default ProductCard;