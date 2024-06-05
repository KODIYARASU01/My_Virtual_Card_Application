import React,
{useContext} from "react";
import "./TopNavBar.scss";

import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
const TopNavBar = () => {

  let {SideNavActions,setSideNavActions,profileOpen,setProfileOpen}=useContext(SuperAdmin_context);

  console.log(SideNavActions);
  return (
    <>
      <div className="navbar_container">
        <div className="topnav_wrapper">
          <div className="topnav_left">
         <div className="brand_logo">
            <i className='bx bxl-xing'></i>
            </div>  
       
           {SideNavActions ? '' :<h4>VirtualCard.in</h4> } 
            <div className="icon" onClick={()=>setSideNavActions(!SideNavActions)}>
            <i className="uil uil-bars"></i>
            </div>
         <div className="current_menu">
          <p>{`${window.location.pathname.slice(1,30).charAt(7).toUpperCase()}${window.location.pathname.slice(9,30)}`}</p>
         </div>
          </div>
          <div className="topnav_right d-flex align-items-center justify-content-end">
            <div className="mode">
            <i className='bx bx-moon'></i>
            </div>
            <div className="user_profile">
              <img src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1715790254~exp=1715793854~hmac=ba7343c32c0eb17b5cadcdddf5f5ea1b4cc7510ce54d4436095344458fedb8ca&w=740" alt="logo" />
            </div>
            <div className="user_name d-flex align-items-center justify-content-center">
              <p>Super Admin</p>
              <div className="down_arrow" onClick={()=>setProfileOpen(!profileOpen)}>
                {profileOpen ? <i className='bx bx-chevron-up' ></i> :    <i className='bx bx-chevron-down bx-flashing' ></i>}
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
