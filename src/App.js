import { useState, useEffect } from "react";

import axios from "axios";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", phone: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const push = async () => {
    let res = await axios
      .post("http://localhost:5007/post", formValues)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = validate(formValues);
    if (Object.keys(res).length === 0) {
      push();
      console.log("no error");
      setIsSubmit(true);
    }
    setFormErrors(res);
  };
  useEffect(() => {}, []);
  const validate = (values) => {
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var phoneno = /^\d{10}$/;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 3) {
      errors.username = "username must be more than 4 characters";
    } else if (values.username.length > 10) {
      errors.username = "username cannot exceed more than 15 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password =
        "INVALID PASSWORD: Password cannot exceed more than 10 characters";
    } else if (!values.password.match(upperCaseLetters)) {
      errors.password =
        "INVALID PASSWORD: Password must contain atleast one upper case character";
    } else if (!values.password.match(numbers)) {
      errors.password =
        "INVALID PASSWORD: Password must contain atleast one number digit";
    }

    if (!values.phone) {
      errors.phone = "phone number is required";
    } else if (!values.phone.match(phoneno)) {
      errors.phone = "Enter a valid phone number";
    }

    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre></pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phone}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
