import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url';


const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, password, name } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
  
  const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top",
      });
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${url}/signup`,
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
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
        name: "",
      });
    };
  

  return (
    
    <div
  className="signup_container"
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
      padding: "0px",
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
    <h2 style={{ marginTop: "-10px", marginBottom: "0px"}}>Signup</h2>
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "0px" }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleOnChange}
          required
          style={{
            width: "100%",
            padding: "5px",
            margin: "-5px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginTop: "0px" }}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter your Name"
          onChange={handleOnChange}
          required
          style={{
            width: "100%",
            padding: "5px",
            margin: "-5px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginTop: "0px" }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleOnChange}
          required
          style={{
            width: "100%",
            padding: "5px",
            margin: "-5px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          marginTop: "0px",
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
        Already have an account? <Link to={"/login"}>Login</Link>
      </span>
    </form>
    <Toaster />
  </div>
</div>

  )
}

export default Signup