
import Helpcenter from "../components/Helpcenter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Productdetail = () => {
  return (
    <>
      <Helpcenter />
      <Header />

      <main>
        <section className="py-4 bg-body">
          <div className="container">
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-4">
              <div>
                <p className="text-muted mb-1">Home / Kitchen / Premium Kitchen Master</p>
                <h1 className="h4 mb-0">Premium Kitchen Master Pro Chef Knife</h1>
              </div>
              <div className="text-muted">In Stock</div>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card rounded-4 shadow-sm overflow-hidden border-0">
                  <img src="https://images.unsplash.com/photo-1717126763826-77696b14d5ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEVyZ29ub21pYyUyMENoZWYncyUyMEtuaWZlfGVufDB8fDB8fHww" className="img-fluid" alt="Chef Knife" />
                </div>
                <div className="d-flex align-items-center gap-3 mt-3 overflow-auto">
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="img-fluid rounded-2" style={{ width: "80px", height: "80px" }}></img>
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="img-fluid rounded-2" style={{ width: "80px", height: "80px" }}></img>
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="img-fluid rounded-2" style={{ width: "80px", height: "80px" }}></img>
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="img-fluid rounded-2" style={{ width: "80px", height: "80px" }}></img>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="badge bg-primary text-white">New Arrival</span>
                    <span className="text-muted">SKU: MK-2024</span>
                  </div>
                  <h2 className="h4">Premium Kitchen Master Pro Chef Knife</h2>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="text-warning small">
                      <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i>
                    </div>
                    <span className="text-muted">124 reviews</span>
                  </div>
                  <div className="mb-4">
                    <span className="fs-3 fw-bold">₦45,000</span>
                    <span className="text-decoration-line-through text-muted ms-3">₦55,000</span>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2 fw-semibold">Select Size</p>
                    <div className="btn-group" role="group">
                      <button className="btn btn-outline-secondary active">8 inch</button>
                      <button className="btn btn-outline-secondary">10 inch</button>
                      <button className="btn btn-outline-secondary">12 inch</button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2 fw-semibold">Choose Handle</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-dark rounded-circle p-3"></button>
                      <button className="btn btn-outline-dark rounded-circle p-3"></button>
                      <button className="btn btn-outline-dark rounded-circle p-3"></button>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 mb-4">
                    <div className="input-group w-100 w-sm-auto">
                      <button className="btn btn-outline-secondary" type="button"><i className="bi bi-dash"></i></button>
                      <input type="text" className="form-control text-center" defaultValue="1" aria-label="Quantity" />
                      <button className="btn btn-outline-secondary" type="button"><i className="bi bi-plus"></i></button>
                    </div>
                    <a href="#" className="btn btn-primary btn-lg w-100 w-sm-auto">Add to Cart</a>
                  </div>
                  <div className="list-group list-group-flush rounded-4 bg-light p-3">
                    <div className="list-group-item bg-transparent border-0 px-0 py-2 d-flex align-items-center gap-2"><i className="bi bi-check-circle-fill text-primary"></i> Free delivery on orders over ₦100k</div>
                    <div className="list-group-item bg-transparent border-0 px-0 py-2 d-flex align-items-center gap-2"><i className="bi bi-check-circle-fill text-primary"></i> 30-day hassle-free return</div>
                    <div className="list-group-item bg-transparent border-0 px-0 py-2 d-flex align-items-center gap-2"><i className="bi bi-check-circle-fill text-primary"></i> Safe & encrypted payments</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card rounded-4 shadow-sm border-0 mt-5">
              <div className="card-body p-4">
                <ul className="nav nav-pills mb-4" role="tablist">
                  <li className="nav-item" role="presentation"><button className="nav-link active" data-bs-toggle="pill" data-bs-target="#description" type="button">Description</button></li>
                  <li className="nav-item" role="presentation"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#specs" type="button">Specifications</button></li>
                  <li className="nav-item" role="presentation"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#reviews" type="button">Reviews (120)</button></li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="description">
                    <p className="mb-0 text-muted">Designed for both professional chefs and home cooks, the Mutpel Master Pro Chef Knife delivers precise cuts and exceptional balance. Its premium steel blade and ergonomic handle are engineered to last.</p>
                  </div>
                  <div className="tab-pane fade" id="specs">
                    <ul className="list-unstyled text-muted mb-0">
                      <li className="mb-2"><strong>Blade:</strong> High-carbon stainless steel</li>
                      <li className="mb-2"><strong>Length:</strong> 8 inch</li>
                      <li className="mb-2"><strong>Weight:</strong> 210g</li>
                      <li><strong>Warranty:</strong> 2 years</li>
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="reviews">
                    <p className="mb-0 text-muted">Excellent edge retention, comfortable grip, and perfect balance. Customers love the durability and handle finish.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <h2 className="h5 mb-0">You Might Also Like</h2>
                <a href="/product-listing" className="text-primary text-decoration-none">Explore More</a>
              </div>
              <div className="row g-4">
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

    </>
  )
}
export default Productdetail;