import React from "react";
import {useNavigate} from "react-router-dom";
import "../styles/dashboard.css";
function AdminDashboard(){
    const navigate = useNavigate();
    return(
        <div className="dash">
            <h2>Admin Dashboard</h2>
            <button onClick={()=>navigate("/admin/add-product")}>Add Product</button>
            <button onClick={()=>navigate("/admin/manage-products")}>Manage Products</button>
            <button onClick={()=>navigate("/admin/manage-users")}>Manage Users</button>

            <button onClick={()=>navigate("/admin/manage-services")}>Manage Services</button>
            <button onClick={()=>navigate("/admin/orders")}>Manage User Orders</button>
        </div>
       
    );
}
export default AdminDashboard;