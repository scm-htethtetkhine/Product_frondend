import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductEntry = () => {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    qty: 0,
    brand: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from URL parameters

  useEffect(() => {
    if (id) {
      // Fetch product data if in edit mode
      setEditId(id);
      axios
        .get(`http://localhost:8080/products/getbyid/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.error("Error fetching product data", err));
    }
  }, [id]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  
  const handleFileChange = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setFormData((prevData) => ({
        ...prevData,
        image: data.result, // Store Base64 string
      }))
    })
    data.readAsDataURL(e.target.files[0]); 
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {  
      if (editId) {
        await axios.put(
          `http://localhost:8080/products/edit/${editId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8080/products/add", formData);   
      }
      setFormData({ name: "", price: "", image: "" , qty: "", brand: ""}); // Reset form
      navigate("/products/list"); 
    } catch (error) {
      console.error("Error submitting form", error);
    }
  }
  return (
    <div className="Form">
    <form onSubmit={handleSubmit} className="auth-form">
    <div className="form-group">
    <label htmlFor="name">Name</label>
    <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    />
    </div>
    
    <div className="form-group">
    <label htmlFor="price">Price</label>
    <input
    type="price"
    name="price"
    value={formData.price}
    onChange={handleChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="price">Image</label>
    <input
    type="file"
    onChange={handleFileChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="qty">Quality</label>
    <input
    type="qty"
    name="qty"
    value={formData.qty}
    onChange={handleChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="brand">Brand</label>
    <input
    type="brand"
    name="brand"
    value={formData.brand}
    onChange={handleChange}
    />
    </div>
    
    <button type="submit" className="btn-submit">Add Product
    </button>
    </form>
    </div>
  )
}

export default ProductEntry