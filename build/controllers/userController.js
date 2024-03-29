"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGithubLogin = exports.see = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = exports.finishGithubLogin = void 0;
var _user = _interopRequireDefault(require("../models/user.js"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};
exports.getJoin = getJoin;
var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, username, email, loction, password, password2, pageTitle, exists;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, loction = _req$body.loction, password = _req$body.password, password2 = _req$body.password2;
          pageTitle = "Join";
          if (!(password !== password2)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).render("join", {
            pageTitle: pageTitle,
            error_message: "비밀번호가 일치하지 않습니다"
          }));
        case 4:
          _context.next = 6;
          return _user["default"].exists({
            $or: [{
              username: username
            }, {
              email: email
            }]
          });
        case 6:
          exists = _context.sent;
          if (!exists) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(400).render("join", {
            pageTitle: pageTitle,
            error_message: "이미 존재하는 아이디 또는 이메일 입니다"
          }));
        case 9:
          _context.prev = 9;
          _context.next = 12;
          return _user["default"].create({
            name: name,
            username: username,
            password: password,
            loction: loction,
            email: email
          });
        case 12:
          return _context.abrupt("return", res.redirect("/login"));
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](9);
          return _context.abrupt("return", res.status(400).render("join", {
            pageTitle: pageTitle,
            error_message: Error._Message
          }));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[9, 15]]);
  }));
  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.postJoin = postJoin;
var getEdit = function getEdit(req, res) {
  return res.render("edit-profile", {
    pageTitle: "Edit profile"
  });
};
exports.getEdit = getEdit;
var postEdit = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var pageTitle, _req$session$user, _id, avatarUrl, _req$body2, name, username, email, location, file, sessionUsername, sessionEmail, formUsername, formEmail, exists, _exists, _exists2, isHeroku, updateUser;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          pageTitle = "Edit profile"; // session에서 user를 찾고 user에서 id를 찾는다
          // 혼합하기 좋은 문법 (ES6)
          // (const id = req.session.user.id와 같음)
          // 지금 상황에서는 user는 업데이트 했는데 session이 업데이트 되지 않을 것이다 (session은 DB와 연결되어있지 않다)
          _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, _req$body2 = req.body, name = _req$body2.name, username = _req$body2.username, email = _req$body2.email, location = _req$body2.location, file = req.file;
          sessionUsername = req.session.user.username;
          sessionEmail = req.session.user.email;
          formUsername = req.body.username;
          formEmail = req.body.email;
          if (!(sessionUsername !== formUsername && sessionEmail !== formEmail)) {
            _context2.next = 12;
            break;
          }
          _context2.next = 9;
          return _user["default"].exists({
            $or: [{
              username: username
            }, {
              email: email
            }]
          });
        case 9:
          exists = _context2.sent;
          if (!exists) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.render("edit-profile", {
            pageTitle: pageTitle,
            error_message: "이미 존재하는 아이디와 이메일 입니다"
          }));
        case 12:
          if (!(sessionUsername !== formUsername)) {
            _context2.next = 18;
            break;
          }
          _context2.next = 15;
          return _user["default"].exists({
            username: username
          });
        case 15:
          _exists = _context2.sent;
          if (!_exists) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", res.render("edit-profile", {
            pageTitle: pageTitle,
            error_message: "이미 존재하는 아이디입니다"
          }));
        case 18:
          if (!(sessionEmail !== formEmail)) {
            _context2.next = 24;
            break;
          }
          _context2.next = 21;
          return _user["default"].exists({
            email: email
          });
        case 21:
          _exists2 = _context2.sent;
          if (!_exists2) {
            _context2.next = 24;
            break;
          }
          return _context2.abrupt("return", res.render("edit-profile", {
            pageTitle: pageTitle,
            error_message: "이미 존재하는 이메일입니다"
          }));
        case 24:
          // findByIdAndUpdate는 update 되기 전의 데이터를 return
          // new:true를 설정해주면 findByIdAndUpdate가 업데이트 된 데이터를 return
          // 세개의 인자  : 첫번째는 업데이트 하려는 id , 두번째는 업데이트 하려는 정보(obj), 세번째는 options
          isHeroku = process.env.NODE_ENV === "production";
          _context2.next = 27;
          return _user["default"].findByIdAndUpdate(_id, {
            // 파일이(user가 form에 파일 입력을 했으면) 존재하면 path로 , 아니면 기존으로
            // 새로운 avatarUrl을 session의 user obj에 있는 기존 것으로 (덮어쓰기)

            // multer-S3에서는 path를 더 이상 사용하지 않고 location을 사용한다
            avatarUrl: file ? isHeroku ? file.location : file.path : avatarUrl,
            name: name,
            email: email,
            username: username,
            location: location
          }, {
            "new": true
          });
        case 27:
          updateUser = _context2.sent;
          req.session.user = updateUser;
          return _context2.abrupt("return", res.redirect("/users/edit-profile"));
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function postEdit(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postEdit = postEdit;
var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};
exports.getLogin = getLogin;
var postLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body3, username, password, pageTitle, user, match;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;
          pageTitle = "Login";
          _context3.next = 4;
          return _user["default"].findOne({
            username: username,
            socialOnly: false /* github로 로그인했는지 웹사이트 아이디로 로그인 했는지 잊어버리기 때문에 */
          });
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).render("login", {
            pageTitle: pageTitle,
            error_message: "존재하지 않는 아이디입니다"
          }));
        case 7:
          _context3.next = 9;
          return _bcrypt["default"].compare(password, user.password);
        case 9:
          match = _context3.sent;
          if (match) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", res.status(400).render("login", {
            pageTitle: pageTitle,
            error_message: "존재하지 않는 비밀번호입니다"
          }));
        case 12:
          // 세션에 정보를 추가 ↓
          // 세션을 수정하는 곳 (초기화 하는 부분)
          req.session.loggedIn = true;
          req.session.user = user;
          return _context3.abrupt("return", res.redirect("/"));
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function postLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.postLogin = postLogin;
var startGithubLogin = function startGithubLogin(req, res) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.GIT_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalUrl);
};
exports.startGithubLogin = startGithubLogin;
var finishGithubLogin = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var baseUrl, config, params, finalUrl, tokenRequest, access_token, apiUrl, userData, emailData, emailObj, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          baseUrl = "https://github.com/login/oauth/access_token"; // POST Request를 할 때, 반드시 필요한 파라미터들 : client_id, client_secret, code
          // 얘네들을 access_token 으로 바꾼다
          config = {
            client_id: process.env.GIT_CLIENT_ID,
            client_secret: process.env.GIT_CLIENT_SECRET,
            // req.query는 code를 받는다 : 유효기간은 10분
            code: req.query.code
          };
          params = new URLSearchParams(config).toString();
          finalUrl = "".concat(baseUrl, "?").concat(params);
          _context4.next = 6;
          return (0, _nodeFetch["default"])(finalUrl, {
            method: "POST",
            // JSON을 return받기 위해서 이걸 보내야함 : 그렇지 않을시 github이 text로 응답
            headers: {
              Accept: "application/json"
            }
          });
        case 6:
          _context4.next = 8;
          return _context4.sent.json();
        case 8:
          tokenRequest = _context4.sent;
          if (!("access_token" in tokenRequest)) {
            _context4.next = 37;
            break;
          }
          access_token = tokenRequest.access_token;
          apiUrl = "https://api.github.com";
          _context4.next = 14;
          return (0, _nodeFetch["default"])("".concat(apiUrl, "/user"), {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 14:
          _context4.next = 16;
          return _context4.sent.json();
        case 16:
          userData = _context4.sent;
          _context4.next = 19;
          return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/emails"), {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 19:
          _context4.next = 21;
          return _context4.sent.json();
        case 21:
          emailData = _context4.sent;
          emailObj = emailData.find(function (email) {
            return email.primary === true && email.verified === true;
          });
          if (emailObj) {
            _context4.next = 25;
            break;
          }
          return _context4.abrupt("return", res.redirect("/login"));
        case 25:
          _context4.next = 27;
          return _user["default"].findOne({
            email: emailObj.email
          });
        case 27:
          user = _context4.sent;
          if (user) {
            _context4.next = 32;
            break;
          }
          _context4.next = 31;
          return _user["default"].create({
            name: userData.name,
            username: userData.login,
            password: "",
            // github을 이용해 계정을 만들었다면 password는 없다
            // 그렇게 되면 username과 password form을 사용할 수 없다
            socialOnly: true,
            loction: userData.loction,
            email: emailObj.email
          });
        case 31:
          user = _context4.sent;
        case 32:
          req.session.loggedIn = true;
          req.session.user = user;
          return _context4.abrupt("return", res.redirect("/"));
        case 37:
          return _context4.abrupt("return", res.redirect("/login"));
        case 38:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function finishGithubLogin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.finishGithubLogin = finishGithubLogin;
var getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "SNS계정 : 비밀번호를 바꿀 수 없습니다");
    return res.redirect("/");
  }
  return res.render("change-password", {
    pageTitle: "Change Password"
  });
};
exports.getChangePassword = getChangePassword;
var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _id, _req$body4, oldPassword, newPassword, newPasswordCheck, user, match;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _id = req.session.user._id, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordCheck = _req$body4.newPasswordCheck; // user를 찾으면 save() 함수 사용 가능
          // user 찾아서 새로운 비번을 사용할 비번에 할당
          // 저장
          // session: {user: { _id, password }} 여기서 session에 있는 hash된 비밀번호가 기존 비밀번호와 일치하는지 확인하고 있다
          // 항상 업데이트 된 password를 사용(user.password)
          _context5.next = 3;
          return _user["default"].findById(_id);
        case 3:
          user = _context5.sent;
          _context5.next = 6;
          return _bcrypt["default"].compare(oldPassword, user.password);
        case 6:
          match = _context5.sent;
          if (match) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(400).render("change-password", {
            pageTitle: "Change Password",
            error_message: "존재하지 않는 비밀번호입니다"
          }));
        case 9:
          if (!(newPassword !== newPasswordCheck)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(400).render("change-password", {
            pageTitle: "Change Password",
            error_message: "비밀번호가 일치하지 않습니다"
          }));
        case 11:
          user.password = newPassword;

          // 스키마에 있는 middleware 함수 실행, hash시키기
          // findByIdAndUpdate로는 pre('save')를 실행시키지 않는다
          _context5.next = 14;
          return user.save();
        case 14:
          req.flash("info", "비밀번호가 업데이트 되었습니다");
          return _context5.abrupt("return", res.redirect("/users/logout"));
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function postChangePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postChangePassword = postChangePassword;
var logout = function logout(req, res) {
  req.session.destroy();
  return res.redirect("/");
};
exports.logout = logout;
var see = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id; // const user = await userModel.findById(id).populate("videos");
          // double populate
          _context6.next = 3;
          return _user["default"].findById(id).populate({
            path: "videos",
            populate: {
              path: "owner",
              model: "User"
            }
          });
        case 3:
          user = _context6.sent;
          if (user) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).render("404", {
            pageTitle: "not found"
          }));
        case 6:
          return _context6.abrupt("return", res.render("my-profile", {
            pageTitle: "".concat(user.name, "\uB2D8\uC758 \uD504\uB85C\uD544"),
            user: user
          }));
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function see(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.see = see;