"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.search = exports.registerView = exports.postUpload = exports.postEdit = exports.home = exports.getUpload = exports.getEdit = exports.deleteVideo = exports.deleteComment = exports.createComment = void 0;
var _video = _interopRequireDefault(require("../models/video.js"));
var _user = _interopRequireDefault(require("../models/user.js"));
var _comment = _interopRequireDefault(require("../models/comment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* 

※callback

console.log("시작");
movieModel.find({}, (error, videos) => {
  if(error){
    return res.render("server-error")
  }
  return res.render("home", { pageTitle: "Home", videos });
}); 
console.log("끝"); ===> 순서가 이상해짐

*/

// ※비동기
// async(비동기) -- await(수행될 때까지 기다려준다)
// 데이터베이스가 데이터 찾을때까지 기다려준다(다음 것이 먼저 수행되는 것을 막음)
// 에러는 try-catch문으로 잡는다.
var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var videos;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _video["default"].find({}).sort({
            createdAt: "desc"
          }).populate("owner");
        case 2:
          videos = _context.sent;
          return _context.abrupt("return", res.render("home", {
            pageTitle: "Home",
            videos: videos
          }));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.home = home;
var watch = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, video;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id; // populate() : 다른 컬렉션의 문서로 자동 교체하는 프로세스.
          // owner부분을 실제 userModel 데이터를 +하여 채워준다
          // mongoose는 object id 가 userModel로 부터 온 것임을 안다
          _context2.next = 3;
          return _video["default"].findById(id).populate("owner");
        case 3:
          _context2.next = 5;
          return _context2.sent.populate("comments");
        case 5:
          video = _context2.sent;
          if (video) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(404).render("404", {
            pageTitle: "Video not found"
          }));
        case 8:
          return _context2.abrupt("return", res.render("watch", {
            pageTitle: video.title,
            video: video
          }));
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function watch(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.watch = watch;
var getEdit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, _id, video;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _id = req.session.user._id;
          _context3.next = 4;
          return _video["default"].findById(id);
        case 4:
          video = _context3.sent;
          if (video) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).render("404", {
            pageTitle: "Video not found"
          }));
        case 7:
          if (!(String(video.owner) !== String(_id))) {
            _context3.next = 10;
            break;
          }
          req.flash("error", "회원님께서 업로드한 영상이 아닙니다");
          return _context3.abrupt("return", res.status(403).redirect("/"));
        case 10:
          return _context3.abrupt("return", res.render("edit", {
            pageTitle: "Edit ".concat(video.title),
            video: video
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getEdit(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getEdit = getEdit;
var postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, _id, _req$body, title, description, hashtags, video;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _id = req.session.user._id;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, hashtags = _req$body.hashtags; // exists() : 존재 유무 확인 (video obj가 필요없음)
          // mongoose 최신버전에서는 exists가 사라짐
          _context4.next = 5;
          return _video["default"].findById(id);
        case 5:
          video = _context4.sent;
          if (video) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).render("404", {
            pageTitle: "Video not found"
          }));
        case 8:
          if (!(String(video.owner) !== String(_id))) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(403).redirect("/"));
        case 10:
          _context4.next = 12;
          return _video["default"].findByIdAndUpdate(id, {
            title: title,
            description: description,
            hashtags: _video["default"].formatHashtags(hashtags)
          });
        case 12:
          return _context4.abrupt("return", res.redirect("/"));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.postEdit = postEdit;
var deleteVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, _id, video;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _id = req.session.user._id;
          _context5.next = 4;
          return _video["default"].findById(id);
        case 4:
          video = _context5.sent;
          if (video) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).render("404", {
            pageTitle: "Video not found"
          }));
        case 7:
          if (!(String(video.owner) !== String(_id))) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(403).redirect("/"));
        case 9:
          _context5.next = 11;
          return _video["default"].findByIdAndDelete(id);
        case 11:
          return _context5.abrupt("return", res.redirect("/"));
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteVideo = deleteVideo;
var search = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var keyword, videos;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          keyword = req.query.keyword;
          videos = [];
          if (!keyword) {
            _context6.next = 6;
            break;
          }
          _context6.next = 5;
          return _video["default"].find({
            // regex 연산자 : regular expression의 약자 (정규식표현에서 쓰는)
            // 몽고DB에서 정규표현식을 사용하기 위해 사용하는 키워드이다
            title: {
              // https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
              // RegExp 생성자는 패턴을 사용해 텍스트를 판별할 때 사용dfdfd
              // i : 대.소문자 구분X  ( ignore case 무시하다라는 뜻)
              // ^$ : keyword로 '시작하는' 제목
              // ${keyword}$ : keyword로 '끝나는' 제목
              $regex: new RegExp("^".concat(keyword), "i")
            }
          }).populate("owner");
        case 5:
          videos = _context6.sent;
        case 6:
          return _context6.abrupt("return", res.render("search", {
            pageTitle: "Search",
            videos: videos
          }));
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function search(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.search = search;
var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload Video"
  });
};
exports.getUpload = getUpload;
var postUpload = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _id, _req$files, video, thumb, _req$body2, title, description, hashtags, isHeroku, newVideo, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _id = req.session.user._id; // file안에는 path가 있다
          // es6문법 : const { path: fileUrl } = req.file;
          // file이 한개일때는 file , 두개 이상일때는 files
          _req$files = req.files, video = _req$files.video, thumb = _req$files.thumb;
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, hashtags = _req$body2.hashtags;
          isHeroku = process.env.NODE_ENV === "production";
          _context7.prev = 4;
          _context7.next = 7;
          return _video["default"].create({
            // type의 유효성 검사: 선언한 type과 다르게 선언해도 mongoose가 올바르게 자동변환
            // id는 몽구스에서 부여해준다

            // 업로드 될 영상의 id를 user model에도 저장해 줘야한다
            title: title,
            description: description,
            fileUrl: isHeroku ? video[0].location : video[0].path,
            // Windows의 path는 백슬래시를 사용..? 하기에 replace /로 변경
            // replace(/[찾을 문자열]/g, "변경할 문자열")
            // g : 전체 모든 문자열 변경 / i : 영문 대소문자 무시
            // []안에 특수기호를 넣으면 개별적으로 변환
            thumbnailUrl: isHeroku ? thumb[0].location.replace(/[\\]/g, "/") : thumb[0].path.replace(/[\\]/g, "/"),
            owner: _id,
            hashtags: _video["default"].formatHashtags(hashtags)
          });
        case 7:
          newVideo = _context7.sent;
          _context7.next = 10;
          return _user["default"].findById(_id);
        case 10:
          user = _context7.sent;
          // user model의 videos array에 newVideo._id를 넣는다
          user.videos.push(newVideo._id);
          user.save();
          return _context7.abrupt("return", res.redirect("/"));
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](4);
          return _context7.abrupt("return", res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: Error._Message
          }));
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[4, 16]]);
  }));
  return function postUpload(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// 1. return의 역할 : 본질적인 return의 역할보다는 function을 마무리짓는 역할로 사용되고 있음.
// - 이러한 경우 return이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return을 사용
// 2. render한 것은 다시 render할 수 없음
// - redirect(), sendStatus(), end() 등등 포함 (express에서 오류 발생)
exports.postUpload = postUpload;
var registerView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, video;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.next = 3;
          return _video["default"].findById(id);
        case 3:
          video = _context8.sent;
          if (video) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.sendStatus(404));
        case 6:
          video.meta.views = video.meta.views + 1;
          _context8.next = 9;
          return video.save();
        case 9:
          return _context8.abrupt("return", res.sendStatus(200));
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function registerView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.registerView = registerView;
var createComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var text, user, id, video, comment;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          text = req.body.text, user = req.session.user, id = req.params.id;
          _context9.next = 3;
          return _video["default"].findById(id);
        case 3:
          video = _context9.sent;
          if (video) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", res.sendStatus(404));
        case 6:
          _context9.next = 8;
          return _comment["default"].create({
            text: text,
            owner: user._id,
            video: id
          });
        case 8:
          comment = _context9.sent;
          video.comments.push(comment._id);
          video.save();

          // 201 : created(생성됨) - 요청이 완료되었고 결과로 새로운 리소스를 생성
          // json으로 정보를 보낸다 : res.json([body]) JSON response를 보냅니다.
          // 이 메서드는 JSON.stringify()를 사용하여 JSON 문자열로 변환된 매개변수인 response를 보낸다
          // frontend에게 새로 생긴 댓글의 id를 보내기 위해
          return _context9.abrupt("return", res.status(201).json({
            newCommentId: comment._id
          }));
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function createComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.createComment = createComment;
var deleteComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _id, id, comment, commentsOwner;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _id = req.session.user._id, id = req.params.id;
          _context10.next = 3;
          return _comment["default"].findById(id);
        case 3:
          comment = _context10.sent;
          if (!(String(comment.owner) !== String(_id))) {
            _context10.next = 7;
            break;
          }
          req.flash("error", "You are not the owner of video.");
          return _context10.abrupt("return", res.status(403).redirect("/"));
        case 7:
          _context10.next = 9;
          return _comment["default"].findByIdAndDelete(id);
        case 9:
          _context10.next = 11;
          return _user["default"].findById(_id);
        case 11:
          commentsOwner = _context10.sent;
          commentsOwner.save();
          return _context10.abrupt("return", res.sendStatus(201));
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function deleteComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.deleteComment = deleteComment;