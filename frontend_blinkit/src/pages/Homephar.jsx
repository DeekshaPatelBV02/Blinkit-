import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/homephar.css";

function Homephar() {

  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get("https://blinkit-3-qi0k.onrender.com/getServices")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  return (

    <div className="blinkit-home">

    

      {images[0] && (

        <div className="hero-section">

          <img
            src={`https://blinkit-3-qi0k.onrender.com/images/${images[0].image}`}
            alt="banner"
            onClick={() => navigate("/products")}
          />

        </div>

      )}

    

      <div className="home-services">

        {images.slice(1,4).map((item, index) => (

          <div className="service-card" key={index}>

            <img
              src={`https://blinkit-3-qi0k.onrender.com/images/${item.image}`}
              alt="service"
              onClick={() => navigate("/products")}
            />

          </div>

        ))}

      </div>

    </div>

  );

}

export default Homephar;