import React, { Component } from "react";
import styles from "../components/appStyles.module.css";
import axios from "axios";

class TableUI extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/products/list`).then((res) => {
      const products = res.data;
      this.setState({ products });
    });
  }
  render() {
    return (
      <div>
        <div>
          <h2>Products List</h2>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Quantity</th>
                <th>Action</th>
                {/* <th>Product Status</th>
                <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quality}</td>
                  <td>
                    <button type="button" className={styles.success}>
                      Edit
                    </button>
                    <button type="button" className="error">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      // <div>

      // <h2>Products List</h2>
      // <table>
      // <thead>
      // <tr>
      // <th>No</th>
      // <th>Product Name</th>
      // <th>Product Price</th>
      // <th>Product Quantity</th>
      // <th>Product Status</th>
      // <th>Action</th>
      // </tr>
      // </thead>
      // <tbody>
      // <tr>
      // <td>1</td>
      // <td>Maria Anders</td>
      // <td>400000</td>
      // <td>58</td>
      // <td>Active</td>
      // <td>
      // <button type="button" className={styles.success}>Edit</button>
      // <button type="button" className='error'>Delete</button>
      // </td>
      // </tr>
      // <tr>
      // <td>2</td>
      // <td>Francisco Chang</td>
      // <td>60000</td>
      // <td>30</td>
      // <td>Active</td>
      // <td>
      // <button type="button" className={styles.success}>Edit</button>
      // <button type="button" className='error'>Delete</button>
      // </td>
      // </tr>
      // <tr>
      // <td>3</td>
      // <td>Roland Mendel</td>
      // <td>50000</td>
      // <td>12</td>
      // <td>Active</td>
      // <td>
      // <button type="button" className={styles.success}>Edit</button>
      // <button type="button" className='error'>Delete</button>
      // </td>
      // </tr>
      // <tr>
      // <td>4</td>
      // <td>Helen Bennett</td>
      // <td>800000</td>
      // <td>23</td>
      // <td>Active</td>
      // <td>
      // <button type="button" className={styles.success}>Edit</button>
      // <button type="button" className='error'>Delete</button>
      // </td>
      // </tr>
      // <tr>
      // <td>5</td>
      // <td>Yoshi Tannamuri</td>
      // <td>680000</td>
      // <td>56</td>
      // <td>Active</td>
      // <td>
      // <button type="button" className={styles.success}>Edit</button>
      // <button type="button" className='error'>Delete</button>
      // </td>
      // </tr>
      // </tbody>
      // </table>
      // </div>
    );
  }
}

export default TableUI;
