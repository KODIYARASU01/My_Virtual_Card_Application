import React,{useState,useContext} from 'react'
import './form_styles/Gallery.scss';
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64GalleryImage } from "../../../../Helper/convert";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
const Gallery = () => {
    let[galleryFormOpen,setGalleryFormOpen]=useState(false);
    let { FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(SuperAdmin_context);
  let [GalleryURL, setGalleryURL] = useState();
  let [GalleryImage, setGalleryImage] = useState();

  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const onUploadGalleryImage = async (e) => {
    let base64 = await convertToBase64GalleryImage(e.target.files[0]);
    setGalleryImage(base64);
  };

  let formik = useFormik({
    initialValues: {
      GalleryURL: "",
      GalleryImage: undefined,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      values = await Object.assign(values, {
        GalleryImage: GalleryImage || "",
      });
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/galleryDetail", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);

          setTimeout(()=>{
            setGalleryImage(undefined);
            values.GalleryURL=''
          },2000)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    },
  });
  return (
 <>
       <div className="gallery_container">
        <div className="add_new_gallery">
          <button onClick={()=>setGalleryFormOpen(true)}>Add Gallery</button>
        </div>

        <div className="gallery_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th>COUNT</th>
                <th>IMAGE</th>
              
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className=" shadow-sm">
              <tr>
              <td className="h-100 align-middle">
                01
                </td>
                <td className="h-100 align-middle">
                  <img
                    src="https://img.freepik.com/free-photo/closeup-portrait-halloween-man-woman-posing-with-frightening-faces-couple-black-clothes-with-red-details-screaming_197531-16286.jpg?t=st=1715977956~exp=1715981556~hmac=64122237c39a2a56c21002123b61e6b0faeef692f14d4dd680a59dd55f06769b&w=900"
                    alt="service_image"
                  />
                </td>
              
             
                <td className="h-100 align-middle">
                  <i className="bx bxs-show" style={{color:'skyBlue'}}></i>
                  <i className="bx bx-edit" style={{color:'#6571FF'}}></i>
                  <i className="bx bx-trash-alt" style={{color:'red'}}></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* //Create New Service Form */}

<div className="create_new_gallerycontainer" id={galleryFormOpen ? 'shadow_background':''}>
<div className="create_new_gellery_box" id={galleryFormOpen ? 'galleryOpen':'galleryClose'}>
           <div className="title">
            <p>New Gallery</p>
            <i className='bx bx-x'  onClick={()=>setGalleryFormOpen(false)}></i>
           </div>
           <form action="" onSubmit={formik.handleSubmit}>
           <div className="form_group">
              <label htmlFor="GalleryImage">Choose Your Image<sup>*</sup></label>
              <label htmlFor="GalleryImage">
                <img src={GalleryImage !=undefined ? GalleryImage :"https://img.freepik.com/free-vector/realistic-fog-background_23-2149115275.jpg?t=st=1715977908~exp=1715981508~hmac=1d533445708d92e0d4c40a4db9ebd8a90505fbfa07dcb1b58b5915f9fde4f028&w=900"} alt="GalleryImage" />
                <i className='bx bxs-edit-location'></i>
              </label>
              <small>Allowed file types: png, jpg, jpeg.</small>
              <input type="file" id="GalleryImage"  name="GalleryImage" onChange={onUploadGalleryImage} />
            </div>
            <div className="form_group">
              <label htmlFor="GalleryURL">Image URL</label>
              <input type="text" placeholder="Paste Image URL" {...formik.getFieldProps('GalleryURL')} />
            </div>
          
            <div className="form_submit_actions">
              <div className="save">
              <button type="submit" disabled={FormSubmitLoader}>
                Save
              </button>
              </div>
           <div className="discard">
           <button type='button' onClick={()=>setGalleryFormOpen(false)}>Discard</button>
           </div>
           
            </div>
           </form>
        </div>
</div>
      
      </div>
 </>
  )
}

export default Gallery;
