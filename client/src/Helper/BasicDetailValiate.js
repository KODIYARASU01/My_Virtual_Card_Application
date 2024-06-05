import toast from "react-hot-toast";

//validate registerpage all data:
export const BasicDetailValidate = async(values) => {
 const error = VCardNameVerify({}, values);
  OccupationVerify({}, values);
  DescriptionVerify({}, values);

  FirstNameVerify({}, values);
  LastNameVerify({}, values);
  EmailVerify({}, values);
  MobileNumberVerify({}, values);
  LocationVerify({}, values);
  JobTitleVerify({}, values);
  return error;
};

//Validate First Name:
function VCardNameVerify(error = {}, values) {
  if (!values.VCardName) {
    error.VCardName = toast.error("VCardName Required!");
  }
  return error;
}
//Validate Last Name:
function OccupationVerify(error = {}, values) {
  if (!values.Occupation) {
    error.Occupation = toast.error("Occupation Required!");
  }
  return error;
}
//Validate Last Name:
function DescriptionVerify(error = {}, values) {
  if(values.Description.includes(undefined)){
    error.Description = toast.error("Description Required!");
  }
 else if (values.Description.length >0 && values.Description.length < 10) {
    error.Description = toast.error(
      "Description must be min 10 letters required!"
    );
  } else if (values.Description.length > 50) {
    error.Description = toast.error("Description allow max 50 letters only!");
  }
  return error;
};

//Validate Last Name:
function FirstNameVerify(error = {}, values) {
  if (!values.FirstName) {
    error.FirstName = toast.error("FirstName Required!");
  } else if (values.FirstName.includes(" ")) {
    error.FirstName = toast.error("Spaces not been allow for FirstName!");
  }
  return error;
}
function LastNameVerify(error = {}, values) {
  if (!values.LastName) {
    error.LastName = toast.error("LastName Required!");
  } else if (values.LastName.includes(" ")) {
    error.LastName = toast.error("Spaces not been allow for LastName!");
  }
  return error;
}
//Validate Last Name:
function EmailVerify(error = {}, values) {
  if (!values.Email) {
    error.Email = toast.error("Email Required!");
  } else if (values.Email.includes(" ")) {
    error.Email = toast.error("Wrong Email!");
  }
  // else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.i.test(values.email)) {
  //   error.email = toast.error("Invalid Email Address!");
  // }
  return error;
}
//Validate mobileNumber:
function MobileNumberVerify(error = {}, values) {
  if (!values.MobileNumber) {
    error.MobileNumber = toast.error("MobileNumber Required!");
  } else if (values.MobileNumber.includes(" ")) {
    error.MobileNumber = toast.error("Wrong MobileNumber!");
  } else if (values.MobileNumber.length <= 9) {
    error.MobileNumber = toast.error("MobileNumber must be 10 digits !");
  } else if (values.MobileNumber.length > 10) {
    error.MobileNumber = toast.error("Invalid MobileNumber!");
  }
  return error;
}
function LocationVerify(error = {}, values) {
  if (!values.Location) {
    error.Location = toast.error("Location Required!");
  }
  return error;
}
function JobTitleVerify(error = {}, values) {
  if (!values.JobTitle) {
    error.JobTitle = toast.error("JobTitle Required!");
  }
  return error;
}
