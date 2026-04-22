import React from "react";
import "../styles/viewanalytics.css";
import { TfiAlignJustify } from "react-icons/tfi";
import { CiCalendarDate } from "react-icons/ci";
import { MdCalendarMonth } from "react-icons/md";
import { GiCalendarHalfYear } from "react-icons/gi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

function ViewAnalytics() {
  return (
    <div className="view-analytics-container">
      <aside id="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <TfiAlignJustify className="icon_header" /> View
          </div>
          <span className="icon close_icon">X</span>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link to="date">
              <CiCalendarDate className="icon" /> Date wise
            </Link>
          </li>

          <li className="sidebar-list-item">
            <Link to="month">
              <MdCalendarMonth className="icon" /> Month wise
            </Link>
          </li>

          <li className="sidebar-list-item">
            <Link to="year">
              <GiCalendarHalfYear className="icon" /> Year wise
            </Link>
          </li>

          <li className="sidebar-list-item">
            <Link to="payment-count">
              <RiMoneyRupeeCircleFill className="icon" /> Number of payment received
            </Link>
          </li>

          <li className="sidebar-list-item">
            <Link to="signup">
              <IoPeople className="icon" /> Signup count
            </Link>
          </li>

          <li className="sidebar-list-item">
            <Link to="orders-chart">
              <MdOutlineProductionQuantityLimits className="icon" /> Number of Orders
            </Link>
          </li>
        </ul>
      </aside>

      <div className="analytics-right">
        <Outlet />
      </div>
    </div>
  );
}

export default ViewAnalytics;