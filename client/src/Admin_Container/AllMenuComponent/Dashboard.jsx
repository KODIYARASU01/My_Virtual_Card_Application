import React, { useState } from "react";
import "./menuStyles/Dashboard.scss";
import Charts from "./Charts";
import Feature from "./Feature";
import BarChart from "./BarChart";
import Pie from "./Pie";
import Footer from "../Footer/Footer";
const Dashboard = () => {

  let[chartsToggle,setChartsToggle]=useState(false);
  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_content_box">
          <div className="row_1 d-flex align-items-center justify-content-center gap-3">
            <div className="list_box">
              <div className="icon">
                <i className="bx bxs-user-account"></i>
              </div>

              <div className="details">
                <h4>05</h4>
                <small>Total Active Users</small>
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
                <i className="bx bxs-id-card"></i>
              </div>

              <div className="details">
                <h4>10</h4>
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
                <i className="bx bxs-user-x"></i>
              </div>

              <div className="details">
                <h4>02</h4>
                <small>Total DeActive Users</small>
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
                <i className="bx bxs-card"></i>
              </div>

              <div className="details">
                <h4>01</h4>
                <small>Total DeActivated VCards</small>
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
          <div className="row_2 d-flex align-items-center justify-content-center gap-3">
            <div className="left">
            {/* <Feature/> */}
             <Pie/>
            </div>
            <div className="right">
              <div className="chart_toggle">
              <button class="btn-24" onMouseEnter={()=>setChartsToggle(!chartsToggle)}><span>{!chartsToggle ? "Line Chart" :"Bar Chart"}</span> <i className='bx bx-move bx-fade-right' ></i></button>
              </div>

              {!chartsToggle ?  <BarChart/>: <Charts/> }
 
 

            </div>
     
          
            
          </div>
          <div className="row_3 ">
            <div className="recent_registration_title">
              <h4>Recent User Registration</h4>
            </div>
            <div className="table1 table-responsive rounded-4">
            <table className="table   table-hover">
              <thead className="thead-dark">
                <tr>
                  <th className="text-nowrap">NAME</th>
                  <th  className="text-nowrap">EMAIL</th>
                  <th  className="text-nowrap">CONTACT NO</th>
                  <th className="text-nowrap">REGISTERED ON</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-nowrap">Kodiyarasu C</td>
                  <td className="text-nowrap">kodiyarasu01@gmail.com</td>
                  <td className="text-nowrap">+91 8825457794</td>
                  <td className="text-nowrap">May 02, 2024 08:12 PM </td>
                </tr>
                <tr>
                  <td className="text-nowrap">Punitha T</td>
                  <td className="text-nowrap">punitha@gmail.com</td>
                  <td className="text-nowrap">+91 32454545654</td>
                  <td className="text-nowrap">May 03, 2024 02:12 PM </td>
                </tr>
                <tr>
                  <td className="text-nowrap">Jayakumar V</td>
                  <td className="text-nowrap">Jayakumar@gmail.com</td>
                  <td className="text-nowrap">+91 32415645665</td>
                  <td className="text-nowrap">May 04, 2024 09:12 PM </td>
                </tr>
                <tr>
                  <td className="text-nowrap">Dinesh Kumar K</td>
                  <td className="text-nowrap">Dinesh@gmail.com</td>
                  <td className="text-nowrap">+91 3456456456</td>
                  <td className="text-nowrap">May 06, 2024 08:12 PM </td>
                </tr>
                <tr>
                  <td className="text-nowrap">John T</td>
                  <td className="text-nowrap">john@gmail.com</td>
                  <td className="text-nowrap">+91 1256464565</td>
                  <td className="text-nowrap">May 08, 2024 08:12 PM </td>
                </tr>
              </tbody>
            </table>
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

export default Dashboard;
