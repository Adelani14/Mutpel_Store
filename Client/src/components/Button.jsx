import React from "react";


const Button = ({ title, imgsrc, description, shortDescription, price, prevPrice }) => {
    return (

        <>

            <div className="col-6 col-sm-4 col-xl-3">
                <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src={imgsrc} className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                        <h3 className="h6">{title}</h3>
                        <p className="text-muted mb-2">{shortDescription}</p>
                        <p className="text-muted mb-2 text-decoration-line-through">${prevPrice}</p>
                        <p className="fw-bold mb-3">${price}</p>
                        <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                    </div>
                </div>
            </div>




        </>
    )
}
export default Button;