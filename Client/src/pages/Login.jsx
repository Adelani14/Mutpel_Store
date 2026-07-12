import React from 'react';
import { useState } from 'react';
import Helpcenter from '../components/Helpcenter.jsx';
import Axios from "../utils/axiosInstance.js";

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const submitDetails = async () => {



    const theemail = document.getElementById("eemail").value;
    const thepassword = document.getElementById("ppassword").value;



    if (theemail === "" || thepassword === "") {
      errorMessage3.style.display = 'block';
      setTimeout(() => {
        errorMessage3.style.display = 'none';
      }, 2000);
      return;
    } else {


      let emailChecked = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let emailValid = emailChecked.test(theemail);

      if (!emailValid) {
        erroremail.style.display = 'block';
        setTimeout(() => {
          erroremail.style.display = 'none';
        }, 2000);
        return;
      }


      else {

        try {
          const information = { email, password }
          const result = await Axios.post(
            "/api/users/login",
            information
          );

          if (result.status === 200) {
            console.log(result.data);
            console.log(result);
            console.log(result.status);
            localStorage.setItem(
              "accessToken",
              result.data.accessToken
            );

            localStorage.setItem(
              "user",
              JSON.stringify(result.data.user)
            );

            const role = result.data.user.role;

            const signupbtn = document.getElementById('loginbtn')
            signupbtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Logging in...`

            setTimeout(() => {
              if (role === "admin") {
                window.location.href = "/admindashboard"
              } else {
                window.location.href = "/productlisting"
              }
            }, 1500)
          }


        }
        catch (err) {

          if (err.response && err.response.status >= 400) {
            errorMessage.style.display = 'block';
            setTimeout(() => {
              errorMessage.style.display = 'none';
            }, 2000);
          }
        }
      }
    }
  }



  return (

    <>


      < div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center" >

        <div className="card shadow-lg p-4 mt-3" style={{ maxWidth: "480px", width: "100%", borderRadius: "20px" }}>
          <div
            className="brand-icon rounded-4 d-inline-flex align-items-center justify-content-center bg-primary mb-3"
            style={{ width: "60px", height: "60px" }}
          >
            <img
              src="/icons/logo.png"
              alt="Mutpel Logo"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
          </div>

          <form>
            <small className=" text-danger " id="errorMessage3" style={{ display: "none" }}>
              Fill up all the inputs!
            </small>
            <div className="mb-3">
              <label className="form-label fw-bold small">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                <input onChange={(e) => { setemail(e.target.value) }} type="email" id='eemail' className="form-control bg-light border-start-0" placeholder="name@example.com" value={email} />

              </div>
              <small className="ms-3 text-danger " id="erroremail" style={{ display: "none" }}>
                enter a valid email address!
              </small>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label fw-bold small">Password</label>
                <a href="#" className="text-primary small text-decoration-none">Forgot password?</a>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                <input onChange={(e) => { setpassword(e.target.value) }} type="password" id='ppassword' className="form-control bg-light border-start-0" placeholder="Enter your password" value={password} />

              </div>
              <small className="ms-3 text-danger " id="errorMessage" style={{ display: "none" }}>
                incorrect Password or email!
              </small>
            </div>
            {/* 
            <div className="alert alert-info bg-primary-subtle border-0 small d-flex align-items-start py-2">
              <i className="bi bi-info-circle me-2 mt-1"></i>
              <span><strong>Admin Login:</strong> Use any valid format. This system is designed for both Citizens and Authorities.</span>
            </div> */}

            <button onClick={submitDetails} id='loginbtn' type="button" className="btn btn-outline-primary w-100 mt-2 py-2 fw-bold">Sign In &rarr;</button>

            <div className="text-center">

              <div className="text-center text-muted my-1">OR CONTINUE WITH</div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary w-100"><i className="bi bi-google me-2"></i>Google</button>
                <button className="btn btn-outline-secondary w-100"><i className="bi bi-facebook me-2"></i>Facebook</button>
              </div>


              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "10px", letterSpacing: "1px" }}>dont have an account yet?</small>
              <button type="button" className="btn btn-outline-primary w-100 mt-2 py-2 fw-bold"><a href="/signup" className="text-decoration-none text-dark">Create an Account</a></button>
            </div>
          </form>
        </div >

        <div className="mt-2 small text-muted">
          <p className="text-center auth-form-footer">By continuing, you agree to our <a href="#">Terms of Service</a> and <a
            href="#">Privacy Policy</a>.</p>
        </div>
      </div >


    </>
  );
};

export default Login;
