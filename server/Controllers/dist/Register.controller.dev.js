"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRegisteredUserSpecificData = exports.UpdateRegisteredUserSpecificData = exports.ReadRegisteredUserSpecificData = exports.ReadRegisteredUserAllData = exports.ResetPassword = exports.ForgotPassword = exports.RegisterUser = void 0;

var _RegisterModel = _interopRequireDefault(require("../Models/Register.model.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _mailgen = _interopRequireDefault(require("mailgen"));

var _Mail = _interopRequireDefault(require("../Helper/Mail.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

//Post data to mongodb -- > Register User  :
var RegisterUser = function RegisterUser(req, res) {
  var _req$body, profile, email, userName, password, firstName, lastName, mobileNumber, location, userNameVerify, findUser, hashedPassword, data, createUser, transporter, message;

  return regeneratorRuntime.async(function RegisterUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //Get all those field data from body:
          _req$body = req.body, profile = _req$body.profile, email = _req$body.email, userName = _req$body.userName, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, mobileNumber = _req$body.mobileNumber, location = _req$body.location; //if user doesn't fill all those fields error through:

          if (!(!req.body.userName || !req.body.firstName || !req.body.email || !req.body.password)) {
            _context.next = 6;
            break;
          }

          res.status(400).json({
            message: "All * fields Mandatory!"
          });
          _context.next = 28;
          break;

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_RegisterModel["default"].findOne({
            userName: userName
          }));

        case 8:
          userNameVerify = _context.sent;

          if (!userNameVerify) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "This UserName Already Exist!"
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(_RegisterModel["default"].findOne({
            email: email
          }));

        case 13:
          findUser = _context.sent;

          if (!findUser) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "User Already Exist with this email!"
          }));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, 10));

        case 20:
          hashedPassword = _context.sent;
          data = {
            profile: profile,
            email: email,
            userName: userName,
            password: hashedPassword,
            //Password stored secure with hashing type
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            location: location
          }; //If doesn't exist created new user data to database:

          createUser = new _RegisterModel["default"](data);
          transporter = _nodemailer["default"].createTransport({
            service: "SMPT",
            host: process.env.SMTP_HOST,
            // Correctly specify the SMTP host
            port: process.env.SMTP_PORT,
            // Use 465 for SSL or 587 for TLS
            secure: true,
            // Use true for 465, false for other ports
            auth: {
              user: process.env.GMAIL,
              // your Gmail address
              pass: process.env.GMAIL_PASSWORD // your Gmail password

            },
            logger: true,
            // Add this line
            debug: true // Add this line

          });
          message = {
            from: "AristosTech India Private Ltd <".concat(process.env.GMAIL, ">"),
            // sender address
            to: "".concat(createUser.email),
            // list of receivers
            subject: "Welcome to MyVirtual VCard Application✔",
            // Subject line
            text: "You are Sucessfully Registered!",
            // plain text body
            html: "\n          <h3>Hello,".concat(createUser.firstName, " &nbsp; ").concat(createUser.lastName, "</h3>\n           <h2>Welcome to myvirtualcard</h2>\n           <h4> Your Account has been Sucessfully Created with us!</h4>\n          <p>A digital vCard, or virtual business card, is a modern alternative to traditional paper business cards. It contains essential contact information such as name, job title, company name, phone number, email address, and more, all stored in a digital format.</p>\n          <small><b>Visit Our Website</b> https://myvirtualcard.in</small>\n          ") // html body

          }; // send mail with defined transport object

          transporter.sendMail(message).then(function (info) {
            return res.status(201).json({
              message: "Registered Sucessfully!",
              emailMessage: "You should Receive an Email..",
              info: info.messageId,
              preview: _nodemailer["default"].getTestMessageUrl(info),
              data: createUser
            });
          })["catch"](function (error) {
            return res.status(500).json({
              message: error.message
            });
          });
          _context.next = 28;
          return regeneratorRuntime.awrap(createUser.save());

        case 28:
          _context.next = 33;
          break;

        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: _context.t0.message
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 30]]);
};

exports.RegisterUser = RegisterUser;

var ForgotPassword = function ForgotPassword(req, res) {
  var email, checkUser, token, transporter, message;
  return regeneratorRuntime.async(function ForgotPassword$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          _context2.prev = 1;

          if (req.body.email) {
            _context2.next = 6;
            break;
          }

          res.status(401).json({
            message: "Enter Your Email!"
          });
          _context2.next = 10;
          break;

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_RegisterModel["default"].findOne({
            email: email
          }));

        case 8:
          checkUser = _context2.sent;

          if (!checkUser) {
            res.status(401).json({
              message: "User Doesn't Exist with this Email!"
            });
          } else {
            token = _jsonwebtoken["default"].sign({
              id: checkUser._id
            }, process.env.SECRET_KEY, {
              expiresIn: "30d"
            });
            transporter = _nodemailer["default"].createTransport({
              service: "SMPT",
              host: process.env.SMTP_HOST,
              // Correctly specify the SMTP host
              port: process.env.SMTP_PORT,
              // Use 465 for SSL or 587 for TLS
              secure: true,
              // Use true for 465, false for other ports
              auth: {
                user: process.env.GMAIL,
                // your Gmail address
                pass: process.env.GMAIL_PASSWORD // your Gmail password

              },
              logger: true,
              // Add this line
              debug: true // Add this line

            });
            message = {
              from: "AristosTech India Private Ltd <".concat(process.env.GMAIL, ">"),
              // sender address
              to: "".concat(checkUser.email),
              // list of receivers
              subject: "Reset Your Password!",
              // Subject line
              text: "Create Your New Product Key!",
              // plain text body
              html: "\n          <h3>Hello,".concat(checkUser.firstName, " &nbsp; ").concat(checkUser.lastName, "</h3>\n          <p>If you forgot your old password u don't worry about it we will help you to update your new password with registered same email Addesss!</p>\n          <small><b>Reset Your Password ?</b><a href='http://localhost:5173/reset_password/").concat(checkUser._id, "/").concat(token, "'>Click Here!</a></small>\n          ") // html body

            }; // send mail with defined transport object

            transporter.sendMail(message).then(function () {
              res.status(201).json({
                message: "Check your Registered Email Address!"
              });
            })["catch"](function (error) {
              return res.status(500).json({
                message: error.message
              });
            });
          }

        case 10:
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", res.status(500).json({
            message: _context2.t0.message
          }));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 12]]);
}; //Reset Password post new password:


exports.ForgotPassword = ForgotPassword;

var ResetPassword = function ResetPassword(req, res) {
  var _req$params, id, token, password;

  return regeneratorRuntime.async(function ResetPassword$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, token = _req$params.token;
          password = req.body.password;
          _context4.prev = 2;

          if (!req.body.password) {
            res.status(401).json({
              message: "Enter Your Password!"
            });
          } else {
            token = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function _callee(error, decode) {
              var HashPassword, checkUser, transporter, message;
              return regeneratorRuntime.async(function _callee$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!error) {
                        _context3.next = 4;
                        break;
                      }

                      res.status(401).json({
                        message: "Token Error"
                      });
                      _context3.next = 11;
                      break;

                    case 4:
                      HashPassword = _bcrypt["default"].hashSync(password, 10);
                      _context3.next = 7;
                      return regeneratorRuntime.awrap(_RegisterModel["default"].findByIdAndUpdate({
                        _id: id
                      }, {
                        password: HashPassword
                      }));

                    case 7:
                      checkUser = _context3.sent;
                      transporter = _nodemailer["default"].createTransport({
                        service: "SMPT",
                        host: process.env.SMTP_HOST,
                        // Correctly specify the SMTP host
                        port: process.env.SMTP_PORT,
                        // Use 465 for SSL or 587 for TLS
                        secure: true,
                        // Use true for 465, false for other ports
                        auth: {
                          user: process.env.GMAIL,
                          // your Gmail address
                          pass: process.env.GMAIL_PASSWORD // your Gmail password

                        }
                      });
                      message = {
                        from: "AristosTech India Private Ltd <".concat(process.env.GMAIL, ">"),
                        // sender address
                        to: "".concat(checkUser.email),
                        // list of receivers
                        subject: "Password Updated!",
                        // Subject line
                        text: "Your New Password Created Sucessfully!",
                        // plain text body
                        html: "\n          <h3>Hello,".concat(checkUser.firstName, " &nbsp; ").concat(checkUser.lastName, "</h3>\n          <p>Your old password reseted sucessfully and updated your new password with your email address..Now you ready to login with latest new password..</p>\n          <small><b>Ready to Login ?</b><a href='http://localhost:5173/login'>Click Here to Login!</a></small>\n          ") // html body

                      }; // send mail with defined transport object

                      transporter.sendMail(message).then(function () {
                        res.status(201).json({
                          message: "New Password Created!"
                        });
                      });

                    case 11:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
          }

          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](2);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 6]]);
}; //Fetch data from mongodb -- > Get all Registered User Data  :


exports.ResetPassword = ResetPassword;

var ReadRegisteredUserAllData = function ReadRegisteredUserAllData(req, res) {
  var findUser;
  return regeneratorRuntime.async(function ReadRegisteredUserAllData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_RegisterModel["default"].find({}));

        case 3:
          findUser = _context5.sent;

          //If exist through on error
          if (findUser) {
            res.status(200).json({
              message: "All User data Fetched",
              data: findUser
            });
          } else {
            res.status(400).json({
              message: "All User data Fetched Failed"
            });
          }

          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //Fetch data from mongodb -- > Get Specific Registered User Data  :


exports.ReadRegisteredUserAllData = ReadRegisteredUserAllData;

var ReadRegisteredUserSpecificData = function ReadRegisteredUserSpecificData(req, res) {
  var id, findUser;
  return regeneratorRuntime.async(function ReadRegisteredUserSpecificData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id; //Find user Already Exist with this email or not

          _context6.next = 4;
          return regeneratorRuntime.awrap(_RegisterModel["default"].findById(id));

        case 4:
          findUser = _context6.sent;

          //If exist through on error
          if (findUser) {
            res.status(200).json({
              message: "User data Fetched",
              data: findUser
            });
          } else {
            res.status(400).json({
              message: "User data Fetched Failed"
            });
          }

          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            error: _context6.t0.message
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; //Update data to mongodb -- > Upate Specific Registered User Data  :


exports.ReadRegisteredUserSpecificData = ReadRegisteredUserSpecificData;

var UpdateRegisteredUserSpecificData = function UpdateRegisteredUserSpecificData(req, res) {
  var id, _req$body2, profile, email, location, firstName, lastName, mobileNumber, data, RegisterData;

  return regeneratorRuntime.async(function UpdateRegisteredUserSpecificData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id; //Get all those field data from body:

          _req$body2 = req.body, profile = _req$body2.profile, email = _req$body2.email, location = _req$body2.location, firstName = _req$body2.firstName, lastName = _req$body2.lastName, mobileNumber = _req$body2.mobileNumber;
          data = req.body; //If doesn't exist created new user data to database:

          _context7.next = 6;
          return regeneratorRuntime.awrap(_RegisterModel["default"].findByIdAndUpdate(id, data));

        case 6:
          RegisterData = _context7.sent;
          res.status(201).json({
            message: "Profile Updated Sucessfully",
            data: RegisterData
          });
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            message: "Profile Updating Failed",
            error: _context7.t0.message
          });

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; //Update data to mongodb -- > Upate Specific Registered User Data  :


exports.UpdateRegisteredUserSpecificData = UpdateRegisteredUserSpecificData;

var DeleteRegisteredUserSpecificData = function DeleteRegisteredUserSpecificData(req, res) {
  var id;
  return regeneratorRuntime.async(function DeleteRegisteredUserSpecificData$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id; //If doesn't exist created new user data to database:

          _context8.next = 4;
          return regeneratorRuntime.awrap(_RegisterModel["default"].findByIdAndDelete(id));

        case 4:
          res.status(201).json({
            message: "Profile Deleted Sucessfully"
          });
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            message: "Profile Deleted Failed",
            error: _context8.t0.message
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.DeleteRegisteredUserSpecificData = DeleteRegisteredUserSpecificData;