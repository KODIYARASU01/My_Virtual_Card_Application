import React,{useState,useContext} from 'react'
import './form_styles/Testimonial.scss';
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
import { convertToBase64ClientImage } from "../../../../Helper/convert";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
const Testimonial = () => {
    let[testimonialFormOpen,setTestimonialFormOpen]=useState(false);
  let { FormSubmitLoader, setFormSubmitLoader,userName } =
  useContext(SuperAdmin_context);
  let[ClientName,setClientName]=useState();
  let[ClientFeedback,setClientFeedback]=useState('');
  let[ClientImage,setClientImage]=useState();
  let localStorageDatas=JSON.parse(localStorage.getItem('datas'))
  const onUploadClientImage = async (e) => {
    let base64 = await convertToBase64ClientImage(e.target.files[0]);
    setClientImage(base64);
  };
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let formik = useFormik({
    initialValues: {
      ClientName: "",
      ClientFeedback: "",
      ClientImage: undefined
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,
 
    onSubmit: async (values) => {
      values = await Object.assign(values, { ClientImage: ClientImage || "" });
      values.ClientFeedback = stripHtmlTags(ClientFeedback);
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/testimonialDetail", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message)

          setTimeout(()=>{
            values.ClientName=''
            setClientImage(undefined)
            values.ClientFeedback=''
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
       toast.error(error.response.data.message);
       console.log(error)
          setFormSubmitLoader(false);
        });
    },
  });
  return (
   <>
         <div className="testimonial_container">
        <div className="add_new_testimonial">
          <button onClick={()=>setTestimonialFormOpen(true)}>Add Testimonial</button>
        </div>

        <div className="testimonial_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th>IMAGE</th>
                <th>Name</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className=" shadow-sm">
              <tr>
                <td className="h-100 align-middle">
                  <img
                    src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1715980234~exp=1715983834~hmac=a2eaf9f38e03ab0a30b50654b9e6bea285e670bad11a1f26cdfb2d26bbd76a12&w=900"
                    alt="service_image"
                  />
                </td>
                <td className="h-100 align-middle">Kodiyarasu C</td>
            
                <td className="h-100 align-middle">
                  <i className="bx bxs-show" style={{color:'skyBlue'}}></i>
                  <i className="bx bx-edit" style={{color:'#6571FF'}}></i>
                  <i className="bx bx-trash-alt" style={{color:'red'}}></i>
                </td>
              </tr>
              <tr>
                <td className="h-100 align-middle">
                  <img
                    src="https://img.freepik.com/free-photo/young-woman-wearing-striped-shirt-eyeglasses_273609-13228.jpg?t=st=1715980321~exp=1715983921~hmac=f1b1a46e465b24ec4d000f693a032ad7f00cdfb7e90b3749639b096934782630&w=900"
                    alt="service_image"
                  />
                </td>
                <td className="h-100 align-middle">Punitha T</td>
            
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

<div className="create_new_testimonial_container" id={testimonialFormOpen ? 'shadow_background':''}>
<div className="create_new_testimonial_box" id={testimonialFormOpen ? 'serviceOpen':'serviceClose'}>
           <div className="title">
            <p>New Testimonial</p>
            <i className='bx bx-x'  onClick={()=>setTestimonialFormOpen(false)}></i>
           </div>
           <form action="" onSubmit={formik.handleSubmit}>
            <div className="form_group">
              <label htmlFor="ClientName">Client Name <sup>*</sup></label>
              <input type="text" placeholder="Enter Client Name" {...formik.getFieldProps('ClientName')} />
            </div>
          
            <div className="form_group">
              <label htmlFor="ClientFeedback">Client Feedback <sup>*</sup></label>
              <Editor
              {...formik.getFieldProps('ClientFeedback')}
                value={formik.values.ClientFeedback}
                onTextChange={(e) => setClientFeedback(e.htmlValue)}
                id="ClientFeedback"
                name="ClientFeedback"
                style={{ height: "130px" }}
                placeholder="Enter Short Description"
              />
             {/* <textarea name="client_description" id="client_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
            </div>
            <div className="form_group">
              <label htmlFor="ClientImage">Client Image</label>
              <label htmlFor="ClientImage">
                <img src={ClientImage!=undefined ?ClientImage :"https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"}alt="ClientImage" />
                <i className='bx bxs-edit-location'></i>
              </label>
              <small>Allowed file types: png, jpg, jpeg.</small>
              <input type="file" id="ClientImage"  name="ClientImage" onChange={onUploadClientImage}  />
            </div>
            <div className="form_submit_actions">
              <div className="save">
              <button type="submit">
                Save
              </button>
              </div>
           <div className="discard">
           <button type='button' onClick={formik.handleReset}>Clear</button>
           </div>
           
            </div>
           </form>
        </div>
</div>
      
      </div>
   </>
  )
}

export default Testimonial;
