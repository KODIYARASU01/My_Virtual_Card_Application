import React,{useContext} from 'react'
import './SideNavBar.scss';
import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
const SideNavBar = () => {
  let {SideNavActions,setSideNavActions,profileOpen,setProfileOpen,searchQuery,setSearchQuery}=useContext(SuperAdmin_context);

  let menuList=document.querySelectorAll('#menuName');

  console.log(menuList)
  return (
   <>
   <div className="sidebar_container1">
    <div className="search"  id={SideNavActions ? 'searchHide':''}>
        <input type="text" placeholder='Search' id='search' name='search' onChange={(e)=>setSearchQuery(e.target.value)} />
        <i className='bx bx-search'></i>
   
    </div>

    <div className="sadmin_menus">
        <div className="menu ">
          <NavLink onClick={()=>{
            window.location.pathname='/sadmin/dashboard'
         
            }} className={window.location.pathname === '/sadmin/dashboard' ?    'activeMenu' : ''}>
         
              {/* <i className="uil uil-dashboard h-auto  d-flex align-self-center justify-content-center text-primary"></i> */}
        <DashboardIcon className='h-auto  d-flex align-self-center justify-content-center text-primary i'/>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Dashboard</p>
         
      
          </NavLink>
       
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/admins'} className={window.location.pathname === '/sadmin/admins' ?    'activeMenu' : ''}>
          
            <i className='bx bxs-home-heart h-auto  d-flex align-self-center justify-content-center text-success'></i>
        <p className={SideNavActions ? 'menuNamesHide':''}id='menuName'>Admins</p>
       
      
          </NavLink>
        
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/users'} className={window.location.pathname === '/sadmin/users' ?    'activeMenu' : ''}>
          <i className='bx bxs-user-detail h-auto  d-flex align-self-center justify-content-center text-danger'></i>
        <p className={SideNavActions ? 'menuNamesHide':''}id='menuName'>Users</p>
          </NavLink>
   
        </div>
        {/* <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/vcards'} className={window.location.pathname === '/sadmin/vcards' ?    'activeMenu' : ''}>
          <i className='bx bxs-card h-auto  d-flex align-self-center justify-content-center text-info'></i>
        <p className={SideNavActions ? 'menuNamesHide':''}id='menuName'>VCards</p>
          </NavLink>
    
        </div> */}
        {/* <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/sell_NFC_cards'} className={window.location.pathname === '/sadmin/sell_NFC_cards' ?    'activeMenu' : ''}>
          <i className='bx bx-credit-card h-auto  d-flex align-self-center justify-content-center text-primary'></i>
        <p className={SideNavActions ? 'menuNamesHide':''}id='menuName'>Sell NFC Cards</p>
          </NavLink>
   
        </div> */}
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/vcard_templates'} className={window.location.pathname === '/sadmin/vcard_templates' ?    'activeMenu' : ''}>
          <i className='bx bx-id-card h-auto  d-flex align-self-center justify-content-center text-warning'></i>
        <p className={SideNavActions ? 'menuNamesHide':''}id='menuName'>VCard Templates</p>
          </NavLink>
 
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/cash_payments'} className={window.location.pathname === '/sadmin/cash_payments' ?    'activeMenu' : ''}>
          <i className='bx bx-money h-auto  d-flex align-self-center justify-content-center text-success'></i>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Cash Payments</p>
          </NavLink>
    
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/subscribed_plans'} className={window.location.pathname === '/sadmin/subscribed_plans' ?    'activeMenu' : ''}>
          <i className='bx bxs-paper-plane h-auto  d-flex align-self-center justify-content-center text-info'></i>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Subscribed Plans</p>
          </NavLink>
      
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/plans'} className={window.location.pathname === '/sadmin/plans' ?    'activeMenu' : ''}>
          <i className='bx bxs-calendar h-auto  d-flex align-self-center justify-content-center text-primary'  ></i>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Plans</p>
          </NavLink>
   
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/withdrawals'} className={window.location.pathname === '/sadmin/withdrawals' ?    'activeMenu' : ''}>
          <i className='bx bx-money-withdraw h-auto  d-flex align-self-center justify-content-center text-danger'  ></i>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Withdrawals</p>
          </NavLink>
   
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/coupon_code'} className={window.location.pathname === '/sadmin/coupon_code' ?    'activeMenu' : ''}>
          <i className='bx bxs-coupon h-auto  d-flex align-self-center justify-content-center text-info'  ></i>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Coupon Codes</p>
          </NavLink>
  
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/cms'} className={window.location.pathname === '/sadmin/cms' ?    'activeMenu' : ''}>
          <i className='bx bxs-home h-auto  d-flex align-self-center justify-content-center text-warning'  ></i>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Front CMS</p>
          </NavLink>
      
        </div>
        <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/settings'} className={window.location.pathname === '/sadmin/settings' ?    'activeMenu' : ''}>
          <i className='bx bxs-cog h-auto  d-flex align-self-center justify-content-center text-danger'  ></i>
        <p className={SideNavActions ? 'menuNamesHide':''} id='menuName'>Settings</p>
          </NavLink>
   
        </div>
    </div>

    <div className="color_template">
      <div className="color_title">
        <h6>Color Mode</h6>
      </div>
      <div className="color_lists">
        <div className="color"></div>
        <div className="color"></div>

      </div>
    </div>
   </div>
   </>
  )
}

export default SideNavBar;
