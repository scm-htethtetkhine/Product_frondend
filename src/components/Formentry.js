import React, { useState, useEffect } from "react";
import styles from "../components/appStyles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Formentry() {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quality: ""
  });
  const [errorMessage, setErrorMessage] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      if (formData[field] === "" || formData[field] == null) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } cannot be empty`;
      }
    }
    return newErrors;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });

    // Check if the input is not uppercase
    // if (value !== value.toUpperCase()) {
    //   setErrorMessage("Input must be in uppercase!");
    // } else {
    //   setErrorMessage("");
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }
    // setErrorMessage({});
    // if (errorMessage === "") {
    //   alert("Form submitted successfully!");
    // } else {
    //   alert("Please correct the errors before submitting.");
    // }
    try {
      if (editId) {
        await axios.put(
          `http://localhost:8080/products/edit/${editId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8080/products/add", formData);
      }
      setFormData({ name: "", price: "", quality: "" }); // Reset form
      navigate("/"); // Redirect to the list page after form submission
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", price: "", quality: "" });
    setEditId(null);
    navigate("/"); // Redirect to the list page
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Edit Product Form" : "Create Product Form"}</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Product Name"
          onChange={handleChange}
        />
        {errorMessage.name && <span className="error-txt">{errorMessage.name}</span>}
        <div>
          <input
            type="text"
            name="price"
            value={formData.price}
            placeholder="Price"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="quality"
            value={formData.quality}
            placeholder="Quantity"
            onChange={handleChange}
          />
          {errorMessage.quality && <span className="error-txt">{errorMessage.quality}</span>}
        </div>
        <div className="btn-gp">
          <button type="submit" className={styles.success}>
            {editId ? "Update" : "Save"}
          </button>
          <button type="button" className="error" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formentry;
