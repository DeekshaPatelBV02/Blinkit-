import React from "react";
import { useNavigate } from "react-router-dom";
import"../styles/ManageServices.css";
function ManageServices(){
    const navigate=useNavigate();
    return(
        <div className="manage">
            <h2>Manage Services</h2>
            <button onClick={()=>navigate("/admin/create-product")}>Create Product</button>
        </div>
    );
}
export default ManageServices;