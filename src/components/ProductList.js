import React, { useEffect, useState, useCallback } from "react";
import styles from "../components/appStyles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const fetchProduct = useCallback(() => {
      setLoading(true);
      axios
        .get(`http://localhost:8080/products/list`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      fetchProduct();
    }, [fetchProduct]);
  
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:8080/products/delete/${id}`)
        .then(() => fetchProduct())
        .catch((err) => console.error("Error deleting user", err));
    };
  
    const ProductRow = React.memo(({ product, index }) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
         <img src={product.image} alt="images" />
            </td>
        <td>{product.qty}</td>
        <td>{product.brand}</td>
        <td>
          <button
            type="button"
            className={styles.success}
            onClick={() => navigate(`/products/edit/${product.id}`)}
          >
            Edit
          </button>
          <button
            type="button"
            className="error"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  
    const ProductTable = React.memo(({ productlist }) => (
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quality</th>
            <th>Brand</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productlist.map((product, index) => (
            <ProductRow key={product.id} product={product} index={index} />
          ))}
        </tbody>
      </table>
      </div>
    ));
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProductTable productlist={product} />
        )}
      </div>
    );
}
