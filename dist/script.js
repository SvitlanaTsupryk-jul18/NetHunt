"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  // invocations
  jsForm();
  showForm(); ///validation and sending form

  function jsForm() {
    var form = document.querySelector(".form"); // check if form exists

    if (!form) return console.log("Форма не найдена"); // turn off default validation

    form.setAttribute("novalidate", "true");

    var inputs = _toConsumableArray(form.querySelectorAll(".form__input"));

    var isValid = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // set to default

      isValid = true;
      setToDefaultStyles(); // validate inputs

      validateInputs(); // try to submit

      submitForm();
    });

    function validateInputs() {
      inputs.forEach(function (element) {
        isValid = validate(element) && isValid; // true or false
      });
    }

    function validate(input) {
      if (input.value.length < 3) {
        input.classList.add("error");
        return false; // keep form from submitting
      } else if (input.name === "email") {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        validReq = re.test(String(input.value).toLowerCase());
        !validReq && input.classList.add("error");
        return validReq;
      } else return true;
    }

    function submitForm() {
      if (!isValid) return alert("Please enter rigth data"); // AJAX for POST request

      function sendForm() {
        return _sendForm.apply(this, arguments);
      } // Success messages


      function _sendForm() {
        _sendForm = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch("/article/fetch/post/user", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(user)
                  });

                case 2:
                  response = _context.sent;

                  if (response.ok) {
                    form.reset();
                  } else {
                    alert("Ошибка HTTP: " + response.status);
                  }

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _sendForm.apply(this, arguments);
      }

      if (isValid) {
        // here need to call function for sending post request
        //sendForm();
        form.reset(); //this is for imitation

        alert("Success!  The form has been sent"); //   form.querySelector(".btn").disabled = true;
      } else {
        form.reset();
      }
    }

    function setToDefaultStyles() {
      inputs.forEach(function (element) {
        element.classList.remove("error");
      });
    }
  }

  function showForm() {
    var btn = document.querySelector(".btn--fixed");
    var form = document.querySelector(".form-wrapper");
    btn.addEventListener("click", function () {
      form.classList.toggle("hide");
    });
  }
})();