import React, { useEffect, useState, useCallback } from "react";
import styles from "../components/appStyles.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Tables() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = useCallback(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/products/list`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/products/delete/${id}`)
      .then(() => fetchProducts())
      .catch((err) => console.error("Error deleting product", err));
  };

  const ProductRow = React.memo(({ product, index }) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.quality}</td>
      <td className="txt-center">
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

  const ProductListTable = React.memo(({ productlist }) => (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productlist.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </tbody>
    </table>
  ));

  return (
    <div>
      <h2>Products List</h2>
      <Link to="/products/entry">
        <button className="add-btn">Add Product</button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductListTable productlist={products} />
      )}
    </div>
  );
}
