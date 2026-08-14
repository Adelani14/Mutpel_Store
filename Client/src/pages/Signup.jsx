import React from "react";
import { useState } from "react";
import Axios from "../utils/axiosInstance.js";

import Helpcenter from '../components/Helpcenter.jsx';


const Signup = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')

  const endpoint = 'https://mutpel-store.onrender.com/api/users/signup'
  const submitDetails = () => {



    const thefirstname = document.getElementById("ffirstname").value;
    const thelastname = document.getElementById("llastname").value;
    const theemail = document.getElementById("eemail").value;
    const thepassword = document.getElementById("ppassword").value;
    const Cpassword = document.getElementById("Cpass").value;


    if (thefirstname === "" || thelastname === "" || theemail === "" || thepassword === "" || Cpassword === "") {
      errorMessage3.style.display = 'block';
      setTimeout(() => {
        errorMessage3.style.display = 'none';
      }, 2000);
      return;
    } else {


      let nameChecked = /^[A-Za-z]{2,30}$/;
      let PassChecked = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      let emailChecked = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let emailValid = emailChecked.test(theemail);

      if (!emailValid) {
        erroremail.style.display = 'block';
        setTimeout(() => {
          erroremail.style.display = 'none';
        }, 2000);
        return;
      }
      let FirstNameValid = nameChecked.test(thefirstname);
      let LastNameValid = nameChecked.test(thelastname);
      if (!FirstNameValid) {
        firstnameerror.style.display = 'block';
        setTimeout(() => {
          firstnameerror.style.display = 'none';
        }, 2000);
        return;

      }
      if (!LastNameValid) {
        lastnameerror.style.display = 'block';
        setTimeout(() => {
          lastnameerror.style.display = 'none';
        }, 2000);
        return;

      }


      let PassValid = PassChecked.test(thepassword);
      if (!PassValid) {
        errorMessage2.style.display = 'block';
        setTimeout(() => {
          errorMessage2.style.display = 'none';
        }, 2000);
        return;
      } else {

        if (thepassword !== Cpassword) {

          errorMessage.style.display = 'block';
          setTimeout(() => {
            errorMessage.style.display = 'none';
          }, 2000);
        } else {
          errorMessage.style.display = 'none';





          const information = { email, password, firstname, lastname }
          Axios.post(endpoint, information)
            .then((result) => {
              // console.log(result);
              if (result.status === 201) {
                const signupbtn = document.getElementById('signupbtn')
                signupbtn.innerHTML = `<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing up...`

                setTimeout(() => {
                  window.location.href = '/login'
                }, 1500)

              } else if (result.status === 200) {
                alert('User already exists')
                // window.location.href = '/login'
              } else {
                alert('status error')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
  }

  return (
    <>

      <Helpcenter />
      < div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center" >

        <div className="card shadow-lg p-4 mt-3" style={{ maxWidth: "480px", width: "100%", borderRadius: "20px" }}>
          <div className="text-center mb-4">
            <div className="brand-icon rounded-4 d-inline-flex align-items-center justify-content-center bg-primary text-white mb-3" style={{ width: '60px', height: '60px' }}>
              <img
                src="/icons/logo.png"
                alt="Mutpel Logo"
                style={{ width: "44px", height: "44px", objectFit: "contain" }}
              />
            </div>
            <h1 className="h4">Create your account</h1>
            <p className="text-muted mb-0">Join Mutpel today for exclusive deals and quality goods.</p>
          </div>

          <form>
            <small className=" text-danger " id="errorMessage3" style={{ display: "none" }}>
              Fill up all the inputs!
            </small>
            <div className="mb-3">
              <label className="form-label fw-bold small">First Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="bi bi-person"></i></span>
                <input onChange={(e) => { setfirstname(e.target.value) }} type="text" id="ffirstname" className="form-control bg-light border-start-0" placeholder="Enter your first name" value={firstname} />
              </div>
              <small className="ms-3 text-danger " id="firstnameerror" style={{ display: "none" }}>
                invalid first name entered!
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold small">Last Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="bi bi-person"></i></span>
                <input onChange={(e) => { setlastname(e.target.value) }} type="text" id="llastname" className="form-control bg-light border-start-0" placeholder="Enter your last name" value={lastname} />
              </div>
              <small className="ms-3 text-danger " id="lastnameerror" style={{ display: "none" }}>
                invalid last name entered!
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                <input onChange={(e) => { setemail(e.target.value) }} type="email" id="eemail" className="form-control bg-light border-start-0" placeholder="name@example.com" value={email} />

              </div>
              <small className="ms-3 text-danger " id="erroremail" style={{ display: "none" }}>
                enter a valid email address!
              </small>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label fw-bold small">Password</label>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                <input onChange={(e) => { setpassword(e.target.value) }} type="password" id="ppassword" className="form-control bg-light border-start-0" placeholder="Enter your password" value={password} />

              </div>
            </div>
            {/* confirm password */}
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label fw-bold small">Confirm Password</label>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                <input onChange={(e) => { setconfirmpassword(e.target.value) }} type="password" id="Cpass" className="form-control bg-light border-start-0" placeholder="Confirm your password" />
              </div>
              <small className="ms-3 text-danger " id="errorMessage" style={{ display: "none" }}>
                Passwords do not match!
              </small>
              <small className="ms-3 text-danger " id="errorMessage2" style={{ display: "none" }}>
                enter a strong password!
              </small>
            </div>



            <button onClick={submitDetails} type="button" className="btn btn-outline-primary w-100 mt-2 py-2 fw-bold" id="signupbtn">Sign up &rarr;</button>

            <div className="text-center">

              {/* <div className="text-center text-muted my-1">OR CONTINUE WITH</div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary w-100"><i className="bi bi-google me-2"></i>Google</button>
                <button className="btn btn-outline-secondary w-100"><i className="bi bi-facebook me-2"></i>Facebook</button>
              </div> */}
              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "10px", letterSpacing: "1px" }}>Already have an account?</small>
              <button type="button" className="btn btn-outline-primary w-100 mt-2 py-2 fw-bold"><a href="/login" className="text-decoration-none text-dark">Sign In</a></button>
            </div>
          </form>
        </div>

      </div>
      <div className="mt-2 small text-muted">
        <p className="text-center auth-form-footer">By continuing, you agree to our <a href="#">Terms of Service</a> and <a
          href="#">Privacy Policy</a>.</p>
      </div>
      <div className="text-center text-muted small mt-2">Premium Shopping</div>




    </>
  );
};

export default Signup;