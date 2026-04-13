import React, {useState,useEffect} from "react";
import axios from "axios";
import{useNavigate, useParams} from "react-router-dom";
import"../styles/productspage.css";


function ProductsPage(){
    const{category}=useParams();
    const navigate =useNavigate();

    const[Products,setProducts]=useState([]);

    useEffect(()=>{
        getProducts();
    },[category]);
    const getProducts=async()=>{
        try{
            const res=await axios.get(`http://localhost:3001/products/category/${category}`);
            setProducts(res.data);
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div className="product-page">
            <h2 className="product-title">{category}products</h2>
            <div className="product">
                {Products.map((p)=>
                <div className="single-product" key={p._id}>
                    <img src={`http://localhost:3001/Images/${p.file}`}
                    alt={p.name}
                    onClick={()=>navigate(`/product/${p._id}`)}/>
                    <p className="product-name">{p.name}</p>
                    <p className="product-price">₹{p.price}</p>
                    <p className="product-description">{p.description}</p>
                    <button className="add-btn" onClick={()=>navigate("/product-detail")}>Add</button>

                </div>
                )}
            
            </div>
        </div>
    );
}
export default ProductsPage;