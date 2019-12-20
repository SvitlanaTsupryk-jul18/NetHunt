(function() {
  // invocations
  jsForm();

  function jsForm() {
    let form = document.querySelector(".form");
    // check if form exists
    if (!form) return console.log("Форма не найдена");

    // turn off default validation
    form.setAttribute("novalidate", "true");

    let inputs = [...form.querySelectorAll(".form__input")];
    let isValid = true;

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      // set to default
      isValid = true;
      setToDefaultStyles();

      // validate inputs
      validateInputs();

      // try to submit
      submitForm();
    });

    function validateInputs() {
      inputs.forEach(element => {
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
      if (!isValid) return console.log("NOT VALID");

      // AJAX for POST request

      async function sendForm() {
        let response = await fetch("/article/fetch/post/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(user)
        });

        if (response.ok) {
          form.reset();
        } else {
          alert("Ошибка HTTP: " + response.status);
        }
      }

      // Success messages

      if (isValid) {
        // here need to call function for sending post request
        //sendForm();

        form.reset(); //this is for imitation
        alert("Success!  The form has been sent");

        //   form.querySelector(".btn").disabled = true;
      } else {
        form.reset();
      }
    }

    function setToDefaultStyles() {
      inputs.forEach(element => {
        element.classList.remove("error");
      });
    }
  }
})();
