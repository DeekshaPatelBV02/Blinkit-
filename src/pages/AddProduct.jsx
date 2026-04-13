import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addProduct.css";
import axios from "axios";

function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {

    if (!name || !price || !category || !description || !file) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", file);

    try {

      await axios.post("http://localhost:3001/upload", formData);

      alert("Product Added Successfully");

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setFile(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h2 className="add">Add Product</h2>

      <div className="form">

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

      

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
         
          <option value="">Select Category</option>
          <option value="pan">Pan</option>
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
          <option value="CLeaning">Cleaning</option>
          <option value="Home">Home</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Pet Care">Pet Care</option>
        </select>

        <textarea 
          className="description-box"
          placeholder="Enter Product Description"
          value={description}
          onChange={(e)=> setDescription(e.target.value)}></textarea>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="add-btn" onClick={upload}>
          Add Product
        </button>

      </div>

      <button className="view-btn"onClick={() => navigate("/admin/view-product")}>
        View Products
      </button>

    </div>
  );
}

export default AddProduct;