import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url'

console.log(url)

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
    });
  const handleSuccess = (msg) =>
    toast.success('User Logged in Successfully')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);

      const { success, message,token } = data;
      if(token){
        
      Cookies.set('token', token);
      }
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div
  className="login_container"
  style={{
    backgroundImage: `url("LOGIN.png")`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
  }}
>
  <div
    className="form_container"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add a background color with some opacity to make the form more readable
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better aesthetics
      maxWidth: "400px", // Limit the form width
      width: "100%", // Ensure form scales properly on smaller screens
      textAlign: "center", // Center text
    }}
  >
    <h1
      style={{
        marginTop: 0, // Reset top margin
        fontFamily: "cursive",
        fontStyle: "italic bold",
        fontSize: "40px",
      }}
    >
      FieldForecast
    </h1>
    <h2 style={{ marginTop: "-10px", marginBottom: "0"}}>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleOnChange}
          required
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-floating" style={{ marginTop: "10px" }}>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleOnChange}
          required
        />
        <label htmlFor="password">Password</label>
      </div>
      <button
        type="submit"
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Submit
      </button>
      <span style={{ display: "block", marginTop: "0px" }}>
        Create an account? <Link to={"/signup"}>Signup</Link>
      </span>
    </form>
    <Toaster />
  </div>
</div>

  );
};

export default Login;