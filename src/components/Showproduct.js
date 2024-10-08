/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const Showproduct = () => {
  const [products, setProducts] = useState([]);
  
  const fetchProduct = useCallback(() => {
    axios
    .get(`http://localhost:8080/products/list`)
    .then((res) => {
      setProducts(res.data); // Assuming the API response is an array of products
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);
  
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  
  return (
    <>
    <h1 className="title-shop">Products</h1>
    <main className="main bd-grid">
    {products.map((item) => (
      <article key={item.id} className="card">
      <div className="card__img">
      <img src={item.image} alt="" />
      </div>
      <div className="card__name">
      <p>{item.name}</p>
      </div>
      <div className="card__precis">
      <a href="" className="card__icon" >
      <FontAwesomeIcon icon={faHeart} />
      </a>
      <div>
      <span className="card__preci card__preci--now">{item.price}</span>
      </div>
      <a href="" className="card__icon">
      <FontAwesomeIcon icon={faCartShopping} />
      </a>
      </div>
      </article>
    ))}
    </main>
    </>
  );
};

export default Showproduct