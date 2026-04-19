import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();
  const mobile = localStorage.getItem("mobile");

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(
          `https://blinkit-2-yemv.onrender.com/profile/${mobile}`
        );
        setUser(userRes.data);

        const orderRes = await axios.get(
          `https://blinkit-2-yemv.onrender.com/my-orders/${userRes.data.email}`
        );

        if (orderRes.data.length > 0) {
          setAddress(orderRes.data[0].user.address);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (mobile) fetchData();
  }, [mobile]);

  const handleLogout = () => {
    localStorage.removeItem("mobile");
    navigate("/");
  };

  if (!mobile) {
    return <div className="profile-message">Please login first</div>;
  }

  if (!user) {
    return <div className="profile-message">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Account</h2>

      <div className="profile-card">
        <p className="profile-item"><span>Name:</span> {user.name}</p>
        <p className="profile-item"><span>Email:</span> {user.email}</p>
        <p className="profile-item"><span>Phone:</span> {user.phone}</p>
        <p className="profile-item"><span>Address:</span> {address || "No address found"}</p>

        <button className="profile-btn" onClick={() => navigate("/my-orders")}>
          My Orders
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;