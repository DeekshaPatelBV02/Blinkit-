import React,{useState,useEffect} from "react";
import axios from "axios";
import "../styles/ManageUsers.css";
import { useNavigate } from "react-router-dom";

function ManageUsers(){

    const navigate =useNavigate();

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers = async() =>{
        const res = await axios.get("http://localhost:3001/users");
        setUsers(res.data);
    };

    const handleDelete=async(id)=>{
        await axios.delete(`http://localhost:3001/users/${id}`);

        alert("Users deleted");

        getUsers();
    };
    return(
        <div className="manage-users-container">

            <h2 className="manage-users-title">Manage Users</h2>

            <table className="user-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>

                            <td>

                                <button onClick={()=>navigate(`/admin/edit-users/${user._id}`)}>Edit</button>

                                <button className="delete-button"onClick={()=>handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
export default ManageUsers;