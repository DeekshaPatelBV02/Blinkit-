import React, { useState } from "react";
import axios from "axios";

function CreateProduct() {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const service = async () => {

    if (!name || !image) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {

      await axios.post("https://blinkit-2-yemv.onrender.com/addCategory", formData);

      alert("Category added");

      setName("");
      setImage(null);

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div>

      <h2>Add Category</h2>

      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <button onClick={service}>
        Upload
      </button>

    </div>

  );
}

export default CreateProduct;