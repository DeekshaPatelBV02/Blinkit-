import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: ""
  });

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `https://blinkit-2-yemv.onrender.com/products/${id}`
      );
      setProduct({
        name: res.data.name || "",
        price: res.data.price || "",
        category: res.data.category || "",
        description: res.data.description || "",
        imageUrl: res.data.imageUrl || ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://blinkit-2-yemv.onrender.com/products/${id}`, {
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl
      });

      alert("Product Updated Successfully");
      navigate("/admin/manage-products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Product</h2>

      <form className="edit-form" onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={product.name}
          placeholder="Product Name"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={product.price}
          placeholder="Price"
          onChange={handleChange}
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Pan">Pan</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Bakery">Bakery</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Sweets">Sweets</option>
          <option value="Tea">Tea</option>
          <option value="Atta">Atta</option>
          <option value="Masala">Masala</option>
          <option value="Sauces">Sauces</option>
          <option value="Meat">Meat</option>
          <option value="Organic">Organic</option>
          <option value="Baby Care">Baby Care</option>
          <option value="Pharma">Pharma</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Home">Home</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Pet Care">Pet Care</option>
        </select>

        <textarea
          className="description-box"
          name="description"
          placeholder="Enter Product Description"
          value={product.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          name="imageUrl"
          placeholder="Enter Image URL"
          value={product.imageUrl}
          onChange={handleChange}
        />

        <button type="submit" className="update-btn">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;