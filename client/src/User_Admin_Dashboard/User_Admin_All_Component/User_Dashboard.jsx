import React, { useState } from "react";
import "./menuStyles/User_Dashboard.scss";
import Charts from "./Charts";
import Feature from "./Feature";
import BarChart from "./BarChart";
import Pie from "./Pie";
import Footer from "../UserAdmin_Footer/Footer";
const User_Dashboard = () => {

  let[chartsToggle,setChartsToggle]=useState(false);
  return (
    <>
      <div className="user_dashboard_container">
        <div className="dashboard_content_box">
          <div className="row_1 d-flex align-items-center justify-content-center gap-3">
            <div className="list_box">
              <div className="icon">
              <i className='bx bxs-card'></i>
              </div>

              <div className="details">
                <h4>02</h4>
                <small>Total Active VCards</small>
              </div>
              <ul class="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="list_box">
              <div className="icon">
              <i className='bx bxs-user-pin'></i>
              </div>

              <div className="details">
                <h4>01</h4>
                <small>No Of User Viewed</small>
              </div>
              <ul class="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="list_box">
              <div className="icon">
              <i className='bx bx-message-rounded-error'></i>
              </div>

              <div className="details">
                <h4>03</h4>
                <small>Today inquiries</small>
              </div>
              <ul class="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="list_box">
              <div className="icon">
              <i className='bx bxs-group'></i>
              </div>

              <div className="details">
                <h4>01</h4>
                <small>Today Appointments</small>
              </div>
              <ul class="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
      <div className="row_2">
        <div className="title">
          <h5 className="fw-medium">Today Appoinment</h5>
        </div>

        <div className="appoinment_container table-responsive  ">
          <div className="container">
          <table className="table table-hover rounded-3" id="example" >
  <thead>
    <tr>
      <th className="fw-bold">VCARD NAME</th>
      <th className="fw-bold">NAME</th>
      <th className="fw-bold">PHONE</th>
      <th className="fw-bold">EMAIL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td  className="fw-bold">Junior Software Developer</td>
      <td  className="fw-bold">Kodiyarasu C</td>
      <td   className="fw-bold">+91 8825457794</td>
      <td  className="fw-bold">kodiyarasu01@gmail.com</td>
    </tr>
  </tbody>
</table>
          </div>

        </div>
      </div>
          <div className="row_4">
            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_Dashboard;
