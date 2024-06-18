"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSpecificUserData = exports.deleteSpecificUserAllData = exports.updateSpecificUserData = exports.readSpecificIdUserData = exports.readSpecificUserAllData = exports.postBasicAllData = exports.getBasicAllData = void 0;

var _BasicDetailModel = _interopRequireDefault(require("../Models/BasicDetail.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//DiskStorage:
//Get Async allback function..All user basicdata fetching :
var getBasicAllData = function getBasicAllData(req, res) {
  var getDatas;
  return regeneratorRuntime.async(function getBasicAllData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_BasicDetailModel["default"].find());

        case 3:
          getDatas = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            message: "Data Fetched sucessfully!",
            length: getDatas.length,
            data: getDatas
          }));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(401).json({
            message: _context.t0.message
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //Post Async allback function :


exports.getBasicAllData = getBasicAllData;

var postBasicAllData = function postBasicAllData(req, res) {
  var data, createDatas;
  return regeneratorRuntime.async(function postBasicAllData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          data = {
            user: req.user.userName,
            VCardName: req.body.VCardName,
            Occupation: req.body.Occupation,
            Description: req.body.Description,
            Profile: req.body.Profile,
            Banner: req.body.Banner,
            BannerName: req.body.BannerName,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            MobileNumber: req.body.MobileNumber,
            AlternateEmail: req.body.AlternateEmail,
            AlternateMobileNumber: req.body.AlternateMobileNumber,
            Location: req.body.Location,
            JobTitle: req.body.JobTitle,
            InquiryToggleSwitch: req.body.InquiryToggleSwitch,
            QRToggleSwitch: req.body.QRToggleSwitch,
            AppoinmentToggleSwitch: req.body.AppoinmentToggleSwitch,
            ContactToggleSwitch: req.body.ContactToggleSwitch
          };
          createDatas = new _BasicDetailModel["default"](data);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(createDatas.save());

        case 5:
          return _context2.abrupt("return", res.status(201).json({
            message: "Data saved!",
            data: createDatas
          }));

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", res.status(401).json({
            message: 'All * fields Required'
          }));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 8]]);
}; //Read or get Specific User basic Data  :


exports.postBasicAllData = postBasicAllData;

var readSpecificUserAllData = function readSpecificUserAllData(req, res) {
  var getSpecificData;
  return regeneratorRuntime.async(function readSpecificUserAllData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_BasicDetailModel["default"].find({
            user: req.user.userName
          }));

        case 3:
          getSpecificData = _context3.sent;

          if (!getSpecificData) {
            res.status(400).json({
              message: "Data Not Found!"
            });
          } else {
            res.status(201).json({
              message: "Data Fetched!",
              length: getSpecificData.length,
              data: getSpecificData
            });
          }

          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            error: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //Read or get Specific User basic Data  :


exports.readSpecificUserAllData = readSpecificUserAllData;

var readSpecificIdUserData = function readSpecificIdUserData(req, res) {
  var id, getSpecificIdData;
  return regeneratorRuntime.async(function readSpecificIdUserData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_BasicDetailModel["default"].findById(id));

        case 4:
          getSpecificIdData = _context4.sent;

          if (!getSpecificIdData) {
            res.status(400).json({
              message: "Data Not Found!"
            });
          } else {
            res.status(201).json({
              message: "Data Fetched!",
              length: getSpecificIdData.length,
              data: getSpecificIdData
            });
          }

          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            error: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; //Update Specific document user data:


exports.readSpecificIdUserData = readSpecificIdUserData;

var updateSpecificUserData = function updateSpecificUserData(req, res) {
  var id, data, updateSpecificData;
  return regeneratorRuntime.async(function updateSpecificUserData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          data = req.body;
          _context5.next = 5;
          return regeneratorRuntime.awrap(_BasicDetailModel["default"].findOneAndUpdate(id, data));

        case 5:
          updateSpecificData = _context5.sent;

          if (!updateSpecificData) {
            res.status(400).json({
              message: "Data Not Found!"
            });
          } else {
            res.status(201).json({
              message: "Data Updated!",
              data: updateSpecificData
            });
          }

          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; //Delete Specific User Bssic detail All data deleted By using user Id:


exports.updateSpecificUserData = updateSpecificUserData;

var deleteSpecificUserAllData = function deleteSpecificUserAllData(req, res) {
  var deleteSpecificData;
  return regeneratorRuntime.async(function deleteSpecificUserAllData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_BasicDetailModel["default"].deleteMany({
            user: req.user.userName
          }));

        case 3:
          deleteSpecificData = _context6.sent;

          if (!deleteSpecificData) {
            res.status(400).json({
              message: "Data Not Found!"
            });
          } else {
            res.status(201).json({
              message: "Data Deleted!",
              data: deleteSpecificData
            });
          }

          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            error: _context6.t0.message
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //Delete Spcific user  Document in Basic Detail:


exports.deleteSpecificUserAllData = deleteSpecificUserAllData;

var deleteSpecificUserData = function deleteSpecificUserData(req, res) {
  var id, deleteSpecificData;
  return regeneratorRuntime.async(function deleteSpecificUserData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_BasicDetailModel["default"].findByIdAndDelete(id));

        case 4:
          deleteSpecificData = _context7.sent;

          if (!deleteSpecificData) {
            res.status(400).json({
              message: "Data Not Found!"
            });
          } else {
            res.status(201).json({
              message: "Data Deleted!",
              data: deleteSpecificData
            });
          }

          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            error: _context7.t0.message
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.deleteSpecificUserData = deleteSpecificUserData;