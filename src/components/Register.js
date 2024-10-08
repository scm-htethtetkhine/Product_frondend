import React, { useState } from "react";
import styles from "../components/appStyles.module.css";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
      });

      const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/register', formData);
            console.log('Response:', response.data);
          } catch (error) {
            console.error('Error submitting the form', error);
          }
        // try {
        //     await axios.post("http://localhost:8080/auth/register", formData);
        //     setFormData({ username: "", email: "", password: "" }); // Reset form
        //   } catch (error) {
        //     console.error("Error submitting form", error);
        //   }
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register Form</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="User Name"
          onChange={handleChange}
        />
       
        <div>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="btn-gp">
          <button type="button" className="error">
            Cancel
          </button>
          <button type="submit" className={styles.success}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}