import React, { useContext, useEffect, useState } from "react";
import "./menuStyles/User_VCards.scss";
import { Link } from "react-router-dom";
import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import axios from "axios";
import toast from "react-hot-toast";
const User_VCards = () => {
  let { userName, setFormSubmitLoader } = useContext(SuperAdmin_context);

  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);

  let [VCardCount, setVCardCount] = useState();

  let userData = JSON.parse(localStorage.getItem("datas"));
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/basicDetail", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setVCardCount(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [key]);

  async function handleVCardDelete() {
    setFormSubmitLoader(true);
    try {
      axios
        .delete(
          `http://localhost:3001/vcard/all_Data_Delete_API/${userData.userName}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        )
        .then((res) => {
          reloadComponent();
          toast.success("Your VCard Sucessfully Deleted!");
          setFormSubmitLoader(false);
          setVcardDeleteToggle(false)
        })
        .catch((error) => {
          toast.error("Failed to Delete!");
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="user_vcards_container">
        {VcardDeleteToggle ? (
          <div className="Vcard_delete_popupBox">
            <div className="popup_title">
              Are u sure want to delete Your VCard?
            </div>

            <div className="popup_actions">
              <div className="delete">
                <button onClick={handleVCardDelete}>Yes</button>
              </div>
              <div className="cancel">
                <button onClick={() => setVcardDeleteToggle(false)}>No</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="row_1">
          <div className="actions">
            <Link>
              <button
                onClick={() => {
                  setFormSubmitLoader(true);
                  axios
                    .get(
                      `http://localhost:3001/basicDetail/specificAll/${userData.userName}`,
                      {
                        headers: {
                          Authorization: `Bearer ${userData.token}`,
                        },
                      }
                    )
                    .then((res) => {
                      if (res.data.length < 1) {
                        setFormSubmitLoader(false)(
                          (window.location.pathname = `${userName}/uadmin/vcard_form`)
                        );
                      } else {
                        setFormSubmitLoader(false);
                        toast.error(
                          "Already U Created Your VCard..One VCard Access U subscribed!  "
                        );
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
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
                    <th className="text-center">VCARD NAME</th>
                    <th className=" text-center">PREVIEW URL</th>

                    <th className=" text-center ">PLAN</th>

                    <th className=" text-center ">STATUS</th>
                    <th className=" text-center ">CREATED AT</th>
                    <th className=" text-center ">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {VCardCount !=undefined ? (
                   VCardCount.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="fw-light">{data.VCardName}</td>
                          <td className="fw-light">
                            {" "}
                            <a href="http://localhost:3001/kodi">
                              http://localhost:3001/kodi
                            </a>
                          </td>
                          <td className="fw-light">Free</td>

                          <td className="fw-light">
                            <i className="bx bx-line-chart"></i>
                          </td>
                          <td className="fw-light">
                            {data.createdAt.slice(0, 10)}
                          </td>
                          <td className="fw-light">
                            <i
                              className="bx bxs-edit"
                              onClick={async () => {
                                window.location.pathname = `${data.user}/uadmin/vcard_form_edit/${data.user}/${index}`;
                              }}
                            ></i>
                            <i
                              className="bx bx-trash"
                              onClick={() => setVcardDeleteToggle(true)}
                            ></i>
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                    <td colSpan='6' className="text-center">
                    No Vcard Found!
                    </td>
                </tr>
                  
                  )}
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
