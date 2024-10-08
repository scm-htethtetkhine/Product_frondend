import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AuthForm = () => {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from URL parameters
  
  useEffect(() => {
    if (id) {
      // Fetch user data if in edit mode
      setEditId(id);
      axios
      .get(`http://localhost:8080/user/getbyid/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error fetching user data", err));
    }
    else {
      localStorage.clear()
    }
  }, [id])
  
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(
        `http://localhost:8080/user/edit/${editId}`,
        formData
      );
    } else {
      if (isRegister) {
        // Handle registration logic
        const response = await axios.post('http://localhost:8080/auth/register', formData, {
          headers: {
            "otmm-api-key": "KoaderMaster"
          }
        });
        console.log('Registering with:', response.data);
      } else {
        // Handle login logic
        const response = await axios.post('http://localhost:8080/auth/login', formData, {
          headers: {
            "otmm-api-key": "KoaderMaster"
          }
        })
        navigate("/user/list")
        localStorage.setItem("accessToken", response.data.accesstoken)
      }
    }
    setFormData({ username: "", email: "", password: "" }); // Reset form
    navigate("/user/list"); // Redirect to the list page after form submission
  }
  
  const editHeader = () => {
    if (editId) {
      return "Edit User Form";
    }
  };
  
  const authHeader = () => {
    if (isRegister) {
      return "Register";
    } else {
      return "Login";
    }
  };
  
  return (
    <div className="Form">
    <button onClick={() => setIsRegister(!isRegister)}>
    Switch to  {editId ? editHeader() : authHeader()}
    </button>
    {/* <h1>{!editID ? "edit form " : (auth != null)? "Auth from" : "register from"}</h1> */}
    <form onSubmit={handleSubmit} className="auth-form">
    
    <h2 className="title">{ editId? editHeader() : authHeader() }</h2>
    {isRegister && (
      <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
      />
      </div>
    )}
    
    <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    />
    </div>
    
    {!editId && (
      <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      />
      </div>
    )}
    
    <button type="submit" className="btn-submit">
    {editId ? 'Update' : authHeader()}
    </button>
    </form>
    </div>
  )
}

export default AuthForm