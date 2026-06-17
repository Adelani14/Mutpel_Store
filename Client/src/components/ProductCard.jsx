// import React from "react";


// const ProductCard = ({ title, imgsrc, description, shortDescription, price, previousPrice, stockCount, discountPercentage }) => {
//     return (

//         <>

//             <div className="col-6 col-sm-4 col-xl-3">
//                 <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
//                     <div className="badge bg-danger text-white position-absolute top-0 end-0 m-3">{discountPercentage}% OFF</div>
//                     <img src={imgsrc} className="card-img-top rounded-top-4" alt="Product" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
//                     <div className="card-body mt-1">
//                         <h3 className="h6 overflow-hidden text-nowrap">{title}</h3>
//                         <p className="fw-bold mb-0">₦{price}</p>
//                         <p className="text-decoration-line-through text-muted mb-1">₦{previousPrice}</p>
//                         <p className="text-muted mb-0">{stockCount} items left</p>
//                         <p className="text-muted mb-0">{shortDescription}</p>
//                         {/* <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a> */}
//                     </div>
//                 </div>
//             </div>











//         </>
//     )
// }
// export default ProductCard;



import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
    id,
    title,
    imgsrc,
    shortDescription,
    price,
    previousPrice,
    stockCount,
    discountPercentage,
}) => {
    return (
        <div className="col-6 col-sm-4 col-xl-3">
            <Link
                to={`/productdetail/${id}`}
                className="text-decoration-none text-dark"
            >
                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                    {discountPercentage > 0 && (
                        <div className="badge bg-danger text-white position-absolute top-0 end-0 m-3">
                            {discountPercentage}% OFF
                        </div>
                    )}

                    <img
                        src={imgsrc}
                        className="card-img-top rounded-top-4"
                        alt={title}
                        style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                        }}
                    />

                    <div className="card-body mt-1">
                        <h3 className="h6 overflow-hidden text-nowrap">
                            {title}
                        </h3>

                        <p className="fw-bold mb-0">
                            ₦{price}
                        </p>
                        {previousPrice > 0 && (
                            <p className="text-decoration-line-through text-muted mb-1">
                                ₦{previousPrice}
                            </p>
                        )}

                        <p className="text-muted mb-0">
                            {stockCount} items left
                        </p>

                        <p className="text-muted mb-0">
                            {shortDescription}
                        </p>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default ProductCard;