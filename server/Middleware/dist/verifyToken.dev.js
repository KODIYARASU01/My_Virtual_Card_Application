"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _RegisterModel = _interopRequireDefault(require("../Models/Register.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var _token, decode;

  return regeneratorRuntime.async(function verifyToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
            _context.next = 15;
            break;
          }

          _context.prev = 1;
          _token = req.headers.authorization.split(" ")[1];
          decode = _jsonwebtoken["default"].verify(_token, process.env.SECRET_KEY);
          _context.next = 6;
          return regeneratorRuntime.awrap(_RegisterModel["default"].findById(decode.id).select("password").select('userName'));

        case 6:
          req.user = _context.sent;
          next();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(401).json({
            error: "Not Autherized ,Wrong Token"
          }));

        case 13:
          _context.next = 17;
          break;

        case 15:
          if (token) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(401).send("No Token Found"));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.verifyToken = verifyToken;