import Helpcenter from '../components/Helpcenter.jsx';

const Signup = () => {
  return (
    <>

      <Helpcenter />


      <main class="min-vh-100 d-flex align-items-center py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-5">
              <div class="card rounded-4 shadow-sm border-0 p-4">
                <div class="text-center mb-4">
                  <div class="brand-icon rounded-4 d-inline-flex align-items-center justify-content-center bg-primary text-white mb-3" style={{ width: '60px', height: '60px' }}>
                    <i class="bi bi-basket-fill fs-4"></i>
                  </div>
                  <h1 class="h4">Create your account</h1>
                  <p class="text-muted mb-0">Join Mutpel today for exclusive deals and quality goods.</p>
                </div>
                <form>
                  <div class="mb-3">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-control" placeholder="Enter your first and last name" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" placeholder="name@example.com" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <div class="input-group shadow-sm rounded-3 overflow-hidden">
                      <span class="input-group-text bg-white border-0"><i class="bi bi-lock"></i></span>
                      <input type="password" class="form-control border-0" placeholder="Create a password" required />
                      <button class="btn btn-outline-secondary" type="button"><i class="bi bi-eye"></i></button>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <div class="input-group shadow-sm rounded-3 overflow-hidden">
                      <span class="input-group-text bg-white border-0"><i class="bi bi-lock"></i></span>
                      <input type="password" class="form-control border-0" placeholder="Confirm password" required />
                      <button class="btn btn-outline-secondary" type="button"><i class="bi bi-eye"></i></button>
                    </div>
                  </div>
                  <p class="text-danger small mb-3 d-none">Passwords do not match.</p>

                  <button type="submit" class="btn btn-primary w-100">Sign Up Now</button>
                </form>
                <div class="text-center text-muted my-3">OR CONTINUE WITH</div>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline-secondary w-100"><i class="bi bi-google me-2"></i>Google</button>
                  <button class="btn btn-outline-secondary w-100"><i class="bi bi-facebook me-2"></i>Facebook</button>
                </div>
                <p class="text-center text-muted small mt-4 mb-0">Already have an account? <a href="login.html" class="text-primary text-decoration-none">Log in here</a></p>
              </div>
              <p class="text-center auth-form-footer">By continuing, you agree to our <a href="#">Terms of Service</a> and <a
                href="#">Privacy Policy</a>.</p>
              <div class="text-center text-muted small mt-4">Premium Shopping</div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
};
export default Signup;