import React,{useContext, useEffect, useState} from "react";
import "./menuStyles/User_VCards.scss";
import { Link } from "react-router-dom";
import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import axios from 'axios';
const User_VCards = () => {
let{userName}=useContext(SuperAdmin_context);
let [VCardCount,setVCardCount]=useState();

  let userData=JSON.parse(localStorage.getItem('datas'));


  useEffect(()=>{
    axios.get('https://my-virtual-card-application.onrender.com/basicDetail/specific/KODI01',   {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }).then((res)=>{
      console.log(res.data.data)
      setVCardCount(res.data.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  return (
    <>
      <div className="user_vcards_container">
        <div className="row_1">
          <div className="actions">
            <Link>
              <button
                onClick={() =>
                  (window.location.pathname = `${userName}/uadmin/vcard_form`)
                }
                className="fw-bolder"
              >
                Create New VCard
              </button>
            </Link>
          </div>
        </div>
        <div className="row_2">
          <div className="title">
            <h5 className="fw-medium">All Your Cards</h5>
          </div>

          <div className="appoinment_container table-responsive  ">
            <div className="container">
              <table className="table table-hover rounded-3" id="example">
                <thead>
                  <tr>
                    <th className="fw-bold">VCARD NAME</th>
                    <th className="fw-bold">PREVIEW URL</th>

                    <th className="fw-bold">SUBSCRIBERS</th>

                    <th className="fw-bold">STATUS</th>
                    <th className="fw-bold">CREATED AT</th>
                    <th className="fw-bold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {VCardCount !=undefined ? VCardCount.map((data,index)=>{
                    return(
                      <tr key={index}>
                      <td className="fw-bold">{data.FirstName}</td>
                      <td className="fw-bold">dsfs</td>
                      <td className="fw-bold">df</td>
  
                      <td className="fw-bold">dfds</td>
                      <td className="fw-bold">dfds</td>
                      <td className="fw-bold">dfds</td>
                    </tr>
                    )
                  }):''}
               
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_VCards;
