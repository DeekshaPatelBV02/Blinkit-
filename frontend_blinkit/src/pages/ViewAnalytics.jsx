import React from "react";
import { TfiAlignJustify } from "react-icons/tfi";
function Sidebar(){
    return(
        <aside id="sidebar">
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <TfiAlignJustify className="icon_header"/>View

                </div>
                <span className="icon close_icon ">X</span>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <a href="">
                        <TfiAlignJustify className="icon"/>Date wise  
                    </a>
                </li>
                 <li className="sidebar-list-item">
                    <a href="">
                        <TfiAlignJustify className="icon"/>Month wise
                    </a>
                </li>
                 <li className="sidebar-list-item">
                    <a href="">
                        <TfiAlignJustify className="icon"/>Year wise
                    </a>
                </li>
                 <li className="sidebar-list-item">
                    <a href="">
                        <TfiAlignJustify className="icon"/>Number of payment received
                    </a>
                </li>
                 <li className="sidebar-list-item">
                    <a href="">
                        <TfiAlignJustify className="icon"/>Signup count 
                    </a>
                </li>
                 <li className="sidebar-list-item">
                    <a href="">
                        <TfiAlignJustify className="icon"/>Number of Orders
                    </a>
                </li>

            </ul>
        </aside>
    )

}