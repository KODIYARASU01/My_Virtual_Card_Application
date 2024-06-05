import React, { useContext, useState } from "react";
import "./UserAdmin.scss";
import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import User_Admin_TopNavBar from "../../User_Admin_Dashboard/User_Admin_Top_Nav/User_Admin_TopNavBar";
import User_Admin_SideNavBar from "../../User_Admin_Dashboard/User_Admin_SideNav/User_Admin_SideNavBar";
const UserAdmin = () => {
  let { SideNavActions, setSideNavActions, profileOpen, setProfileOpen } =
    useContext(SuperAdmin_context);
  let [confirmPassToggle, setConfirmPassToggle] = useState(false);
  let [showPass, setShowPass] = useState(false);

  function showPassFunctionlity() {
    let input = document.querySelector(".changePassInput");
    setShowPass(true);
    input.type = "text";
  }
  function hidePassFunctionlity() {
  

    let input = document.querySelector(".changePassInput");
    setShowPass(false);
    input.type = "password";
  }

  return (
    <>
      <div className="userAdmin_container">
        <div className="top_navBar">
          <User_Admin_TopNavBar />
        </div>
        <div className="content_box">
          <div
            className={SideNavActions ? "content_left_small" : "content_left"}
          >
            <User_Admin_SideNavBar />
          </div>
          {/* <div
            className="content_right"
            onClick={() => {
              setConfirmPassToggle(false), setProfileOpen(false);
            }}
          >
       
            {window.location.pathname === "/sadmin/dashboard" ? (
              <Dashboard />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/admins" ? <Admins /> : ""}
            {window.location.pathname === "/sadmin/users" ? <Users /> : ""}
            {window.location.pathname === "/sadmin/users/newUser" ? (
              <NewUser />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/users/:id" ? (
              <SingleUser />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/vcards" ? <VCards /> : ""}
            {window.location.pathname === "/sadmin/sell_NFC_cards" ? (
              <NFC />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/cash_payments" ? (
              <CashPayment />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/vcard_templates" ? (
              <VCardTemplates />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/subscribed_plans" ? (
              <SubscribedPlans />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/plans" ? <Plans /> : ""}
            {window.location.pathname === "/sadmin/withdrawals" ? (
              <Withdrowals />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/coupon_code" ? (
              <CouponCode />
            ) : (
              ""
            )}
            {window.location.pathname === "/sadmin/cms" ? <CMS /> : ""}
            {window.location.pathname === "/sadmin/settings" ? <Setting /> : ""}
            {window.location.pathname === "/sadmin/account_setting" ? (
              <AccountSetting />
            ) : (
              ""
            )}
          </div> */}

          {/* //User Profile : */}

          <div className="profile_card" id={!profileOpen ? "profileclose" : ""}>
            <div className="user_details">
              <div className="profile">
                <img
                  src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1715790254~exp=1715793854~hmac=ba7343c32c0eb17b5cadcdddf5f5ea1b4cc7510ce54d4436095344458fedb8ca&w=740"
                  alt="logo"
                />
              </div>
              <div className="user_name">
                <p>Kodiyarasu C</p>
                <small>sadmin@virtualcard.com</small>
              </div>
            </div>
            <div className="user_settings">
              <div
                className="list"
                onClick={() => {
                  (window.location.pathname = "/sadmin/account_setting"),
                    setProfileOpen(false);
                }}
              >
                <i className="bx bxs-user text-success"></i>

                <p>Account Setting</p>
              </div>
              {/* <div
                className="list"
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                <i className="uil uil-language text-primary"></i>

                <p>Change Language</p>
              </div> */}
              <div
                className="list"
                onClick={() => {
                  setConfirmPassToggle(true), setProfileOpen(false);
                }}
              >
                <i className="bx bxs-lock text-info"></i>

                <p>Change Password</p>
              </div>

              <div
                className="list"
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                <i className="bx bx-log-out-circle text-danger"></i>

                <p>Sign Out</p>
              </div>
            </div>
          </div>
          {/* //Change Passowrd */}

          <div
            className="change_pass_container"
            id={!confirmPassToggle ? "hide" : "show"}
          >
            <div className="box">
              <div className="title">
                <h4>Change Password</h4>
                <i
                  className="bx bx-comment-x"
                  onClick={() => setConfirmPassToggle(false)}
                ></i>
              </div>

              <form action="">
                <div className="form_group">
                  <label htmlFor="currentPass">
                    Current Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="changePassInput"
                  />

                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_group">
                  <label htmlFor="newPass">
                    New Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="changePassInput"
                  />
                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_group">
                  <label htmlFor="confirmPass">
                    Confirm Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="changePassInput"
                  />
                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_submit">
                  <div className="save">
                    <button> Save</button>
                  </div>
                  <div className="discard">
                    <button>Discard</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
