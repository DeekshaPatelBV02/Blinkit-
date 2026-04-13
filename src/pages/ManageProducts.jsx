import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/manageProducts.css";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:3001/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {

    await axios.delete(`http://localhost:3001/products/${id}`);

    alert("Product deleted");

    getProducts();
  };

  return (
    <div className="manage-container">

      <h2 className="manage-title">Manage Products</h2>

      <table className="product-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id}>

              <td>
                <img
                  src={`http://localhost:3001/images/${product.file}`}
                  alt={product.name}
                  className="product-img" />
              </td>

              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>

              <td>

                <button onClick={() => navigate(`/admin/edit-product/${product._id}`)}>Edit</button>

                <button className="delete-btn"onClick={() => handleDelete(product._id)}>Delete</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageProducts;