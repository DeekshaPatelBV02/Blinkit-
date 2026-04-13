import "../styles/editUsers.css"
import React,{useState,useEffect} from "react";
import axios from"axios";
import { useParams,useNavigate } from "react-router-dom";

function EditUsers(){
    const{id} = useParams();
    const navigate=useNavigate();

    const[user,setUser]=useState({
        name:"",
        phone:"",
        email:"",
        password:""
    });

    useEffect(()=>{
        getUser();
    },[]);

    const getUser=async()=>{
        try{
            const res = await axios.get(`https://blinkit-3-qi0k.onrender.com/users/${id}`);
            setUser(res.data);
        }catch(error){
            console.log(error);
        }
    };
    const handleChange=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        });
    };
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`https://blinkit-3-qi0k.onrender.com/users/${id}`,user);
            alert("user updated successfully");
            navigate("/admin/manage-users");
        }catch(err){
            console.log(err);
        }

        

    };

    return(
        <div className="edit-user-container">
            <h2 className="edit-user-title">Edit User</h2>
            <form className="edit-user-form" onSubmit={handleUpdate}>
                <input
                 type="text"
                 name="name"
                 value={user.name}
                 placeholder="Enter user name"
                 onChange={handleChange}
                />
                <input
                 type="number"
                 name="phone"
                 value={user.phone}
                 placeholder="Enter user mobile number"
                 onChange={handleChange}
                />
                <input
                 type="text"
                 name="email"
                 value={user.email}
                 placeholder="Enter user emailid"
                 onChange={handleChange}
                />
                <input
                 type="text"
                 name="password"
                 value={user.password}
                 placeholder="Enter password"
                 onChange={handleChange}
                />

                <button type="submit" className="update-user-btn">Update User</button>
            </form>
        </div>
    );
}
export default EditUsers;